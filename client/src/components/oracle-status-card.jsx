import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowRight } from './icons';

const OracleStatusCard = ({ title, status, icon, lastUpdate, description }) => {
  return (
    <div className="flex items-start space-x-4 rounded-md border border-border p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <h4 className="font-semibold">{title}</h4>
          <div className="flex items-center">
            <div className={`h-2 w-2 rounded-full ${status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="ml-1 text-xs text-muted-foreground">{status}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{lastUpdate}</p>
      </div>
    </div>
  );
};

export default OracleStatusCard;
