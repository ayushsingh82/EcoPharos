import React from 'react';

const VehicleDataTable = () => {
  // Simulated data for the table
  const vehicles = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
      type: 'Gasoline',
      emissions: 120,
      distance: 15000,
      lastUpdated: '2023-06-15T10:30:00Z'
    },
    {
      id: '2',
      make: 'Tesla',
      model: 'Model 3',
      year: 2022,
      type: 'Electric',
      emissions: 0,
      distance: 12000,
      lastUpdated: '2023-06-14T14:45:00Z'
    },
    {
      id: '3',
      make: 'Honda',
      model: 'Accord',
      year: 2019,
      type: 'Hybrid',
      emissions: 85,
      distance: 18000,
      lastUpdated: '2023-06-13T09:15:00Z'
    },
    {
      id: '4',
      make: 'Ford',
      model: 'F-150',
      year: 2021,
      type: 'Gasoline',
      emissions: 180,
      distance: 10000,
      lastUpdated: '2023-06-12T16:20:00Z'
    },
    {
      id: '5',
      make: 'Chevrolet',
      model: 'Bolt',
      year: 2022,
      type: 'Electric',
      emissions: 0,
      distance: 9000,
      lastUpdated: '2023-06-11T11:10:00Z'
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Emissions (g/km)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Distance (km)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {vehicle.make} {vehicle.model}
                </div>
                <div className="text-sm text-gray-500">{vehicle.year}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  vehicle.type === 'Electric' 
                    ? 'bg-green-100 text-green-800' 
                    : vehicle.type === 'Hybrid'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-orange-100 text-orange-800'
                }`}>
                  {vehicle.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {vehicle.emissions}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {vehicle.distance.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(vehicle.lastUpdated).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleDataTable;
