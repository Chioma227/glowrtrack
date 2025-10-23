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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { toast } from "sonner@2.0.3";

interface Staff {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

const INITIAL_STAFF: Staff[] = [
  { id: 1, name: "Ada Okonkwo", email: "ada@glowtrack.com", role: "Senior Technician", status: "active" },
  { id: 2, name: "Ruth Ezeh", email: "ruth@glowtrack.com", role: "Beautician", status: "active" },
  { id: 3, name: "Chioma Nwosu", email: "chioma@glowtrack.com", role: "Massage Therapist", status: "active" },
  { id: 4, name: "Grace Adeyemi", email: "grace@glowtrack.com", role: "Nail Technician", status: "active" },
  { id: 5, name: "Blessing Okeke", email: "blessing@glowtrack.com", role: "Beautician", status: "inactive" },
];

export function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [staffName, setStaffName] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffRole, setStaffRole] = useState("");
  const [staffPassword, setStaffPassword] = useState("");

  const handleOpenDialog = (staffMember?: Staff) => {
    if (staffMember) {
      setEditingStaff(staffMember);
      setStaffName(staffMember.name);
      setStaffEmail(staffMember.email);
      setStaffRole(staffMember.role);
      setStaffPassword("");
    } else {
      setEditingStaff(null);
      setStaffName("");
      setStaffEmail("");
      setStaffRole("");
      setStaffPassword("");
    }
    setIsDialogOpen(true);
  };

  const handleSaveStaff = () => {
    if (!staffName || !staffEmail || !staffRole) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (editingStaff) {
      setStaff(staff.map(s => 
        s.id === editingStaff.id 
          ? { ...s, name: staffName, email: staffEmail, role: staffRole }
          : s
      ));
      toast.success("Staff updated successfully");
    } else {
      if (!staffPassword) {
        toast.error("Password is required for new staff");
        return;
      }
      const newStaff: Staff = {
        id: Math.max(...staff.map(s => s.id)) + 1,
        name: staffName,
        email: staffEmail,
        role: staffRole,
        status: "active",
      };
      setStaff([...staff, newStaff]);
      toast.success("Staff added successfully");
    }

    setIsDialogOpen(false);
  };

  const handleDeleteStaff = (id: number) => {
    setStaff(staff.filter(s => s.id !== id));
    toast.success("Staff deleted successfully");
  };

  const toggleStatus = (id: number) => {
    setStaff(staff.map(s => 
      s.id === id 
        ? { ...s, status: s.status === "active" ? "inactive" : "active" }
        : s
    ));
    toast.success("Staff status updated");
  };

  return (
    <div className="p-8">
      <Card className="p-6 rounded-3xl border-border shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl">Staff Management</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleOpenDialog()}
                className="rounded-2xl text-white shadow-md hover:shadow-lg transition-all"
                style={{ background: "linear-gradient(135deg, #c9a27b 0%, #b08968 100%)" }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-3xl">
              <DialogHeader>
                <DialogTitle>
                  {editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
                </DialogTitle>
                <DialogDescription>
                  {editingStaff 
                    ? "Update the staff member details below" 
                    : "Enter the details for the new staff member"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="staffName">Name</Label>
                  <Input
                    id="staffName"
                    placeholder="Full name"
                    value={staffName}
                    onChange={(e) => setStaffName(e.target.value)}
                    className="rounded-2xl h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staffEmail">Email</Label>
                  <Input
                    id="staffEmail"
                    type="email"
                    placeholder="email@example.com"
                    value={staffEmail}
                    onChange={(e) => setStaffEmail(e.target.value)}
                    className="rounded-2xl h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staffRole">Role</Label>
                  <Input
                    id="staffRole"
                    placeholder="e.g., Beautician"
                    value={staffRole}
                    onChange={(e) => setStaffRole(e.target.value)}
                    className="rounded-2xl h-12"
                  />
                </div>
                {!editingStaff && (
                  <div className="space-y-2">
                    <Label htmlFor="staffPassword">Password</Label>
                    <Input
                      id="staffPassword"
                      type="password"
                      placeholder="Enter password"
                      value={staffPassword}
                      onChange={(e) => setStaffPassword(e.target.value)}
                      className="rounded-2xl h-12"
                    />
                  </div>
                )}
                <Button
                  onClick={handleSaveStaff}
                  className="w-full rounded-2xl h-12 text-white"
                  style={{ background: "linear-gradient(135deg, #c9a27b 0%, #b08968 100%)" }}
                >
                  {editingStaff ? "Update Staff" : "Add Staff"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((staffMember) => (
                <TableRow key={staffMember.id}>
                  <TableCell className="font-medium">{staffMember.name}</TableCell>
                  <TableCell>{staffMember.email}</TableCell>
                  <TableCell>{staffMember.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant={staffMember.status === "active" ? "default" : "secondary"}
                      className="rounded-full cursor-pointer"
                      onClick={() => toggleStatus(staffMember.id)}
                      style={
                        staffMember.status === "active" 
                          ? { background: "#a8d5ba", color: "#2d5f3f" }
                          : undefined
                      }
                    >
                      {staffMember.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenDialog(staffMember)}
                        className="rounded-xl"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteStaff(staffMember.id)}
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
