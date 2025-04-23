import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { Leaf, ArrowUpRight, ArrowDownRight, Clock, RefreshCw } from "../../components/icons";
import ElectricityEmissionChart from "./electricity-emission-chart";
import ElectricityDataTable from "./electricity-data-table";

export default function ElectricityOraclePage() {
  const [electricityData, setElectricityData] = useState({
    totalConsumption: 45.5,
    totalEmissions: 18051,
    carbonIntensity: 397,
    timestamp: new Date().toISOString()
  });

  const [chartData, setChartData] = useState([
    { carbonKg: 17500, timestamp: '2023-06-10T00:00:00Z' },
    { carbonKg: 18200, timestamp: '2023-06-11T00:00:00Z' },
    { carbonKg: 17800, timestamp: '2023-06-12T00:00:00Z' },
    { carbonKg: 18500, timestamp: '2023-06-13T00:00:00Z' },
    { carbonKg: 18300, timestamp: '2023-06-14T00:00:00Z' },
    { carbonKg: 18051, timestamp: '2023-06-15T00:00:00Z' },
    { carbonKg: 17900, timestamp: '2023-06-16T00:00:00Z' }
  ]);

  const [tableData, setTableData] = useState({
    carbonKg: 18051,
    electricityMwh: 45.5,
    country: 'us',
    state: 'ca',
    timestamp: new Date().toISOString()
  });

  const refreshData = () => {
    // In a real app, you would fetch data from your API
    console.log('Refreshing electricity data...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center">
            <Leaf className="mr-2 h-5 w-5 text-green-500" />
            <h1 className="text-3xl font-bold tracking-tight">Electricity Carbon Oracle</h1>
          </div>
          <p className="text-muted-foreground">
            Track and verify carbon emissions from electricity consumption
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
              Total Consumption
            </CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{electricityData.totalConsumption} MWh</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 inline" />
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Emissions
            </CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{electricityData.totalEmissions} kg</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 inline" />
              +3.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Carbon Intensity
            </CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{electricityData.carbonIntensity} g/kWh</div>
            <p className="text-xs text-muted-foreground">
              <ArrowDownRight className="mr-1 h-3 w-3 inline" />
              -0.8% from last month
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
            <div className="text-2xl font-bold">{new Date(electricityData.timestamp).toLocaleTimeString()}</div>
            <p className="text-xs text-muted-foreground">
              {new Date(electricityData.timestamp).toLocaleDateString()}
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
              <CardTitle>Electricity Carbon Emissions</CardTitle>
              <CardDescription>
                Daily carbon emissions from electricity consumption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ElectricityEmissionChart data={chartData} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Electricity Details</CardTitle>
              <CardDescription>
                Detailed information about electricity carbon emissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ElectricityDataTable data={tableData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 