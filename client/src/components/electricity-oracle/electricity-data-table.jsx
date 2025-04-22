import React from 'react';

const ElectricityDataTable = ({ data = {} }) => {
  // Default data if none provided
  const electricityData = Object.keys(data).length > 0 ? data : {
    carbonKg: 18051,
    electricityMwh: 45.5,
    country: 'us',
    state: 'ca',
    timestamp: new Date().toISOString()
  };

  // Map country codes to names
  const countryNames = {
    'us': 'United States',
    'ca': 'Canada',
    'uk': 'United Kingdom',
    'au': 'Australia',
    'de': 'Germany'
  };

  // Map state codes to names
  const stateNames = {
    'ca': 'California',
    'ny': 'New York',
    'tx': 'Texas',
    'fl': 'Florida',
    'il': 'Illinois'
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Property
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
              Total Carbon Emissions
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {electricityData.carbonKg} kg
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
              Electricity Usage
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {electricityData.electricityMwh} MWh
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
              Country
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {countryNames[electricityData.country] || electricityData.country}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
              State/Region
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {stateNames[electricityData.state] || electricityData.state}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
              Timestamp
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {new Date(electricityData.timestamp).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ElectricityDataTable; 