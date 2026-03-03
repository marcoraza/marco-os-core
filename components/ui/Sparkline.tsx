import React from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

export function Sparkline({
  data,
  width = 56,
  height = 16,
  color = 'var(--color-brand-mint)',
}: SparklineProps) {
  const items = data.slice(-7);
  const count = items.length;

  if (count === 0) {
    return <svg width={width} height={height} aria-hidden="true" />;
  }

  const gap = 2;
  const totalGaps = (count - 1) * gap;
  const barWidth = Math.max(1, Math.floor((width - totalGaps) / count));
  const maxVal = Math.max(...items, 1);

  return (
    <svg width={width} height={height} aria-hidden="true">
      {items.map((val, i) => {
        const barHeight = Math.max(1, Math.round((val / maxVal) * height));
        const x = i * (barWidth + gap);
        const y = height - barHeight;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            fill={color}
            opacity={val === 0 ? 0.2 : 1}
          />
        );
      })}
    </svg>
  );
}
