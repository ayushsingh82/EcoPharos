"use client"

import React from 'react';

const DashboardChart = ({ data = [] }) => {
  // Default data if none provided
  const chartData = data.length > 0 ? data : [
    { label: 'Mon', value: 65 },
    { label: 'Tue', value: 72 },
    { label: 'Wed', value: 58 },
    { label: 'Thu', value: 80 },
    { label: 'Fri', value: 74 },
    { label: 'Sat', value: 45 },
    { label: 'Sun', value: 35 }
  ];

  // Find max value for scaling
  const maxValue = Math.max(...chartData.map(d => d.value));
  
  // Chart dimensions
  const height = 200;
  const width = 600;
  const padding = 40;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);
  const barWidth = chartWidth / chartData.length - 10;

  // Scale values to fit in chart
  const scaleY = (value) => {
    return chartHeight - (value / maxValue * chartHeight);
  };

  return (
    <div className="w-full overflow-hidden">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {/* X and Y axis */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#666" strokeWidth="1" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#666" strokeWidth="1" />
        
        {/* Bars */}
        {chartData.map((d, i) => {
          const x = (i / chartData.length) * chartWidth + padding + 5;
          return (
            <rect
              key={i}
              x={x}
              y={padding + scaleY(d.value)}
              width={barWidth}
              height={chartHeight - scaleY(d.value)}
              fill="rgba(59, 130, 246, 0.7)"
              rx="2"
              ry="2"
            />
          );
        })}
        
        {/* X-axis labels */}
        {chartData.map((d, i) => {
          const x = (i / chartData.length) * chartWidth + padding + barWidth / 2 + 5;
          return (
            <text
              key={i}
              x={x}
              y={height - padding + 15}
              textAnchor="middle"
              fontSize="10"
              fill="var(--muted-foreground)"
            >
              {d.label}
            </text>
          );
        })}
        
        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const value = Math.round(maxValue * ratio);
          const y = padding + scaleY(value);
          return (
            <text
              key={i}
              x={padding - 5}
              y={y + 4}
              textAnchor="end"
              fontSize="10"
              fill="var(--muted-foreground)"
            >
              {value.toLocaleString()}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default DashboardChart;
