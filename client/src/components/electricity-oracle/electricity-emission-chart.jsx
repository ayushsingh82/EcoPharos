import React from 'react';

const ElectricityEmissionChart = ({ data = [] }) => {
  // Default data if none provided
  const chartData = data.length > 0 ? data : [
    { carbonKg: 17500, timestamp: '2023-06-10T00:00:00Z' },
    { carbonKg: 18200, timestamp: '2023-06-11T00:00:00Z' },
    { carbonKg: 17800, timestamp: '2023-06-12T00:00:00Z' },
    { carbonKg: 18500, timestamp: '2023-06-13T00:00:00Z' },
    { carbonKg: 18300, timestamp: '2023-06-14T00:00:00Z' },
    { carbonKg: 18051, timestamp: '2023-06-15T00:00:00Z' },
    { carbonKg: 17900, timestamp: '2023-06-16T00:00:00Z' }
  ];

  // Find max value for scaling
  const maxValue = Math.max(...chartData.map(d => d.carbonKg));
  
  // Chart dimensions
  const height = 200;
  const width = 600;
  const padding = 40;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);

  // Scale values to fit in chart
  const scaleY = (value) => {
    return chartHeight - (value / maxValue * chartHeight) + padding;
  };

  // Create points for the line
  const points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * chartWidth + padding;
    const y = scaleY(d.carbonKg);
    return `${x},${y}`;
  }).join(' ');

  // Create area under the line
  const area = `
    M ${padding},${height - padding}
    L ${points.split(' ').map(point => point.split(',')[0] + ',' + (height - padding)).join(' ')}
    L ${padding + chartWidth},${height - padding}
    Z
  `;

  return (
    <div className="w-full overflow-hidden">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {/* X and Y axis */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#666" strokeWidth="1" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#666" strokeWidth="1" />
        
        {/* Area under the line */}
        <path d={area} fill="rgba(16, 185, 129, 0.1)" />
        
        {/* Line chart */}
        <polyline
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          points={points}
        />
        
        {/* Data points */}
        {chartData.map((d, i) => {
          const x = (i / (chartData.length - 1)) * chartWidth + padding;
          const y = scaleY(d.carbonKg);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#10b981"
            />
          );
        })}
        
        {/* X-axis labels */}
        {chartData.map((d, i) => {
          const x = (i / (chartData.length - 1)) * chartWidth + padding;
          const date = new Date(d.timestamp);
          const label = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
          return (
            <text
              key={i}
              x={x}
              y={height - padding + 15}
              textAnchor="middle"
              fontSize="10"
              fill="var(--muted-foreground)"
            >
              {label}
            </text>
          );
        })}
        
        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const value = Math.round(maxValue * ratio);
          const y = scaleY(value);
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

export default ElectricityEmissionChart; 