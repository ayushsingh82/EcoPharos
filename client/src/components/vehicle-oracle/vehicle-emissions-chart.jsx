import React from 'react';

const VehicleEmissionsChart = () => {
  // Simulated data for the chart
  const data = [
    { month: 'Jan', electric: 20, hybrid: 45, gasoline: 75 },
    { month: 'Feb', electric: 22, hybrid: 48, gasoline: 73 },
    { month: 'Mar', electric: 25, hybrid: 50, gasoline: 70 },
    { month: 'Apr', electric: 30, hybrid: 52, gasoline: 68 },
    { month: 'May', electric: 35, hybrid: 55, gasoline: 65 },
    { month: 'Jun', electric: 40, hybrid: 58, gasoline: 62 },
    { month: 'Jul', electric: 45, hybrid: 60, gasoline: 60 },
  ];

  // In a real app, you would use a charting library like Chart.js or Recharts
  return (
    <div className="h-[300px] w-full">
      <div className="flex h-full items-end justify-between px-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="flex h-full">
                <div 
                  className="w-4 rounded-t-md bg-green-500 mx-0.5" 
                  style={{ height: `${item.electric * 2}px` }}
                ></div>
                <div 
                  className="w-4 rounded-t-md bg-blue-500 mx-0.5" 
                  style={{ height: `${item.hybrid * 2}px` }}
                ></div>
                <div 
                  className="w-4 rounded-t-md bg-orange-500 mx-0.5" 
                  style={{ height: `${item.gasoline * 2}px` }}
                ></div>
              </div>
              <span className="mt-2 text-xs">{item.month}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-green-500 rounded-full mr-1"></div>
          <span className="text-xs">Electric</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-blue-500 rounded-full mr-1"></div>
          <span className="text-xs">Hybrid</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-orange-500 rounded-full mr-1"></div>
          <span className="text-xs">Gasoline</span>
        </div>
      </div>
    </div>
  );
};

export default VehicleEmissionsChart; 