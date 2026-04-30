import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { UserX, Phone, ShieldAlert, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/ban")({
  component: BanUser,
});

function BanUser() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleBan = () => {
    if (!phoneNumber) {
      toast.error("Please enter a phone number");
      return;
    }
    toast.success(`User with phone ${phoneNumber} is banned!`, {
      description: "Access has been restricted immediately.",
      icon: <ShieldAlert className="h-4 w-4 text-destructive" />,
    });
    setPhoneNumber("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-20">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-destructive/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong relative z-10 w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 p-8 shadow-2xl md:p-12"
      >
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-destructive/10 text-destructive shadow-[0_0_50px_rgba(239,68,68,0.3)] ring-1 ring-destructive/20">
            <UserX className="h-10 w-10" />
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight">Ban User</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Restrict platform access for a specific phone number.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <label className="ml-1 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
              Phone Number
            </label>
            <div className="group relative">
              <Phone className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input
                type="tel"
                placeholder="+91 98XXX XXXXX"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-5 text-base outline-none transition-all focus:border-primary/50 focus:bg-white/10 focus:ring-4 focus:ring-primary/10"
              />
            </div>
          </div>

          <button
            onClick={handleBan}
            className="group relative w-full overflow-hidden rounded-2xl bg-destructive py-4.5 text-sm font-bold text-destructive-foreground transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
               Ban User Access
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
          
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              Return to dashboard
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
