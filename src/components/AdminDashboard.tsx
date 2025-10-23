import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  Trophy,
  Coins
} from "lucide-react";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

const RECENT_LOGS = [
  { id: 1, staff: "Ada Okonkwo", client: "Mrs. Johnson", services: ["Nail Polish", "Pedicure"], price: "₦12,000", date: "Oct 22, 2025 2:30 PM" },
  { id: 2, staff: "Ruth Ezeh", client: "Sarah Williams", services: ["Lash Extension"], price: "₦25,000", date: "Oct 22, 2025 1:15 PM" },
  { id: 3, staff: "Chioma Nwosu", client: "Jessica Brown", services: ["Facial Treatment", "Massage"], price: "₦35,000", date: "Oct 22, 2025 12:45 PM" },
  { id: 4, staff: "Ada Okonkwo", client: "Emily Davis", services: ["Gel Manicure"], price: "₦15,000", date: "Oct 22, 2025 11:20 AM" },
  { id: 5, staff: "Ruth Ezeh", client: "Jennifer Wilson", services: ["Waxing - Full Body"], price: "₦18,000", date: "Oct 22, 2025 10:30 AM" },
];

const TOP_PERFORMERS_COUNT = [
  { name: "Ada Okonkwo", count: 23, avatar: "AO" },
  { name: "Ruth Ezeh", count: 21, avatar: "RE" },
  { name: "Chioma Nwosu", count: 18, avatar: "CN" },
];

const TOP_PERFORMERS_VALUE = [
  { name: "Ruth Ezeh", value: "₦185,000", avatar: "RE" },
  { name: "Ada Okonkwo", value: "₦168,000", avatar: "AO" },
  { name: "Chioma Nwosu", value: "₦152,000", avatar: "CN" },
];

export function AdminDashboard() {
  const [filter, setFilter] = useState("today");

  return (
    <div className="p-8 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 rounded-3xl border-border shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-blush-pink/20 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Services Today</p>
              <h3 className="text-3xl">47</h3>
              <p className="text-xs text-muted-foreground mt-1">+12% from yesterday</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-gold to-rose-gold/70 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-3xl border-border shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-lavender/20 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Revenue Today</p>
              <h3 className="text-3xl">₦425K</h3>
              <p className="text-xs text-muted-foreground mt-1">+8% from yesterday</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lavender to-lavender/70 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-3xl border-border shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-nude-beige/30 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Staff</p>
              <h3 className="text-3xl">12</h3>
              <p className="text-xs text-muted-foreground mt-1">8 currently working</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-gold/70 to-nude-beige flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 rounded-3xl border-border shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-rose-gold/10 to-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">This Month</p>
              <h3 className="text-3xl">892</h3>
              <p className="text-xs text-muted-foreground mt-1">Total services</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-gold/50 to-rose-gold/30 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-3xl border-border shadow-md">
          <div className="flex items-center mb-4">
            <Trophy className="w-5 h-5 mr-2" style={{ color: "#c9a27b" }} />
            <h3 className="text-lg">Top Staff by Count</h3>
          </div>
          <div className="space-y-3">
            {TOP_PERFORMERS_COUNT.map((performer, index) => (
              <div key={performer.name} className="flex items-center justify-between p-3 rounded-2xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm text-white"
                    style={{ background: "linear-gradient(135deg, #c9a27b 0%, #d4a5d4 100%)" }}>
                    {performer.avatar}
                  </div>
                  <div>
                    <p className="font-medium">{performer.name}</p>
                    <p className="text-sm text-muted-foreground">{performer.count} services</p>
                  </div>
                </div>
                <Badge className="rounded-full" variant="secondary">
                  #{index + 1}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 rounded-3xl border-border shadow-md">
          <div className="flex items-center mb-4">
            <Coins className="w-5 h-5 mr-2" style={{ color: "#c9a27b" }} />
            <h3 className="text-lg">Top Staff by Value</h3>
          </div>
          <div className="space-y-3">
            {TOP_PERFORMERS_VALUE.map((performer, index) => (
              <div key={performer.name} className="flex items-center justify-between p-3 rounded-2xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm text-white"
                    style={{ background: "linear-gradient(135deg, #c9a27b 0%, #d4a5d4 100%)" }}>
                    {performer.avatar}
                  </div>
                  <div>
                    <p className="font-medium">{performer.name}</p>
                    <p className="text-sm text-muted-foreground">{performer.value}</p>
                  </div>
                </div>
                <Badge className="rounded-full" variant="secondary">
                  #{index + 1}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Logs */}
      <Card className="p-6 rounded-3xl border-border shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg">Recent Logs</h3>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40 rounded-2xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Staff</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Service(s)</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_LOGS.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.staff}</TableCell>
                  <TableCell>{log.client}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {log.services.map((service) => (
                        <Badge key={service} variant="secondary" className="rounded-full text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{log.price}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{log.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
