import { useState } from "react";
import { Mail, Lock, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface StaffLoginProps {
  onLogin: () => void;
}

export function StaffLogin({ onLogin }: StaffLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #fdfbf9 0%, #f4c7d5 50%, #e8d5d0 100%)"
      }}>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <Sparkles className="w-24 h-24 text-rose-gold" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <Sparkles className="w-32 h-32 text-rose-gold" />
      </div>
      
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-10 border border-white">
          {/* Logo area */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
              style={{ background: "linear-gradient(135deg, #c9a27b 0%, #d4a5d4 100%)" }}>
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl mb-2 bg-gradient-to-r from-rose-gold to-lavender bg-clip-text text-transparent">
              GlowTrack
            </h1>
            <p className="text-sm text-muted-foreground">Spa Portal</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl text-center mb-2">Welcome Back</h2>
            <p className="text-center text-muted-foreground text-sm">
              Login to record your services
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email or Phone</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email or phone"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 rounded-2xl border-border bg-input-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
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

            <button
              type="button"
              className="text-sm text-rose-gold hover:underline"
            >
              Forgot Password?
            </button>

            <Button
              type="submit"
              className="w-full h-12 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all"
              style={{ background: "linear-gradient(135deg, #c9a27b 0%, #b08968 100%)" }}
            >
              Login
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-8">
            Powered by GlowTrack Solutions
          </p>
        </div>
      </div>
    </div>
  );
}
