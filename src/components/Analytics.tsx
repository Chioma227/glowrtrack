import { Card } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Trophy, TrendingUp, DollarSign } from "lucide-react";
import { Badge } from "./ui/badge";

const servicesPerStaff = [
  { name: "Ada", services: 23 },
  { name: "Ruth", services: 21 },
  { name: "Chioma", services: 18 },
  { name: "Grace", services: 15 },
  { name: "Blessing", services: 12 },
];

const revenuePerStaff = [
  { name: "Ada", revenue: 168 },
  { name: "Ruth", revenue: 185 },
  { name: "Chioma", revenue: 152 },
  { name: "Grace", revenue: 128 },
  { name: "Blessing", revenue: 95 },
];

const topStaffByCount = [
  { name: "Ada Okonkwo", count: 23 },
  { name: "Ruth Ezeh", count: 21 },
  { name: "Chioma Nwosu", count: 18 },
];

const topStaffByValue = [
  { name: "Ruth Ezeh", value: "₦185,000" },
  { name: "Ada Okonkwo", value: "₦168,000" },
  { name: "Chioma Nwosu", value: "₦152,000" },
];

const serviceTypes = [
  { name: "Nail Services", value: 35, color: "#f4c7d5" },
  { name: "Lash Services", value: 28, color: "#d4a5d4" },
  { name: "Waxing", value: 18, color: "#c9a27b" },
  { name: "Facial/Massage", value: 12, color: "#a8d5ba" },
  { name: "Other", value: 7, color: "#ffd7ba" },
];

const COLORS = ["#f4c7d5", "#d4a5d4", "#c9a27b", "#a8d5ba", "#ffd7ba"];

export function Analytics() {
  return (
    <div className="p-8 space-y-6">
      <h2 className="text-2xl mb-6">Analytics & Performance</h2>

      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-3xl border-border shadow-md">
          <div className="flex items-center mb-4">
            <Trophy className="w-5 h-5 mr-2" style={{ color: "#c9a27b" }} />
            <h3 className="text-lg">Top 3 Staff by Count</h3>
          </div>
          <div className="space-y-3">
            {topStaffByCount.map((staff, index) => (
              <div key={staff.name} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blush-pink/20 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ background: "linear-gradient(135deg, #c9a27b 0%, #d4a5d4 100%)" }}>
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{staff.name}</p>
                    <p className="text-sm text-muted-foreground">{staff.count} services</p>
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 rounded-3xl border-border shadow-md">
          <div className="flex items-center mb-4">
            <DollarSign className="w-5 h-5 mr-2" style={{ color: "#c9a27b" }} />
            <h3 className="text-lg">Top 3 Staff by Value</h3>
          </div>
          <div className="space-y-3">
            {topStaffByValue.map((staff, index) => (
              <div key={staff.name} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-lavender/20 to-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ background: "linear-gradient(135deg, #c9a27b 0%, #d4a5d4 100%)" }}>
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{staff.name}</p>
                    <p className="text-sm text-muted-foreground">{staff.value}</p>
                  </div>
                </div>
                <TrendingUp className="w-5 h-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-3xl border-border shadow-md">
          <h3 className="text-lg mb-4">Services per Staff</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={servicesPerStaff}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8d5d0" />
              <XAxis dataKey="name" stroke="#9e9e9e" />
              <YAxis stroke="#9e9e9e" />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "16px", 
                  border: "1px solid #e8d5d0",
                  backgroundColor: "rgba(255, 255, 255, 0.95)"
                }} 
              />
              <Bar dataKey="services" fill="#c9a27b" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 rounded-3xl border-border shadow-md">
          <h3 className="text-lg mb-4">Revenue per Staff (₦000s)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenuePerStaff}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e8d5d0" />
              <XAxis dataKey="name" stroke="#9e9e9e" />
              <YAxis stroke="#9e9e9e" />
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "16px", 
                  border: "1px solid #e8d5d0",
                  backgroundColor: "rgba(255, 255, 255, 0.95)"
                }} 
              />
              <Bar dataKey="revenue" fill="#d4a5d4" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Pie Chart */}
      <Card className="p-6 rounded-3xl border-border shadow-md">
        <h3 className="text-lg mb-4">Most Requested Service Types</h3>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={serviceTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {serviceTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: "16px", 
                  border: "1px solid #e8d5d0",
                  backgroundColor: "rgba(255, 255, 255, 0.95)"
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="space-y-2">
            {serviceTypes.map((service, index) => (
              <div key={service.name} className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm">{service.name}: {service.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
