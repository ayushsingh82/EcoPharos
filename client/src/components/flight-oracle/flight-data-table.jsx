import React from 'react';

const FlightDataTable = ({ data = {} }) => {
  // Default data if none provided
  const flightData = Object.keys(data).length > 0 ? data : {
    carbonKg: 1077,
    passengers: 180,
    distanceKm: 2500,
    legs: [
      { departureAirport: 'SFO', destinationAirport: 'JFK' }
    ],
    timestamp: new Date().toISOString()
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
              {flightData.carbonKg} kg
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
              Passengers
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {flightData.passengers}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
              Distance
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {flightData.distanceKm} km
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
              Route
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {flightData.legs.map((leg, index) => (
                <span key={index}>
                  {leg.departureAirport} → {leg.destinationAirport}
                  {index < flightData.legs.length - 1 ? ', ' : ''}
                </span>
              ))}
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
              Timestamp
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {new Date(flightData.timestamp).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FlightDataTable;
