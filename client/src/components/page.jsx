import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Leaf, Plane, Car, Clock, AlertCircle } from "../components/icons"
import { Button } from "../components/ui/button"
import OracleStatusCard from "../components/oracle-status-card"
import RecentUpdatesTable from "../components/recent-updates-table"
import DashboardChart from "../components/dashboard-chart"

const Dashboard = () => {
  const [stats, setStats] = useState({
    electricity: { lastUpdate: null, carbonKg: 0 },
    flight: { lastUpdate: null, carbonKg: 0 },
    vehicle: { lastUpdate: null, carbonKg: 0 }
  });
  
  const [recentUpdates, setRecentUpdates] = useState([
    {
      oracle: 'Electricity',
      event: 'Data Updated',
      carbon: '18051 kg',
      time: '2 minutes ago'
    },
    {
      oracle: 'Flight',
      event: 'New Flight Added',
      carbon: '1077 kg',
      time: '5 minutes ago'
    },
    {
      oracle: 'Vehicle',
      event: 'Vehicle Data Updated',
      carbon: '385 kg',
      time: '7 minutes ago'
    },
    {
      oracle: 'Electricity',
      event: 'Verification Complete',
      carbon: '17500 kg',
      time: '1 hour ago'
    },
    {
      oracle: 'Flight',
      event: 'Flight Verified',
      carbon: '980 kg',
      time: '3 hours ago'
    }
  ]);
  
  const [chartData, setChartData] = useState([
    { label: 'Mon', value: 65 },
    { label: 'Tue', value: 72 },
    { label: 'Wed', value: 58 },
    { label: 'Thu', value: 80 },
    { label: 'Fri', value: 74 },
    { label: 'Sat', value: 45 },
    { label: 'Sun', value: 35 }
  ]);
  
  useEffect(() => {
    // In a real app, you would fetch this data from your backend or directly from the blockchain
    const fetchData = async () => {
      try {
        // Simulate API calls
        // In production, replace with actual API calls to your oracles
        setStats({
          electricity: { 
            lastUpdate: new Date().toISOString(), 
            carbonKg: 18051 
          },
          flight: { 
            lastUpdate: new Date().toISOString(), 
            carbonKg: 1077 
          },
          vehicle: { 
            lastUpdate: new Date().toISOString(), 
            carbonKg: 385 
          }
        });
      } catch (error) {
        console.error("Error fetching oracle data:", error);
      }
    };
    
    fetchData();
    
    // Set up polling every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  
  const totalCarbon = stats.electricity.carbonKg + stats.flight.carbonKg + stats.vehicle.carbonKg;
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last 7 days
          </Button>
          <Button size="sm">
            <AlertCircle className="mr-2 h-4 w-4" />
            View Alerts
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Carbon Tracked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCarbon}</div>
            <p className="text-xs text-muted-foreground">kg CO₂</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Electricity Emissions</CardTitle>
            <Leaf className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.electricity.carbonKg}</div>
            <p className="text-xs text-muted-foreground">kg CO₂</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flight Emissions</CardTitle>
            <Plane className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.flight.carbonKg}</div>
            <p className="text-xs text-muted-foreground">kg CO₂</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card text-card-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehicle Emissions</CardTitle>
            <Car className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.vehicle.carbonKg}</div>
            <p className="text-xs text-muted-foreground">kg CO₂</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
        <Card className="md:col-span-4 bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Carbon Emissions by Source</CardTitle>
            <CardDescription>
              Monthly carbon emissions from all sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <DashboardChart data={chartData} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3 bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Oracle Status</CardTitle>
            <CardDescription>
              Current status of carbon oracles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <OracleStatusCard 
              title="Electricity Oracle" 
              status="Online" 
              icon={<Leaf className="h-4 w-4 text-green-500" />}
              lastUpdate="Updated 2 hours ago"
              description="Tracking grid electricity consumption"
            />
            
            <OracleStatusCard 
              title="Flight Oracle" 
              status="Online" 
              icon={<Plane className="h-4 w-4 text-blue-500" />}
              lastUpdate="Updated 5 hours ago"
              description="Tracking flight emissions"
            />
            
            <OracleStatusCard 
              title="Vehicle Oracle" 
              status="Online" 
              icon={<Car className="h-4 w-4 text-orange-500" />}
              lastUpdate="Updated 1 day ago"
              description="Tracking vehicle emissions"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>
            Latest carbon tracking events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecentUpdatesTable updates={recentUpdates} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
