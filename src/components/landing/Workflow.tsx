import { motion } from "framer-motion";
import { useState } from "react";
import { Search, ShoppingCart, BadgeCheck, Truck, IndianRupee, PackageCheck } from "lucide-react";

const nodes = [
  { id: "browse", icon: Search, label: "Browse", desc: "Search cement, steel, bricks, sand, tiles & more across 1,000+ verified vendors." },
  { id: "compare", icon: IndianRupee, label: "Compare", desc: "See live prices, brand variants and bulk discounts side-by-side — no haggling required." },
  { id: "order", icon: ShoppingCart, label: "Order", desc: "Add to cart, pick a delivery slot and pay securely. Bulk and credit options available." },
  { id: "verify", icon: BadgeCheck, label: "Verified", desc: "Every vendor is GST-verified. Every batch is quality-checked before dispatch." },
  { id: "deliver", icon: Truck, label: "Delivered", desc: "On-site delivery with live tracking. Cement to your slab, steel to your basement." },
  { id: "done", icon: PackageCheck, label: "Done", desc: "Digital invoice, GST bill and reorder in one tap when you're running low." },
];

export const Workflow = () => {
  const [active, setActive] = useState(1);
  const ActiveIcon = nodes[active].icon;

  return (
    <section id="workflow" className="relative py-12">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <p className="mb-4 text-xs tracking-[0.3em] text-primary">HOW IT WORKS</p>
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            From cart to <span className="text-gradient">construction site.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Hover any step to see how Construction One gets materials to you.
          </p>
        </motion.div>

        {/* Flow diagram */}
        <div className="relative mb-16">
          <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 md:block">
            <div className="relative h-full w-full bg-border">
              <motion.div
                className="absolute h-full bg-gradient-to-r from-primary to-primary/0"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-6 md:grid-cols-6 md:gap-2">
            {nodes.map((node, i) => {
              const Icon = node.icon;
              const isActive = active === i;
              return (
                <motion.button
                  key={node.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group flex flex-col items-center gap-3"
                >
                  <div
                    className={`relative flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground scale-110 shadow-[0_0_40px_var(--glow)]"
                        : "glass-strong text-muted-foreground group-hover:scale-105"
                    }`}
                  >
                    <Icon className="h-7 w-7" />
                    {isActive && (
                      <motion.span
                        layoutId="ring"
                        className="absolute inset-0 rounded-2xl ring-2 ring-primary/40"
                      />
                    )}
                  </div>
                  <span className={`text-xs font-medium transition-colors ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {node.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Detail card */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-strong mx-auto max-w-2xl rounded-3xl p-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ActiveIcon className="h-6 w-6" />
          </div>
          <h3 className="font-display text-2xl font-bold">{nodes[active].label}</h3>
          <p className="mt-2 text-muted-foreground">{nodes[active].desc}</p>
        </motion.div>
      </div>
    </section>
  );
};
