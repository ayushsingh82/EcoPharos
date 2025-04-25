import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Button } from "../../components/ui/button"
import { Car, ArrowUpRight, ArrowDownRight, Clock, RefreshCw } from "../../components/icons"
import VehicleDataTable from "./vehicle-data-table"

export default function VehicleOraclePage() {
  const [vehicleData, setVehicleData] = useState({
    totalVehicles: 5,
    totalEmissions: 385,
    averageEmissions: 77,
    timestamp: new Date().toISOString()
  });

  // Sample data for the charts
  const emissionsData = [
    { month: 'Jan', sedan: 42, suv: 65, truck: 53, electric: 12 },
    { month: 'Feb', sedan: 38, suv: 62, truck: 51, electric: 15 },
    { month: 'Mar', sedan: 45, suv: 68, truck: 56, electric: 18 },
    { month: 'Apr', sedan: 40, suv: 64, truck: 58, electric: 22 },
    { month: 'May', sedan: 43, suv: 70, truck: 60, electric: 25 },
    { month: 'Jun', sedan: 48, suv: 72, truck: 62, electric: 28 },
  ];

  const refreshData = () => {
    // In a real app, you would fetch data from your API
    console.log('Refreshing vehicle data...');
  };

  console.log("Rendering VehicleOraclePage"); // Debug log

  // Custom chart component
  const SimpleVehicleEmissionsChart = () => {
    const maxValue = Math.max(
      ...emissionsData.flatMap(d => [d.sedan, d.suv, d.truck, d.electric])
    );
    
    return (
      <div className="w-full h-full">
        <div className="flex items-end h-[250px] gap-4 pt-6 pb-2">
          {emissionsData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex justify-between items-end h-[200px]">
                <div 
                  className="w-[15%] bg-blue-500 rounded-t-sm" 
                  style={{ height: `${(data.sedan / maxValue) * 100}%` }}
                  title={`Sedan: ${data.sedan}kg`}
                />
                <div 
                  className="w-[15%] bg-green-500 rounded-t-sm" 
                  style={{ height: `${(data.suv / maxValue) * 100}%` }}
                  title={`SUV: ${data.suv}kg`}
                />
                <div 
                  className="w-[15%] bg-orange-500 rounded-t-sm" 
                  style={{ height: `${(data.truck / maxValue) * 100}%` }}
                  title={`Truck: ${data.truck}kg`}
                />
                <div 
                  className="w-[15%] bg-purple-500 rounded-t-sm" 
                  style={{ height: `${(data.electric / maxValue) * 100}%` }}
                  title={`Electric: ${data.electric}kg`}
                />
              </div>
              <span className="text-xs text-muted-foreground">{data.month}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-4 gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
            <span className="text-xs">Sedan</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
            <span className="text-xs">SUV</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-sm mr-1"></div>
            <span className="text-xs">Truck</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-sm mr-1"></div>
            <span className="text-xs">Electric</span>
          </div>
        </div>
      </div>
    );
  };

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

      {/* New chart card below the data boxes */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Vehicle Emissions</CardTitle>
          <CardDescription>
            Carbon emissions by vehicle type over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleVehicleEmissionsChart />
        </CardContent>
      </Card>

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
                <SimpleVehicleEmissionsChart />
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
                <SimpleVehicleEmissionsChart />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Additional content below tabs */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Type Distribution</CardTitle>
            <CardDescription>
              Breakdown of emissions by vehicle category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
                  <span>Sedan</span>
                </div>
                <div className="font-medium">25%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '25%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
                  <span>SUV</span>
                </div>
                <div className="font-medium">38%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '38%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-sm mr-2"></div>
                  <span>Truck</span>
                </div>
                <div className="font-medium">32%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '32%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-purple-500 rounded-sm mr-2"></div>
                  <span>Electric</span>
                </div>
                <div className="font-medium">5%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Emission Reduction Opportunities</CardTitle>
            <CardDescription>
              Strategies to reduce vehicle carbon footprint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Car className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Electric Vehicle Transition</h4>
                  <p className="text-sm text-muted-foreground">Converting the fleet to EVs could reduce emissions by up to 65% based on current energy mix.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Car className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Route Optimization</h4>
                  <p className="text-sm text-muted-foreground">Optimizing routes could reduce fuel consumption by 12-18% across the fleet.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Car className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Driver Behavior</h4>
                  <p className="text-sm text-muted-foreground">Eco-driving training could improve fuel efficiency by 5-10% with minimal investment.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Car className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Vehicle Maintenance</h4>
                  <p className="text-sm text-muted-foreground">Regular maintenance ensures optimal performance and can improve efficiency by 3-7%.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
