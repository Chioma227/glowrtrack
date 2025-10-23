import { useState } from "react";
import { Mail, Lock, Shield, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fdfbf9 0%, #d4a5d4 50%, #c9a27b 100%)"
      }}>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <Shield className="w-24 h-24" style={{ color: "#c9a27b" }} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <Sparkles className="w-32 h-32" style={{ color: "#d4a5d4" }} />
      </div>
      
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-white">
          {/* Logo area */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
              style={{ background: "linear-gradient(135deg, #c9a27b 0%, #d4a5d4 100%)" }}>
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl mb-2 bg-gradient-to-r from-rose-gold to-lavender bg-clip-text text-transparent">
              GlowTrack
            </h1>
            <p className="text-sm text-muted-foreground">Admin Portal</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl text-center mb-2">Admin Access</h2>
            <p className="text-center text-muted-foreground text-sm">
              Manage your spa operations
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@glowtrack.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 rounded-2xl border-border bg-input-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 h-12 rounded-2xl border-border bg-input-background"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all"
              style={{ background: "linear-gradient(135deg, #c9a27b 0%, #b08968 100%)" }}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
