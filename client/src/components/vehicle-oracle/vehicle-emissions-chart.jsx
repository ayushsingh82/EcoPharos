import React from 'react';

const VehicleEmissionsChart = () => {
  // Sample data for the chart
  const chartData = [
    { month: 'Jan', electric: 0, hybrid: 65, gasoline: 120 },
    { month: 'Feb', electric: 0, hybrid: 70, gasoline: 115 },
    { month: 'Mar', electric: 0, hybrid: 60, gasoline: 130 },
    { month: 'Apr', electric: 0, hybrid: 75, gasoline: 125 },
    { month: 'May', electric: 0, hybrid: 80, gasoline: 110 },
    { month: 'Jun', electric: 0, hybrid: 85, gasoline: 105 },
    { month: 'Jul', electric: 0, hybrid: 75, gasoline: 115 }
  ];

  // Chart dimensions
  const height = 250;
  const width = 600;
  const padding = 40;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);
  const barWidth = chartWidth / chartData.length / 3 - 4;

  // Find max value for scaling
  const maxValue = Math.max(...chartData.map(d => d.electric + d.hybrid + d.gasoline));

  // Scale values to fit in chart
  const scaleY = (value) => {
    return chartHeight - (value / maxValue * chartHeight);
  };

  console.log("Rendering VehicleEmissionsChart"); // Debug log

  return (
    <div className="w-full overflow-hidden">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {/* X and Y axis */}
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#666" strokeWidth="1" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#666" strokeWidth="1" />
        
        {/* Bars */}
        {chartData.map((d, i) => {
          const x = (i / chartData.length) * chartWidth + padding;
          const barSpacing = barWidth + 2;
          
          return (
            <g key={i}>
              {/* Electric */}
              <rect
                x={x}
                y={padding + scaleY(d.electric)}
                width={barWidth}
                height={chartHeight - scaleY(d.electric)}
                fill="#10b981"
                rx="2"
                ry="2"
              />
              
              {/* Hybrid */}
              <rect
                x={x + barSpacing}
                y={padding + scaleY(d.hybrid)}
                width={barWidth}
                height={chartHeight - scaleY(d.hybrid)}
                fill="#3b82f6"
                rx="2"
                ry="2"
              />
              
              {/* Gasoline */}
              <rect
                x={x + barSpacing * 2}
                y={padding + scaleY(d.gasoline)}
                width={barWidth}
                height={chartHeight - scaleY(d.gasoline)}
                fill="#f97316"
                rx="2"
                ry="2"
              />
            </g>
          );
        })}
        
        {/* X-axis labels */}
        {chartData.map((d, i) => {
          const x = (i / chartData.length) * chartWidth + padding + barWidth * 1.5;
          return (
            <text
              key={i}
              x={x}
              y={height - padding + 15}
              textAnchor="middle"
              fontSize="10"
              fill="var(--muted-foreground)"
            >
              {d.month}
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
        
        {/* Legend */}
        <g transform={`translate(${width - padding - 120}, ${padding})`}>
          <rect x="0" y="0" width="10" height="10" fill="#10b981" />
          <text x="15" y="9" fontSize="10" fill="var(--muted-foreground)">Electric</text>
          
          <rect x="0" y="15" width="10" height="10" fill="#3b82f6" />
          <text x="15" y="24" fontSize="10" fill="var(--muted-foreground)">Hybrid</text>
          
          <rect x="0" y="30" width="10" height="10" fill="#f97316" />
          <text x="15" y="39" fontSize="10" fill="var(--muted-foreground)">Gasoline</text>
        </g>
      </svg>
    </div>
  );
};

export default VehicleEmissionsChart; 