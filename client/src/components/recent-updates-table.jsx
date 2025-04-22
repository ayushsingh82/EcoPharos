import React from 'react';

const RecentUpdatesTable = ({ updates = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Oracle
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Event
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Carbon (kg)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Time
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-700">
          {updates.map((update, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full mr-2 ${
                    update.oracle === 'Electricity' 
                      ? 'bg-green-500' 
                      : update.oracle === 'Flight'
                        ? 'bg-blue-500'
                        : 'bg-orange-500'
                  }`}></div>
                  <div className="text-sm font-medium text-gray-200">{update.oracle}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {update.event}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {update.carbon}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                {update.time}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentUpdatesTable;
