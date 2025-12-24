export type Emotion = 'happy' | 'neutral' | 'sad' | 'angry' | 'fear' | 'surprise' | 'disgust';

export interface EmotionData {
  age: number | null;
  emotion: Emotion;
  confidence: number;
  isSmiling: boolean;
  isEmergency: boolean;
  noFace?: boolean;
}

export const EMOTION_COLORS: Record<Emotion, string> = {
  happy: 'bg-emotion-happy',
  neutral: 'bg-emotion-neutral',
  sad: 'bg-emotion-sad',
  angry: 'bg-emotion-angry',
  fear: 'bg-emotion-fear',
  surprise: 'bg-emotion-surprise',
  disgust: 'bg-emotion-disgust',
};

export const EMOTION_LABELS: Record<Emotion, string> = {
  happy: 'Happy',
  neutral: 'Neutral',
  sad: 'Sad',
  angry: 'Angry',
  fear: 'Fear',
  surprise: 'Surprise',
  disgust: 'Disgust',
};
