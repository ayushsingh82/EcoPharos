import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const carbonData = [
  {
    id: "1",
    source: "Industrial Plant A",
    location: "Berlin, Germany",
    timestamp: "2023-04-22 14:32:15",
    emissions: "12.5 tons",
    status: "verified",
  },
  {
    id: "2",
    source: "Power Station B",
    location: "Madrid, Spain",
    timestamp: "2023-04-22 14:30:22",
    emissions: "28.3 tons",
    status: "verified",
  },
  {
    id: "3",
    source: "Manufacturing Facility C",
    location: "Milan, Italy",
    timestamp: "2023-04-22 14:28:05",
    emissions: "9.7 tons",
    status: "pending",
  },
  {
    id: "4",
    source: "Chemical Plant D",
    location: "Lyon, France",
    timestamp: "2023-04-22 14:25:47",
    emissions: "15.2 tons",
    status: "verified",
  },
  {
    id: "5",
    source: "Steel Mill E",
    location: "Manchester, UK",
    timestamp: "2023-04-22 14:20:11",
    emissions: "31.8 tons",
    status: "pending",
  },
]

export default function CarbonDataTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Source</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Timestamp</TableHead>
          <TableHead>Emissions</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {carbonData.map((data) => (
          <TableRow key={data.id}>
            <TableCell className="font-medium">{data.source}</TableCell>
            <TableCell>{data.location}</TableCell>
            <TableCell>{data.timestamp}</TableCell>
            <TableCell>{data.emissions}</TableCell>
            <TableCell>
              <Badge
                variant={data.status === "verified" ? "outline" : "secondary"}
                className={data.status === "verified" ? "border-emerald-500 text-emerald-500" : ""}
              >
                {data.status === "verified" ? "Verified" : "Pending"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
