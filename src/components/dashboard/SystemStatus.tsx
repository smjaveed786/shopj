import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SystemStatusProps {
  isEmergency: boolean;
  isStreaming: boolean;
}

export function SystemStatus({ isEmergency, isStreaming }: SystemStatusProps) {
  const status = !isStreaming ? 'offline' : isEmergency ? 'emergency' : 'normal';

  return (
    <Card className={cn(
      'glass-card shadow-card transition-all duration-300',
      isEmergency && 'ring-2 ring-destructive'
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={cn(
          'flex items-center justify-center gap-3 p-6 rounded-lg transition-all duration-300',
          status === 'normal' && 'bg-emotion-happy/20 text-emotion-happy',
          status === 'emergency' && 'bg-destructive/20 text-destructive animate-pulse',
          status === 'offline' && 'bg-muted text-muted-foreground'
        )}>
          {status === 'emergency' ? (
            <AlertTriangle className="h-8 w-8" />
          ) : (
            <Shield className="h-8 w-8" />
          )}
          <span className="text-2xl font-bold uppercase">
            {status === 'normal' ? 'Normal' : status === 'emergency' ? 'Emergency' : 'Offline'}
          </span>
        </div>

        {status === 'emergency' && (
          <p className="text-sm text-destructive text-center mt-3">
            Emergency situation detected. Please check the camera feed.
          </p>
        )}

        {status === 'offline' && (
          <p className="text-sm text-muted-foreground text-center mt-3">
            Start the camera to begin monitoring.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
