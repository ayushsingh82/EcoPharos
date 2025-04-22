import React from 'react';

const ElectricityDataTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Property
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Carbon Emissions
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data.carbonKg} kg CO₂
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Electricity Consumption
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data.electricityMwh} MWh
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Country
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data.country.toUpperCase()}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              State/Province
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data.state.toUpperCase()}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Carbon Intensity
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {Math.round(data.carbonKg / data.electricityMwh)} kg CO₂/MWh
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Last Updated
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {new Date(data.timestamp).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ElectricityDataTable; 