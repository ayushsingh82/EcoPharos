import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { Plane, ArrowUpRight, ArrowDownRight, Clock, RefreshCw } from "../../components/icons";
import FlightEmissionChart from "./flight-emission-chart";
import FlightDataTable from "./flight-data-table";

export default function FlightOraclePage() {
  const [flightData, setFlightData] = useState({
    carbonKg: 1077,
    passengers: 180,
    distanceKm: 2500,
    legs: [
      { departureAirport: 'SFO', destinationAirport: 'JFK' }
    ],
    timestamp: new Date().toISOString()
  });

  const [historicalData, setHistoricalData] = useState([
    { carbonKg: 1050, timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() },
    { carbonKg: 1100, timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { carbonKg: 980, timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
    { carbonKg: 1200, timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { carbonKg: 1150, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { carbonKg: 1077, timestamp: new Date().toISOString() }
  ]);

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
        <Button className="flex items-center gap-1">
          <RefreshCw className="h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Carbon</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{flightData.carbonKg} kg</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              +2.5% from last flight
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Per Passenger</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(flightData.carbonKg / flightData.passengers)} kg</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              -1.2% from average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distance</CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(flightData.distanceKm)} km</div>
            <p className="text-xs text-muted-foreground">
              {flightData.legs.map(leg => `${leg.departureAirport} → ${leg.destinationAirport}`).join(', ')}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
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

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data">Flight Data</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flight Carbon Emissions</CardTitle>
              <CardDescription>
                Carbon emissions over the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <FlightEmissionChart data={historicalData} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Flight Details</CardTitle>
              <CardDescription>
                Detailed information about the flight carbon calculation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FlightDataTable data={flightData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
