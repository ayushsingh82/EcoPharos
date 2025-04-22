import React from 'react';

const FlightDataTable = ({ data }) => {
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
              Passengers
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data.passengers}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Distance
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {Math.round(data.distanceKm)} km
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Flight Route
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {data.legs.map(leg => `${leg.departureAirport} → ${leg.destinationAirport}`).join(', ')}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Carbon Per Passenger
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {Math.round(data.carbonKg / data.passengers)} kg CO₂
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

export default FlightDataTable;
