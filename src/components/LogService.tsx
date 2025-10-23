import { useState } from "react";
import { User, Sparkles, LogOut, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner@2.0.3";
import { Checkbox } from "./ui/checkbox";

interface LogServiceProps {
  onLogout: () => void;
}

const SERVICES = [
  "Nail Polish",
  "Gel Manicure",
  "Pedicure",
  "Lash Extension",
  "Lash Lift",
  "Eyebrow Shaping",
  "Waxing - Full Body",
  "Waxing - Half Body",
  "Facial Treatment",
  "Massage Therapy",
  "Hair Styling",
  "Makeup Application"
];

export function LogService({ onLogout }: LogServiceProps) {
  const [clientName, setClientName] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const toggleService = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || selectedServices.length === 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Service logged successfully ✨", {
      description: `${selectedServices.length} service(s) recorded for ${clientName}`
    });
    
    // Reset form
    setClientName("");
    setSelectedServices([]);
    setNote("");
  };

  return (
    <div className="min-h-screen p-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fdfbf9 0%, #f5f0ed 100%)"
      }}>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 opacity-5">
        <Sparkles className="w-40 h-40" style={{ color: "#c9a27b" }} />
      </div>
      <div className="absolute bottom-20 left-20 opacity-5">
        <Sparkles className="w-40 h-40" style={{ color: "#d4a5d4" }} />
      </div>

      {/* Logout button */}
      <div className="absolute top-6 right-6">
        <Button
          variant="outline"
          onClick={onLogout}
          className="rounded-2xl border-border hover:bg-muted"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>

      <div className="max-w-2xl mx-auto pt-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-white">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ background: "linear-gradient(135deg, #c9a27b 0%, #d4a5d4 100%)" }}>
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl mb-2">Log a Service</h2>
            <p className="text-muted-foreground">
              Record services rendered for a client
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Name */}
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="clientName"
                  type="text"
                  placeholder="Enter client's name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="pl-11 h-12 rounded-2xl border-border bg-input-background"
                  required
                />
              </div>
            </div>

            {/* Services */}
            <div className="space-y-3">
              <Label>Select Service(s)</Label>
              <div className="bg-input-background rounded-2xl p-4 border border-border max-h-80 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SERVICES.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={selectedServices.includes(service)}
                        onCheckedChange={() => toggleService(service)}
                        className="rounded-lg"
                      />
                      <label
                        htmlFor={service}
                        className="text-sm cursor-pointer select-none"
                      >
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {selectedServices.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {selectedServices.length} service(s) selected
                </p>
              )}
            </div>

            {/* Optional Note */}
            <div className="space-y-2">
              <Label htmlFor="note">Optional Note</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Textarea
                  id="note"
                  placeholder="Add any additional notes..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="pl-11 min-h-24 rounded-2xl border-border bg-input-background resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all text-lg"
              style={{ background: "linear-gradient(135deg, #c9a27b 0%, #b08968 100%)" }}
            >
              Submit Log
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
