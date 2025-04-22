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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button>Refresh Data</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <OracleStatusCard
          title="Carbon Oracle"
          icon={<Leaf className="h-4 w-4 text-emerald-500" />}
          status="online"
          lastUpdate="2 minutes ago"
          path="/electricity"
        />
        <OracleStatusCard
          title="Flight Oracle"
          icon={<Plane className="h-4 w-4 text-blue-500" />}
          status="online"
          lastUpdate="5 minutes ago"
          path="/flight"
        />
        <OracleStatusCard
          title="Vehicle Carbon Oracle"
          icon={<Car className="h-4 w-4 text-orange-500" />}
          status="online"
          lastUpdate="7 minutes ago"
          path="/vehicle"
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recent">Recent Updates</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Carbon Emissions
                </CardTitle>
                <Leaf className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.electricity.carbonKg + stats.flight.carbonKg + stats.vehicle.carbonKg} kg
                </div>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Electricity Carbon
                </CardTitle>
                <Leaf className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.electricity.carbonKg} kg</div>
                <p className="text-xs text-muted-foreground">
                  +1.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Flight Carbon
                </CardTitle>
                <Plane className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.flight.carbonKg} kg</div>
                <p className="text-xs text-muted-foreground">
                  +5.1% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Carbon Emissions</CardTitle>
              <CardDescription>
                Daily carbon emissions over the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DashboardChart data={chartData} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Updates</CardTitle>
              <CardDescription>
                Latest updates from all oracles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentUpdatesTable updates={recentUpdates} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>Latest data updates from all oracles</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentUpdatesTable />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Carbon Tracked</h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold">{totalCarbon}</span>
            <span className="text-gray-500 ml-2">kg CO₂</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Electricity Emissions</h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold">{stats.electricity.carbonKg}</span>
            <span className="text-gray-500 ml-2">kg CO₂</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Flight Emissions</h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold">{stats.flight.carbonKg}</span>
            <span className="text-gray-500 ml-2">kg CO₂</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Vehicle Emissions</h3>
          <div className="flex items-end">
            <span className="text-3xl font-bold">{stats.vehicle.carbonKg}</span>
            <span className="text-gray-500 ml-2">kg CO₂</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Carbon Emissions by Source</h2>
          <div className="h-64 flex items-center justify-center">
            {/* In a real app, you would use a charting library like Chart.js or Recharts */}
            <div className="flex items-end h-48 space-x-12">
              <div className="flex flex-col items-center">
                <div 
                  className="w-24 bg-blue-500 rounded-t-md" 
                  style={{ height: `${(stats.electricity.carbonKg / totalCarbon) * 100}%` }}
                ></div>
                <span className="mt-2">Electricity</span>
              </div>
              <div className="flex flex-col items-center">
                <div 
                  className="w-24 bg-green-500 rounded-t-md" 
                  style={{ height: `${(stats.flight.carbonKg / totalCarbon) * 100}%` }}
                ></div>
                <span className="mt-2">Flight</span>
              </div>
              <div className="flex flex-col items-center">
                <div 
                  className="w-24 bg-purple-500 rounded-t-md" 
                  style={{ height: `${(stats.vehicle.carbonKg / totalCarbon) * 100}%` }}
                ></div>
                <span className="mt-2">Vehicle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent Updates</h2>
          <RecentUpdatesTable />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
