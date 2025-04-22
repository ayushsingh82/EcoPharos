import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Leaf, ArrowUpRight, ArrowDownRight, Clock, RefreshCw } from "lucide-react"
import CarbonEmissionsChart from "./carbon-emissions-chart"
import CarbonDataTable from "./carbon-data-table"

export default function CarbonOraclePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center">
            <Leaf className="mr-2 h-5 w-5 text-emerald-500" />
            <h1 className="text-3xl font-bold tracking-tight">Carbon Oracle</h1>
          </div>
          <p className="text-muted-foreground">Real-time carbon emissions data and carbon credit verification</p>
        </div>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Carbon Tracked</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284.5 tons</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              +2.5% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Credits Verified</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856.2 tons</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              +5.3% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,243</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              +12.3% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">215ms</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownRight className="mr-1 h-4 w-4 text-emerald-500" />
              -15ms from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="emissions">
        <TabsList>
          <TabsTrigger value="emissions">Emissions Data</TabsTrigger>
          <TabsTrigger value="credits">Carbon Credits</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="emissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Emissions Trend</CardTitle>
              <CardDescription>Carbon emissions tracked over time</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <CarbonEmissionsChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Latest Carbon Data</CardTitle>
              <CardDescription>Most recent carbon emissions data points</CardDescription>
            </CardHeader>
            <CardContent>
              <CarbonDataTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="credits" className="space-y-4">
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            Carbon credits data would appear here
          </div>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            Data sources information would appear here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
