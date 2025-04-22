import React from 'react';

const FlightEmissionChart = ({ data }) => {
  // In a real app, you would use a charting library like Chart.js or Recharts
  return (
    <div className="h-64 flex items-center justify-center">
      <div className="flex items-end h-48 space-x-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="w-8 bg-green-500 rounded-t-md" 
              style={{ height: `${(item.carbonKg / 1200) * 100}%` }}
            ></div>
            <span className="mt-2 text-xs">{new Date(item.timestamp).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightEmissionChart;
