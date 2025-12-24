import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number | null;
  subValue?: string;
  iconColor?: string;
}

export function InfoCard({ icon: Icon, label, value, subValue, iconColor = 'text-primary' }: InfoCardProps) {
  return (
    <Card className="glass-card shadow-card">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg bg-primary/10 ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-xl font-bold truncate">
              {value !== null ? value : '—'}
            </p>
            {subValue && (
              <p className="text-xs text-muted-foreground mt-0.5">{subValue}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
