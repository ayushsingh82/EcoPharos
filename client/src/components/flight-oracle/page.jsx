import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { Plane, ArrowUpRight, ArrowDownRight, Clock, RefreshCw } from "../../components/icons";
import FlightEmissionChart from "./flight-emission-chart";
import FlightDataTable from "./flight-data-table";

export default function FlightOraclePage() {
  const [flightData, setFlightData] = useState({
    totalFlights: 12,
    totalEmissions: 1077,
    averageEmissions: 89.75,
    timestamp: new Date().toISOString()
  });

  const [chartData, setChartData] = useState([
    { carbonKg: 1050, timestamp: '2023-06-10T00:00:00Z' },
    { carbonKg: 1100, timestamp: '2023-06-11T00:00:00Z' },
    { carbonKg: 980, timestamp: '2023-06-12T00:00:00Z' },
    { carbonKg: 1200, timestamp: '2023-06-13T00:00:00Z' },
    { carbonKg: 1150, timestamp: '2023-06-14T00:00:00Z' },
    { carbonKg: 1077, timestamp: '2023-06-15T00:00:00Z' },
    { carbonKg: 1120, timestamp: '2023-06-16T00:00:00Z' }
  ]);

  const [tableData, setTableData] = useState({
    carbonKg: 1077,
    passengers: 180,
    distanceKm: 2500,
    legs: [
      { departureAirport: 'SFO', destinationAirport: 'JFK' }
    ],
    timestamp: new Date().toISOString()
  });

  const refreshData = () => {
    // In a real app, you would fetch data from your API
    console.log('Refreshing flight data...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center">
            <Plane className="mr-2 h-5 w-5 text-blue-500" />
            <h1 className="text-3xl font-bold tracking-tight">Flight Carbon Oracle</h1>
          </div>
          <p className="text-muted-foreground">
            Track and verify carbon emissions from flights
          </p>
        </div>
        <Button onClick={refreshData} size="sm" className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Flights
            </CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flightData.totalFlights}</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 inline" />
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Emissions
            </CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flightData.totalEmissions} kg</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 inline" />
              +5.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Per Flight
            </CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flightData.averageEmissions} kg</div>
            <p className="text-xs text-muted-foreground">
              <ArrowDownRight className="mr-1 h-3 w-3 inline" />
              -1.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Last Updated
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(flightData.timestamp).toLocaleTimeString()}</div>
            <p className="text-xs text-muted-foreground">
              {new Date(flightData.timestamp).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flight Carbon Emissions</CardTitle>
              <CardDescription>
                Daily carbon emissions from flights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <FlightEmissionChart data={chartData} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flight Details</CardTitle>
              <CardDescription>
                Detailed information about flight carbon emissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FlightDataTable data={tableData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
