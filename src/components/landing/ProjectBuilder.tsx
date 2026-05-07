import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Home, Building2, Hammer, Truck, HardHat, Clock } from "lucide-react";

type ProjectType = "house" | "commercial";

export const ProjectBuilder = () => {
  const [type, setType] = useState<ProjectType>("house");
  const [budget, setBudget] = useState(15);
  const [area, setArea] = useState(1200);

  const data = useMemo(() => {
    const ratePerSqft = type === "house" ? 1500 : 2400;
    const baseCost = (area * ratePerSqft) / 100000; // in lakh
    const matCost = (baseCost * 0.45).toFixed(1);
    const laborCost = (baseCost * 0.3).toFixed(1);
    const rentCost = (baseCost * 0.15).toFixed(1);
    const months = Math.ceil(area / (type === "house" ? 250 : 200));

    return {
      total: baseCost.toFixed(1),
      materials: [
        { name: "Cement", qty: `${Math.round(area * 0.15)} bags`, cost: matCost },
        { name: "Steel TMT", qty: `${(area * 0.002).toFixed(1)} tons` },
        { name: "Bricks", qty: `${Math.round(area * 10).toLocaleString()}` },
      ],
      services: [
        { name: "Mason team", qty: `${Math.ceil(area / 400)} teams`, cost: laborCost },
        { name: "Electrician", qty: "1 lead + 2" },
        { name: "Plumber", qty: "1 specialist" },
      ],
      rentals: [
        { name: "Concrete mixer", qty: `${months} mo`, cost: rentCost },
        { name: "Scaffolding", qty: `${Math.round(area * 0.6)} sq.ft` },
      ],
      months,
      withinBudget: baseCost <= budget,
    };
  }, [type, area, budget]);

  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs tracking-[0.3em] text-primary">TRY IT YOURSELF</p>
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Build your project. <span className="text-gradient">Live.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* Controls */}
          <div className="glass-strong rounded-3xl p-8 space-y-8">
            {/* Type */}
            <div>
              <label className="text-xs tracking-wider text-muted-foreground">PROJECT TYPE</label>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {([
                  { id: "house", label: "House", icon: Home },
                  { id: "commercial", label: "Commercial", icon: Building2 },
                ] as const).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setType(id)}
                    className={`flex items-center justify-center gap-2 rounded-2xl py-3 text-sm transition-all ${
                      type === id
                        ? "bg-primary text-primary-foreground"
                        : "bg-background/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-xs tracking-wider text-muted-foreground">BUDGET</label>
                <span className="font-display text-xl font-bold">₹{budget} Lakh</span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-background/60 accent-primary
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
                  [&::-webkit-slider-thumb]:shadow-[0_0_20px_var(--glow)]"
              />
            </div>

            {/* Area */}
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-xs tracking-wider text-muted-foreground">AREA</label>
                <span className="font-display text-xl font-bold">{area.toLocaleString()} sq.ft</span>
              </div>
              <input
                type="range"
                min={400}
                max={5000}
                step={100}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-background/60 accent-primary
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
                  [&::-webkit-slider-thumb]:shadow-[0_0_20px_var(--glow)]"
              />
            </div>

            {/* Total */}
            <motion.div
              key={data.total}
              initial={{ scale: 0.95, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-2xl bg-background/40 p-5"
            >
              <div className="text-xs tracking-wider text-muted-foreground">ESTIMATED TOTAL</div>
              <div className="mt-1 flex items-baseline gap-3">
                <div className="font-display text-4xl font-bold text-gradient">₹{data.total} L</div>
                <span className={`rounded-full px-2 py-0.5 text-xs ${data.withinBudget ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"}`}>
                  {data.withinBudget ? "Within budget" : "Over budget"}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" /> {data.months} months
              </div>
            </motion.div>
          </div>

          {/* Output panels */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              { title: "Materials", icon: Truck, items: data.materials, color: "from-primary/20" },
              { title: "Services", icon: HardHat, items: data.services, color: "from-blue-500/20" },
              { title: "Rentals", icon: Hammer, items: data.rentals, color: "from-purple-500/20" },
            ].map(({ title, icon: Icon, items, color }) => (
              <motion.div
                key={title}
                layout
                className={`glass-strong relative overflow-hidden rounded-3xl p-6 bg-gradient-to-b ${color} to-transparent`}
              >
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display font-semibold">{title}</h3>
                </div>
                <ul className="space-y-3">
                  {items.map((it, i) => (
                    <motion.li
                      key={it.name}
                      layout
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-xl bg-background/40 p-3"
                    >
                      <div className="text-sm font-medium">{it.name}</div>
                      <motion.div
                        key={it.qty}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-0.5 text-xs text-muted-foreground"
                      >
                        {it.qty}
                      </motion.div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
