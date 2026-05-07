import { motion } from "framer-motion";
import { Truck, Package, Building2 } from "lucide-react";

export const BuyerAnimation = () => {
  return (
    <div className="relative w-full h-full bg-primary/5 rounded-xl overflow-hidden flex items-center justify-center border border-primary/10">
      {/* Road */}
      <div className="absolute bottom-6 left-0 right-0 h-1 bg-muted-foreground/20 rounded-full" />

      {/* Moving Truck */}
      <motion.div
        animate={{ x: [-100, 100] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-7"
      >
        <Truck className="w-12 h-12 text-primary" strokeWidth={1.5} />
      </motion.div>

      {/* Dropping Package */}
      <motion.div
        animate={{
          y: [-40, 0, 0, -40],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute"
      >
        <Package className="w-8 h-8 text-accent" strokeWidth={1.5} />
      </motion.div>
    </div>
  );
};

export const VendorAnimation = () => {
  return (
    <div className="relative w-full h-full bg-primary/5 rounded-xl overflow-hidden flex items-center justify-center border border-primary/10">
      {/* Ground */}
      <div className="absolute bottom-6 left-0 right-0 h-1 bg-muted-foreground/20 rounded-full" />

      {/* Building */}
      <motion.div
        animate={{ scaleY: [0.5, 1, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ originY: 1 }}
        className="absolute bottom-7 right-8"
      >
        <Building2 className="w-14 h-14 text-primary" strokeWidth={1.5} />
      </motion.div>

      {/* Hook */}
      <motion.div
        animate={{ y: [-20, 10, -20], x: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 left-8 flex flex-col items-center"
      >
        <div className="w-0.5 h-16 bg-muted-foreground/40" />
        <div className="w-4 h-4 border-b-2 border-r-2 border-muted-foreground/80 rounded-br-lg transform rotate-45" />
      </motion.div>

      {/* Material moving */}
      <motion.div
        animate={{ y: [-10, 20, -10], x: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-6"
      >
        <div className="w-8 h-4 bg-accent/80 rounded-sm" />
      </motion.div>
    </div>
  );
};
