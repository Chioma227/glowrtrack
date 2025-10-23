import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner@2.0.3";

interface Service {
  id: number;
  name: string;
  price: string;
}

const INITIAL_SERVICES: Service[] = [
  { id: 1, name: "Nail Polish", price: "₦8,000" },
  { id: 2, name: "Gel Manicure", price: "₦15,000" },
  { id: 3, name: "Pedicure", price: "₦10,000" },
  { id: 4, name: "Lash Extension", price: "₦25,000" },
  { id: 5, name: "Lash Lift", price: "₦18,000" },
  { id: 6, name: "Eyebrow Shaping", price: "₦5,000" },
  { id: 7, name: "Waxing - Full Body", price: "₦20,000" },
  { id: 8, name: "Waxing - Half Body", price: "₦12,000" },
  { id: 9, name: "Facial Treatment", price: "₦22,000" },
  { id: 10, name: "Massage Therapy", price: "₦30,000" },
];

export function ServiceManagement() {
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setServiceName(service.name);
      setServicePrice(service.price);
    } else {
      setEditingService(null);
      setServiceName("");
      setServicePrice("");
    }
    setIsDialogOpen(true);
  };

  const handleSaveService = () => {
    if (!serviceName || !servicePrice) {
      toast.error("Please fill in all fields");
      return;
    }

    if (editingService) {
      setServices(services.map(s => 
        s.id === editingService.id 
          ? { ...s, name: serviceName, price: servicePrice }
          : s
      ));
      toast.success("Service updated successfully");
    } else {
      const newService: Service = {
        id: Math.max(...services.map(s => s.id)) + 1,
        name: serviceName,
        price: servicePrice,
      };
      setServices([...services, newService]);
      toast.success("Service added successfully");
    }

    setIsDialogOpen(false);
    setServiceName("");
    setServicePrice("");
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
    toast.success("Service deleted successfully");
  };

  return (
    <div className="p-8">
      <Card className="p-6 rounded-3xl border-border shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl">Service Management</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleOpenDialog()}
                className="rounded-2xl text-white shadow-md hover:shadow-lg transition-all"
                style={{ background: "linear-gradient(135deg, #c9a27b 0%, #b08968 100%)" }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Service
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? "Edit Service" : "Add New Service"}
                </DialogTitle>
                <DialogDescription>
                  {editingService 
                    ? "Update the service details below" 
                    : "Enter the details for the new service"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Service Name</Label>
                  <Input
                    id="serviceName"
                    placeholder="e.g., Nail Polish"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="rounded-2xl h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servicePrice">Price</Label>
                  <Input
                    id="servicePrice"
                    placeholder="e.g., ₦8,000"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    className="rounded-2xl h-12"
                  />
                </div>
                <Button
                  onClick={handleSaveService}
                  className="w-full rounded-2xl h-12 text-white"
                  style={{ background: "linear-gradient(135deg, #c9a27b 0%, #b08968 100%)" }}
                >
                  {editingService ? "Update Service" : "Add Service"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Service Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>{service.price}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(service)}
                        className="rounded-xl"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                        className="rounded-xl text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
