import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Car, ArrowUpRight, ArrowDownRight, Clock, RefreshCw } from "../../components/icons"
import VehicleEmissionsChart from "./vehicle-emissions-chart"
import VehicleDataTable from "./vehicle-data-table"

export default function VehicleOraclePage() {
  const [vehicleData, setVehicleData] = useState({
    totalVehicles: 5,
    totalEmissions: 385,
    averageEmissions: 77,
    timestamp: new Date().toISOString()
  });

  const refreshData = () => {
    // In a real app, you would fetch data from your API
    console.log('Refreshing vehicle data...');
  };

  console.log("Rendering VehicleOraclePage"); // Debug log

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center">
            <Car className="mr-2 h-5 w-5 text-orange-500" />
            <h1 className="text-3xl font-bold tracking-tight">Vehicle Carbon Oracle</h1>
          </div>
          <p className="text-muted-foreground">
            Track and verify carbon emissions from vehicles
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
              Total Vehicles
            </CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicleData.totalVehicles}</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 inline" />
              +1 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Emissions
            </CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicleData.totalEmissions} kg</div>
            <p className="text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 inline" />
              +3.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Per Vehicle
            </CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicleData.averageEmissions} kg</div>
            <p className="text-xs text-muted-foreground">
              <ArrowDownRight className="mr-1 h-3 w-3 inline" />
              -0.5% from last month
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
            <div className="text-2xl font-bold">{new Date(vehicleData.timestamp).toLocaleTimeString()}</div>
            <p className="text-xs text-muted-foreground">
              {new Date(vehicleData.timestamp).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="data" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Carbon Emissions</CardTitle>
              <CardDescription>
                Monthly carbon emissions by vehicle type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <VehicleEmissionsChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Details</CardTitle>
              <CardDescription>
                Detailed information about vehicle carbon emissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VehicleDataTable />
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Vehicle Emissions by Type</CardTitle>
              <CardDescription>
                Monthly carbon emissions breakdown by vehicle type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <VehicleEmissionsChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
