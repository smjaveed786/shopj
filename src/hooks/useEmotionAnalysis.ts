import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { EmotionData } from '@/types/emotion';

const DEFAULT_DATA: EmotionData = {
  age: null,
  emotion: 'neutral',
  confidence: 0,
  isSmiling: false,
  isEmergency: false,
  noFace: true,
};

export function useEmotionAnalysis() {
  const [emotionData, setEmotionData] = useState<EmotionData>(DEFAULT_DATA);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastAnalysisRef = useRef<number>(0);

  const analyzeFrame = useCallback(async (imageBase64: string) => {
    // Throttle to max once per 2 seconds
    const now = Date.now();
    if (now - lastAnalysisRef.current < 2000) {
      return;
    }
    lastAnalysisRef.current = now;

    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('analyze-emotion', {
        body: { imageBase64 },
      });

      if (fnError) {
        throw fnError;
      }

      if (data.error) {
        setError(data.error);
        return;
      }

      setEmotionData({
        age: data.age,
        emotion: data.emotion || 'neutral',
        confidence: data.confidence || 0,
        isSmiling: data.isSmiling || false,
        isEmergency: data.isEmergency || false,
        noFace: data.noFace || false,
      });
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const resetData = useCallback(() => {
    setEmotionData(DEFAULT_DATA);
    setError(null);
  }, []);

  return {
    emotionData,
    isAnalyzing,
    error,
    analyzeFrame,
    resetData,
  };
}
