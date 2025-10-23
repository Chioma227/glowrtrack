import { useState } from "react";
import { Download, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";

const ALL_LOGS = [
  { id: 1, date: "Oct 22, 2025", staff: "Ada Okonkwo", client: "Mrs. Johnson", services: ["Nail Polish", "Pedicure"], total: "₦18,000" },
  { id: 2, date: "Oct 22, 2025", staff: "Ruth Ezeh", client: "Sarah Williams", services: ["Lash Extension"], total: "₦25,000" },
  { id: 3, date: "Oct 22, 2025", staff: "Chioma Nwosu", client: "Jessica Brown", services: ["Facial Treatment", "Massage"], total: "₦52,000" },
  { id: 4, date: "Oct 22, 2025", staff: "Ada Okonkwo", client: "Emily Davis", services: ["Gel Manicure"], total: "₦15,000" },
  { id: 5, date: "Oct 22, 2025", staff: "Ruth Ezeh", client: "Jennifer Wilson", services: ["Waxing - Full Body"], total: "₦20,000" },
  { id: 6, date: "Oct 21, 2025", staff: "Grace Adeyemi", client: "Amanda Lee", services: ["Nail Polish"], total: "₦8,000" },
  { id: 7, date: "Oct 21, 2025", staff: "Chioma Nwosu", client: "Michelle Taylor", services: ["Massage Therapy"], total: "₦30,000" },
  { id: 8, date: "Oct 21, 2025", staff: "Ada Okonkwo", client: "Rebecca Moore", services: ["Lash Lift", "Eyebrow Shaping"], total: "₦23,000" },
  { id: 9, date: "Oct 20, 2025", staff: "Ruth Ezeh", client: "Ashley Martin", services: ["Facial Treatment"], total: "₦22,000" },
  { id: 10, date: "Oct 20, 2025", staff: "Grace Adeyemi", client: "Sophia Garcia", services: ["Gel Manicure", "Pedicure"], total: "₦25,000" },
];

export function LogsReports() {
  const [staffFilter, setStaffFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  const filteredLogs = ALL_LOGS.filter(log => {
    if (staffFilter !== "all" && log.staff !== staffFilter) return false;
    if (dateFilter === "today" && log.date !== "Oct 22, 2025") return false;
    if (dateFilter === "yesterday" && log.date !== "Oct 21, 2025") return false;
    return true;
  });

  const totalServices = filteredLogs.length;
  const totalRevenue = filteredLogs.reduce((sum, log) => {
    const amount = parseInt(log.total.replace(/[₦,]/g, ""));
    return sum + amount;
  }, 0);

  const handleExportCSV = () => {
    toast.success("CSV export initiated", {
      description: "Your report will download shortly"
    });
  };

  return (
    <div className="p-8 space-y-6">
      <Card className="p-6 rounded-3xl border-border shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl">Logs & Reports</h3>
          <Button
            variant="outline"
            onClick={handleExportCSV}
            className="rounded-2xl border-2"
            style={{ borderColor: "#d4a5d4" }}
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Staff</label>
            <Select value={staffFilter} onValueChange={setStaffFilter}>
              <SelectTrigger className="rounded-2xl h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Staff</SelectItem>
                <SelectItem value="Ada Okonkwo">Ada Okonkwo</SelectItem>
                <SelectItem value="Ruth Ezeh">Ruth Ezeh</SelectItem>
                <SelectItem value="Chioma Nwosu">Chioma Nwosu</SelectItem>
                <SelectItem value="Grace Adeyemi">Grace Adeyemi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Date Range</label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="rounded-2xl h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Service Type</label>
            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="rounded-2xl h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                <SelectItem value="nail">Nail Services</SelectItem>
                <SelectItem value="lash">Lash Services</SelectItem>
                <SelectItem value="waxing">Waxing</SelectItem>
                <SelectItem value="facial">Facial/Massage</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-border overflow-hidden mb-6">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Date</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Service(s)</TableHead>
                <TableHead className="text-right">Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-sm text-muted-foreground">{log.date}</TableCell>
                  <TableCell className="font-medium">{log.staff}</TableCell>
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
                  <TableCell className="text-right font-medium">{log.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl border-2 border-border bg-gradient-to-br from-blush-pink/20 to-white">
            <p className="text-sm text-muted-foreground mb-1">Total Services</p>
            <p className="text-3xl">{totalServices}</p>
          </div>
          <div className="p-4 rounded-2xl border-2 border-border bg-gradient-to-br from-lavender/20 to-white">
            <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
            <p className="text-3xl">₦{totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
