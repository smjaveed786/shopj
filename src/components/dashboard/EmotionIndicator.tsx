import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Emotion, EMOTION_COLORS, EMOTION_LABELS } from '@/types/emotion';
import { Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmotionIndicatorProps {
  currentEmotion: Emotion;
  confidence: number;
}

const ALL_EMOTIONS: Emotion[] = ['happy', 'neutral', 'sad', 'angry', 'fear', 'surprise', 'disgust'];

export function EmotionIndicator({ currentEmotion, confidence }: EmotionIndicatorProps) {
  return (
    <Card className="glass-card shadow-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Emotion Indicator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {ALL_EMOTIONS.map((emotion) => {
          const isActive = emotion === currentEmotion;
          return (
            <div key={emotion} className="flex items-center gap-3">
              <div
                className={cn(
                  'w-4 h-4 rounded-full transition-all duration-300',
                  EMOTION_COLORS[emotion],
                  isActive ? 'ring-2 ring-offset-2 ring-offset-background ring-foreground scale-125' : 'opacity-40'
                )}
              />
              <span
                className={cn(
                  'flex-1 text-sm transition-all duration-300',
                  isActive ? 'font-semibold text-foreground' : 'text-muted-foreground'
                )}
              >
                {EMOTION_LABELS[emotion]}
              </span>
              {isActive && (
                <span className="text-xs font-medium text-muted-foreground">
                  {confidence}%
                </span>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
