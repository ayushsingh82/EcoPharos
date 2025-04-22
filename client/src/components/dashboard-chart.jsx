"use client"

import React from 'react';

const DashboardChart = ({ data }) => {
  // In a real app, you would use a charting library like Chart.js or Recharts
  return (
    <div className="h-[300px] w-full">
      <div className="flex h-full items-end justify-between px-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="w-12 rounded-t-md bg-primary" 
              style={{ height: `${item.value}%` }}
            ></div>
            <span className="mt-2 text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardChart;
