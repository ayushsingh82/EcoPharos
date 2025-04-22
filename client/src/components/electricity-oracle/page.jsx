import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { Leaf, ArrowUpRight, ArrowDownRight, Clock, RefreshCw } from "../../components/icons";
import ElectricityEmissionChart from "./electricity-emission-chart";
import ElectricityDataTable from "./electricity-data-table";

export default function ElectricityOraclePage() {
  const [electricityData, setElectricityData] = useState({
    carbonKg: 18051,
    electricityMwh: 45.5,
    country: 'us',
    state: 'ca',
    timestamp: new Date().toISOString()
  });

  const [historicalData, setHistoricalData] = useState([
    { carbonKg: 17500, electricityMwh: 43.2, timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() },
    { carbonKg: 18200, electricityMwh: 46.1, timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { carbonKg: 17800, electricityMwh: 44.8, timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
    { carbonKg: 18500, electricityMwh: 47.2, timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
    { carbonKg: 18300, electricityMwh: 46.5, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { carbonKg: 18051, electricityMwh: 45.5, timestamp: new Date().toISOString() }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center">
            <Leaf className="mr-2 h-5 w-5 text-green-500" />
            <h1 className="text-3xl font-bold tracking-tight">Electricity Carbon Oracle</h1>
          </div>
          <p className="text-muted-foreground">
            Track and verify carbon emissions from electricity usage
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
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{electricityData.carbonKg} kg</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              -1.4% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Electricity Usage</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{electricityData.electricityMwh} MWh</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              -2.2% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Intensity</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(electricityData.carbonKg / electricityData.electricityMwh)} kg/MWh</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
              +0.8% from average
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Date(electricityData.timestamp).toLocaleTimeString()}</div>
            <p className="text-xs text-muted-foreground">
              {new Date(electricityData.timestamp).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data">Electricity Data</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Electricity Carbon Emissions</CardTitle>
              <CardDescription>
                Carbon emissions over the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ElectricityEmissionChart data={historicalData} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Electricity Details</CardTitle>
              <CardDescription>
                Detailed information about the electricity carbon calculation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ElectricityDataTable data={electricityData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 