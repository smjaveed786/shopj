import { useEffect, useCallback } from 'react';
import { useWebcam } from '@/hooks/useWebcam';
import { useEmotionAnalysis } from '@/hooks/useEmotionAnalysis';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { CameraFeed } from './CameraFeed';
import { InfoCard } from './InfoCard';
import { EmotionIndicator } from './EmotionIndicator';
import { SystemStatus } from './SystemStatus';
import { ImageUpload } from './ImageUpload';
import { SpotifyPlayer } from './SpotifyPlayer';
import { Language } from '@/data/spotifyData';
import { EMOTION_LABELS } from '@/types/emotion';
import { User, Smile, Brain, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function EmotionDashboard() {
  const {
    videoRef,
    canvasRef,
    isStreaming,
    error: webcamError,
    startWebcam,
    stopWebcam,
    captureFrame,
  } = useWebcam();

  const {
    emotionData,
    isAnalyzing,
    error: analysisError,
    analyzeFrame,
    resetData,
  } = useEmotionAnalysis();

  const { speak } = useTextToSpeech();
  const [musicLanguage, setMusicLanguage] = useState<Language>('english');

  // Speak emotion when it changes or updates
  useEffect(() => {
    if (emotionData.noFace) return;

    if (emotionData.isSmiling) {
      speak('Smiling');
    } else {
      speak(EMOTION_LABELS[emotionData.emotion]);
    }
  }, [emotionData, speak]);

  // Capture and analyze frames periodically
  useEffect(() => {
    if (!isStreaming) {
      resetData();
      return;
    }

    const interval = setInterval(() => {
      const frame = captureFrame();
      if (frame) {
        analyzeFrame(frame);
      }
    }, 2000); // Analyze every 2 seconds

    return () => clearInterval(interval);
  }, [isStreaming, captureFrame, analyzeFrame, resetData]);

  const handleStart = useCallback(async () => {
    await startWebcam();
  }, [startWebcam]);

  const handleStop = useCallback(() => {
    stopWebcam();
    resetData();
  }, [stopWebcam, resetData]);

  const combinedError = webcamError || analysisError;

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
            Emotion Detection Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time facial emotion analysis powered by AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Camera Feed */}
          <div className="lg:col-span-2 space-y-6">
            <CameraFeed
              videoRef={videoRef}
              canvasRef={canvasRef}
              isStreaming={isStreaming}
              isAnalyzing={isAnalyzing}
              error={combinedError}
              onStart={handleStart}
              onStop={handleStop}
            />

            {/* Info Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <InfoCard
                icon={User}
                label="Age"
                value={emotionData.age}
                subValue="Estimated"
              />
              <InfoCard
                icon={Sparkles}
                label="Emotion"
                value={EMOTION_LABELS[emotionData.emotion]}
              />
              <InfoCard
                icon={Brain}
                label="Confidence"
                value={`${emotionData.confidence}%`}
                subValue="AI certainty"
              />
              <InfoCard
                icon={Smile}
                label="Smile Status"
                value={emotionData.noFace ? '—' : emotionData.isSmiling ? 'Smiling' : 'Not Smiling'}
              />
            </div>
          </div>

          {/* Right Column - Indicators */}
          <div className="space-y-6">
            <EmotionIndicator
              currentEmotion={emotionData.emotion}
              confidence={emotionData.confidence}
            />
            <SystemStatus
              isEmergency={emotionData.isEmergency}
              isStreaming={isStreaming}
            />
            <ImageUpload
              onImageSelect={(base64) => analyzeFrame(base64, true)}
              onClear={resetData}
              isAnalyzing={isAnalyzing}
            />
            <SpotifyPlayer
              emotion={emotionData.emotion}
              language={musicLanguage}
              onLanguageChange={setMusicLanguage}
              isVisible={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
