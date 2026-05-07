import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Store } from "lucide-react";
import { BuyerAnimation, VendorAnimation } from "./ConstructionAnimations";

export const DownloadAppModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 rounded-full border-primary/20 bg-primary/5 hover:bg-primary/10"
        >
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Download App</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] w-[95vw] max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Download Construction One</DialogTitle>
          <DialogDescription className="text-center text-lg mt-2">
            Choose the app that best fits your needs
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
          {/* User App Option */}
          <div className="flex flex-col items-center justify-between p-4 sm:p-6 rounded-2xl border-2 border-muted hover:border-primary/50 transition-colors bg-card">
            <div className="w-32 h-32 md:w-48 md:h-48 mb-4">
              <BuyerAnimation />
            </div>
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-lg sm:text-xl flex items-center justify-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                For Users
              </h3>
              <p className="text-sm text-muted-foreground">
                Order construction materials directly to your site with real-time tracking.
              </p>
              <Button
                className="w-full rounded-full"
                onClick={() => window.open("https://play.google.com/store", "_blank")}
              >
                Download Buyer App
              </Button>
            </div>
          </div>

          {/* Vendor App Option */}
          <div className="flex flex-col items-center justify-between p-4 sm:p-6 rounded-2xl border-2 border-muted hover:border-primary/50 transition-colors bg-card">
            <div className="w-32 h-32 md:w-48 md:h-48 mb-4">
              <VendorAnimation />
            </div>
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-lg sm:text-xl flex items-center justify-center gap-2">
                <Store className="h-5 w-5 text-primary" />
                For Vendors
              </h3>
              <p className="text-sm text-muted-foreground">
                Manage your inventory, receive orders, and grow your business.
              </p>
              <Button
                className="w-full rounded-full"
                variant="secondary"
                onClick={() => window.open("https://play.google.com/store", "_blank")}
              >
                Download Vendor App
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
