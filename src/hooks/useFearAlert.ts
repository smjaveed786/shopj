import { useRef, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { EmotionData } from '@/types/emotion';
import { toast } from 'sonner';

const FEAR_CONFIDENCE_THRESHOLD = 50;
const ALERT_THROTTLE_MS = 60000; // 60 seconds

export function useFearAlert() {
  const lastAlertTimeRef = useRef<number>(0);
  const isSendingRef = useRef<boolean>(false);

  const sendEmergencyEmail = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (isSendingRef.current) {
      return { success: false, error: 'Email is already being sent' };
    }

    isSendingRef.current = true;

    try {
      const guardianEmail = 'smjaveedahamed786@gmail.com';

      toast.error('Emergency Protocol Initiated: Sending Alert...', {
        duration: 5000,
        position: 'top-center',
      });

      const { data, error: fnError } = await supabase.functions.invoke('send-emergency-email', {
        body: {
          to: guardianEmail,
          subject: '🚨 EMERGENCY ALERT: Fear Detected',
          body: `EMERGENCY ALERT
Fear detected – Initiating emergency protocol.
Immediate attention required.`,
        },
      });

      if (fnError) {
        throw fnError;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      return { success: true };
    } catch (error) {
      console.error('Failed to send emergency email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send emergency email',
      };
    } finally {
      isSendingRef.current = false;
    }
  }, []);

  const checkAndAlertFear = useCallback(
    async (emotionData: EmotionData): Promise<void> => {
      // Check if fear emotion is detected with confidence >= 90%
      if (
        emotionData.emotion === 'fear' &&
        emotionData.confidence >= FEAR_CONFIDENCE_THRESHOLD &&
        !emotionData.noFace
      ) {
        const now = Date.now();
        const timeSinceLastAlert = now - lastAlertTimeRef.current;

        // Only send alert if 60 seconds have passed since last alert
        if (timeSinceLastAlert >= ALERT_THROTTLE_MS) {
          lastAlertTimeRef.current = now;
          await sendEmergencyEmail();
        }
      }
    },
    [sendEmergencyEmail]
  );

  return {
    checkAndAlertFear,
    sendEmergencyEmail,
  };
}
