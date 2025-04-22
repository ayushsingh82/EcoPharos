"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { date: "Jan", emissions: 120, verified: 80 },
  { date: "Feb", emissions: 150, verified: 100 },
  { date: "Mar", emissions: 180, verified: 120 },
  { date: "Apr", emissions: 170, verified: 130 },
  { date: "May", emissions: 200, verified: 150 },
  { date: "Jun", emissions: 220, verified: 170 },
  { date: "Jul", emissions: 240, verified: 190 },
  { date: "Aug", emissions: 230, verified: 200 },
  { date: "Sep", emissions: 210, verified: 180 },
  { date: "Oct", emissions: 190, verified: 170 },
  { date: "Nov", emissions: 170, verified: 150 },
  { date: "Dec", emissions: 150, verified: 130 },
]

export default function CarbonEmissionsChart() {
  return (
    <ChartContainer
      config={{
        emissions: {
          label: "Total Emissions",
          color: "hsl(142, 76%, 36%)",
        },
        verified: {
          label: "Verified Credits",
          color: "hsl(217, 91%, 60%)",
        },
      }}
      className="h-[300px]"
    >
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="date" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          type="monotone"
          dataKey="emissions"
          stroke="var(--color-emissions)"
          fill="var(--color-emissions)"
          fillOpacity={0.3}
        />
        <Area
          type="monotone"
          dataKey="verified"
          stroke="var(--color-verified)"
          fill="var(--color-verified)"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ChartContainer>
  )
}
