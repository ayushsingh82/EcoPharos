import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowRight } from './icons';

const OracleStatusCard = ({ title, icon, status, lastUpdate, path }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <div className="flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
          </div>
        </CardTitle>
        <div className={`flex items-center ${status === 'online' ? 'text-green-500' : 'text-red-500'}`}>
          <div className={`h-2 w-2 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-red-500'} mr-1`}></div>
          <span className="text-xs capitalize">{status}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Last update: {lastUpdate}
          </div>
          <Link to={path} className="text-xs text-blue-500 hover:underline flex items-center">
            View Details
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default OracleStatusCard;
