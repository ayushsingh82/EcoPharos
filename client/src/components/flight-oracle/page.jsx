import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import { Plane, ArrowUpRight, ArrowDownRight, Clock, RefreshCw } from "../../components/icons";
import FlightDataTable from "./flight-data-table";

export default function FlightOraclePage() {
  const [flightData, setFlightData] = useState({
    totalFlights: 128,
    totalEmissions: 2450,
    averageEmissions: 19.1,
    timestamp: new Date().toISOString()
  });

  // Sample data for the flight emissions chart
  const flightEmissionsData = [
    { month: 'Jan', domestic: 320, shortHaul: 580, longHaul: 950, cargo: 210 },
    { month: 'Feb', domestic: 290, shortHaul: 540, longHaul: 920, cargo: 230 },
    { month: 'Mar', domestic: 350, shortHaul: 620, longHaul: 980, cargo: 240 },
    { month: 'Apr', domestic: 380, shortHaul: 650, longHaul: 1020, cargo: 260 },
    { month: 'May', domestic: 410, shortHaul: 680, longHaul: 1050, cargo: 270 },
    { month: 'Jun', domestic: 440, shortHaul: 710, longHaul: 1100, cargo: 290 },
  ];

  const refreshData = () => {
    // In a real app, you would fetch data from your API
    console.log('Refreshing flight data...');
  };

  // Custom chart component for flight emissions
  const SimpleFlightEmissionsChart = () => {
    const maxValue = Math.max(
      ...flightEmissionsData.flatMap(d => [d.domestic, d.shortHaul, d.longHaul, d.cargo])
    );
    
    return (
      <div className="w-full h-full">
        <div className="flex items-end h-[250px] gap-4 pt-6 pb-2">
          {flightEmissionsData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex justify-between items-end h-[200px]">
                <div 
                  className="w-[15%] bg-sky-400 rounded-t-sm" 
                  style={{ height: `${(data.domestic / maxValue) * 100}%` }}
                  title={`Domestic: ${data.domestic}kg`}
                />
                <div 
                  className="w-[15%] bg-indigo-500 rounded-t-sm" 
                  style={{ height: `${(data.shortHaul / maxValue) * 100}%` }}
                  title={`Short Haul: ${data.shortHaul}kg`}
                />
                <div 
                  className="w-[15%] bg-violet-600 rounded-t-sm" 
                  style={{ height: `${(data.longHaul / maxValue) * 100}%` }}
                  title={`Long Haul: ${data.longHaul}kg`}
                />
                <div 
                  className="w-[15%] bg-amber-500 rounded-t-sm" 
                  style={{ height: `${(data.cargo / maxValue) * 100}%` }}
                  title={`Cargo: ${data.cargo}kg`}
                />
              </div>
              <span className="text-xs text-muted-foreground">{data.month}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-4 gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-sky-400 rounded-sm mr-1"></div>
            <span className="text-xs">Domestic</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-500 rounded-sm mr-1"></div>
            <span className="text-xs">Short Haul</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-violet-600 rounded-sm mr-1"></div>
            <span className="text-xs">Long Haul</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-amber-500 rounded-sm mr-1"></div>
            <span className="text-xs">Cargo</span>
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
              +12 from last month
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
              +5.8% from last month
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
              -0.3% from last month
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

      {/* Chart card below the data boxes */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Flight Emissions</CardTitle>
          <CardDescription>
            Carbon emissions by flight type over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SimpleFlightEmissionsChart />
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
              <CardTitle>Flight Carbon Emissions</CardTitle>
              <CardDescription>
                Monthly carbon emissions by flight type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <SimpleFlightEmissionsChart />
              </div>
            </CardContent>
          </Card>
          
          {/* New content below Overview tab */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Flight Routes</CardTitle>
                <CardDescription>
                  Most frequent routes and their emissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
                      <span>New York - London</span>
                    </div>
                    <div className="font-medium">342 kg/passenger</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
                      <span>Los Angeles - Tokyo</span>
                    </div>
                    <div className="font-medium">510 kg/passenger</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-purple-500 rounded-sm mr-2"></div>
                      <span>Chicago - Miami</span>
                    </div>
                    <div className="font-medium">168 kg/passenger</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '33%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-orange-500 rounded-sm mr-2"></div>
                      <span>Paris - Dubai</span>
                    </div>
                    <div className="font-medium">385 kg/passenger</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Emissions by Airline</CardTitle>
                <CardDescription>
                  Carbon efficiency comparison by carrier
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-sky-400 rounded-sm mr-2"></div>
                      <span>Airline A</span>
                    </div>
                    <div className="font-medium">92 g/passenger-km</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-sky-400 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-indigo-500 rounded-sm mr-2"></div>
                      <span>Airline B</span>
                    </div>
                    <div className="font-medium">85 g/passenger-km</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-violet-600 rounded-sm mr-2"></div>
                      <span>Airline C</span>
                    </div>
                    <div className="font-medium">78 g/passenger-km</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-violet-600 h-2.5 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-amber-500 rounded-sm mr-2"></div>
                      <span>Airline D</span>
                    </div>
                    <div className="font-medium">105 g/passenger-km</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
              <FlightDataTable />
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Flight Emissions by Type</CardTitle>
              <CardDescription>
                Monthly carbon emissions breakdown by flight type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <SimpleFlightEmissionsChart />
              </div>
            </CardContent>
          </Card>
          
          {/* New content below Data tab */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Emissions by Aircraft Type</CardTitle>
                <CardDescription>
                  Carbon efficiency by aircraft model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-sm mr-2"></div>
                      <span>Boeing 787</span>
                    </div>
                    <div className="font-medium">75 g/passenger-km</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-sm mr-2"></div>
                      <span>Airbus A350</span>
                    </div>
                    <div className="font-medium">78 g/passenger-km</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-purple-500 rounded-sm mr-2"></div>
                      <span>Boeing 777</span>
                    </div>
                    <div className="font-medium">88 g/passenger-km</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-orange-500 rounded-sm mr-2"></div>
                      <span>Airbus A320neo</span>
                    </div>
                    <div className="font-medium">68 g/passenger-km</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '54%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Fuel Efficiency Trends</CardTitle>
                <CardDescription>
                  Historical improvement in aviation efficiency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-sky-400 rounded-sm mr-2"></div>
                      <span>1990s Aircraft</span>
                    </div>
                    <div className="font-medium">120 g/passenger-km</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-sky-400 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-indigo-500 rounded-sm mr-2"></div>
                      <span>2000s Aircraft</span>
                    </div>
                    <div className="font-medium">105 g/passenger-km</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-violet-600 rounded-sm mr-2"></div>
                      <span>2010s Aircraft</span>
                    </div>
                    <div className="font-medium">85 g/passenger-km</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-violet-600 h-2.5 rounded-full" style={{ width: '71%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-amber-500 rounded-sm mr-2"></div>
                      <span>Current Generation</span>
                    </div>
                    <div className="font-medium">70 g/passenger-km</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '58%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Additional content below tabs */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Flight Emissions by Distance</CardTitle>
            <CardDescription>
              Carbon impact based on flight distance categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-sky-400 rounded-sm mr-2"></div>
                  <span>Domestic ({"<"} 1,000 km)</span>
                </div>
                <div className="font-medium">18%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-sky-400 h-2.5 rounded-full" style={{ width: '18%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-indigo-500 rounded-sm mr-2"></div>
                  <span>Short Haul (1,000-3,000 km)</span>
                </div>
                <div className="font-medium">27%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '27%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-violet-600 rounded-sm mr-2"></div>
                  <span>Long Haul ({">"} 3,000 km)</span>
                </div>
                <div className="font-medium">43%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-violet-600 h-2.5 rounded-full" style={{ width: '43%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-amber-500 rounded-sm mr-2"></div>
                  <span>Cargo</span>
                </div>
                <div className="font-medium">12%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Emission Reduction Strategies</CardTitle>
            <CardDescription>
              Opportunities to reduce flight carbon footprint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Plane className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Sustainable Aviation Fuel</h4>
                  <p className="text-sm text-muted-foreground">Using SAF could reduce emissions by up to 80% compared to conventional jet fuel.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Plane className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Flight Optimization</h4>
                  <p className="text-sm text-muted-foreground">Optimizing routes and altitudes could reduce fuel consumption by 5-10%.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Plane className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Fleet Modernization</h4>
                  <p className="text-sm text-muted-foreground">Newer aircraft models are 15-20% more fuel-efficient than older generations.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Plane className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Carbon Offsetting</h4>
                  <p className="text-sm text-muted-foreground">Investing in verified carbon offset projects to neutralize unavoidable emissions.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
