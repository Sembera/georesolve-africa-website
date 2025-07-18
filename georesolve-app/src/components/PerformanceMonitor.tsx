import type React from 'react';
import { useEffect } from 'react';
import { usePerformance, getPerformanceScore, type PerformanceMetrics } from '@/hooks/usePerformance';

interface PerformanceMonitorProps {
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
  showDebugInfo?: boolean;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  onMetricsUpdate,
  showDebugInfo = false
}) => {
  const { metrics, isLoading } = usePerformance();

  useEffect(() => {
    if (onMetricsUpdate) {
      onMetricsUpdate(metrics);
    }
  }, [metrics, onMetricsUpdate]);

  if (!showDebugInfo || isLoading) {
    return null;
  }

  const score = getPerformanceScore(metrics);

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-xs">
      <div className="font-semibold mb-2">Performance Score: {score}/100</div>
      {Object.entries(metrics).map(([key, value]) => (
        <div key={key} className="flex justify-between">
          <span>{key.toUpperCase()}:</span>
          <span>{Math.round(value || 0)}ms</span>
        </div>
      ))}
    </div>
  );
};
