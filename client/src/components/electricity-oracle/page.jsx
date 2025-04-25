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

  // Sample data for the electricity emissions chart
  const electricityEmissionsData = [
    { month: 'Jan', coal: 520, natural_gas: 380, nuclear: 120, renewable: 210 },
    { month: 'Feb', coal: 490, natural_gas: 360, nuclear: 125, renewable: 230 },
    { month: 'Mar', coal: 510, natural_gas: 390, nuclear: 130, renewable: 250 },
    { month: 'Apr', coal: 480, natural_gas: 370, nuclear: 135, renewable: 280 },
    { month: 'May', coal: 460, natural_gas: 350, nuclear: 140, renewable: 310 },
    { month: 'Jun', coal: 430, natural_gas: 340, nuclear: 145, renewable: 350 },
  ];

  const refreshData = () => {
    // In a real app, you would fetch data from your API
    console.log('Refreshing electricity data...');
  };

  // Custom chart component for electricity emissions
  const SimpleElectricityEmissionsChart = () => {
    const maxValue = Math.max(
      ...electricityEmissionsData.flatMap(d => [d.coal, d.natural_gas, d.nuclear, d.renewable])
    );
    
    return (
      <div className="w-full h-full">
        <div className="flex items-end h-[250px] gap-4 pt-6 pb-2">
          {electricityEmissionsData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex justify-between items-end h-[200px]">
                <div 
                  className="w-[15%] bg-gray-700 rounded-t-sm" 
                  style={{ height: `${(data.coal / maxValue) * 100}%` }}
                  title={`Coal: ${data.coal}kg`}
                />
                <div 
                  className="w-[15%] bg-yellow-500 rounded-t-sm" 
                  style={{ height: `${(data.natural_gas / maxValue) * 100}%` }}
                  title={`Natural Gas: ${data.natural_gas}kg`}
                />
                <div 
                  className="w-[15%] bg-cyan-500 rounded-t-sm" 
                  style={{ height: `${(data.nuclear / maxValue) * 100}%` }}
                  title={`Nuclear: ${data.nuclear}kg`}
                />
                <div 
                  className="w-[15%] bg-green-500 rounded-t-sm" 
                  style={{ height: `${(data.renewable / maxValue) * 100}%` }}
                  title={`Renewable: ${data.renewable}kg`}
                />
              </div>
              <span className="text-xs text-muted-foreground">{data.month}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-4 gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-700 rounded-sm mr-1"></div>
            <span className="text-xs">Coal</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-sm mr-1"></div>
            <span className="text-xs">Natural Gas</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-cyan-500 rounded-sm mr-1"></div>
            <span className="text-xs">Nuclear</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
            <span className="text-xs">Renewable</span>
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

      {/* Chart card below the data boxes */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Electricity Emissions</CardTitle>
          <CardDescription>
            Carbon emissions by energy source over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleElectricityEmissionsChart />
        </CardContent>
      </Card>

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

      {/* Additional content below tabs */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Energy Source Distribution</CardTitle>
            <CardDescription>
              Breakdown of electricity generation by source
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
                  <span>Renewable Energy</span>
                </div>
                <div className="font-medium">32%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '32%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-cyan-500 rounded-sm mr-2"></div>
                  <span>Nuclear</span>
                </div>
                <div className="font-medium">18%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: '18%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-sm mr-2"></div>
                  <span>Natural Gas</span>
                </div>
                <div className="font-medium">28%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '28%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-gray-700 rounded-sm mr-2"></div>
                  <span>Coal</span>
                </div>
                <div className="font-medium">22%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gray-700 h-2.5 rounded-full" style={{ width: '22%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Carbon Reduction Opportunities</CardTitle>
            <CardDescription>
              Potential ways to reduce electricity carbon footprint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Switch to Renewable Sources</h4>
                  <p className="text-sm text-muted-foreground">Increasing renewable energy usage by 20% could reduce emissions by 850kg per month.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Leaf className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Energy Efficiency Improvements</h4>
                  <p className="text-sm text-muted-foreground">Implementing energy-efficient systems could reduce consumption by 15% (6.8 MWh).</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Leaf className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Time-of-Use Optimization</h4>
                  <p className="text-sm text-muted-foreground">Shifting consumption to low-carbon intensity hours could reduce emissions by 12%.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 