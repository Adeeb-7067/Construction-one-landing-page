import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Send, Loader2, IndianRupee, Package, Calendar } from "lucide-react";

type Estimate = {
  cost: string;
  breakdown: { label: string; value: string }[];
  materials: string[];
  timeline: string;
};

const estimates: Record<string, Estimate> = {
  default: {
    cost: "₹9,80,000",
    breakdown: [
      { label: "Materials", value: "₹4,40,000" },
      { label: "Labor", value: "₹2,80,000" },
      { label: "Equipment", value: "₹1,20,000" },
      { label: "Overhead", value: "₹1,40,000" },
    ],
    materials: ["Cement (180 bags)", "Steel TMT (2.4 tons)", "Bricks (12,000)", "Sand (800 cu.ft)", "Tiles (1,200 sq.ft)"],
    timeline: "5 months 2 weeks",
  },
  commercial: {
    cost: "₹42,00,000",
    breakdown: [
      { label: "Materials", value: "₹18,50,000" },
      { label: "Labor", value: "₹11,20,000" },
      { label: "Equipment", value: "₹6,80,000" },
      { label: "Overhead", value: "₹5,50,000" },
    ],
    materials: ["Cement (720 bags)", "Steel TMT (12 tons)", "Glass facade (4,000 sq.ft)", "Concrete (480 cu.m)"],
    timeline: "11 months",
  },
};

const examples = [
  "Build a 2BHK house under ₹10 lakh",
  "3BHK villa with garden, 1500 sq ft",
  "Small commercial office, 3 floors",
];

export const AIPlanner = () => {
  const [input, setInput] = useState(examples[0]);
  const [thinking, setThinking] = useState(false);
  const [result, setResult] = useState<Estimate | null>(null);
  const [typed, setTyped] = useState("");

  const submit = () => {
    setResult(null);
    setTyped("");
    setThinking(true);
    const key = /commercial|office/i.test(input) ? "commercial" : "default";
    setTimeout(() => {
      setThinking(false);
      setResult(estimates[key]);
    }, 1800);
  };

  // Typewriter for cost
  useEffect(() => {
    if (!result) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(result.cost.slice(0, i));
      if (i >= result.cost.length) clearInterval(id);
    }, 60);
    return () => clearInterval(id);
  }, [result]);

  return (
    <section id="planner" className="relative py-32">
      <div className="absolute inset-x-0 top-0 h-full opacity-40" style={{ background: "var(--gradient-radial)" }} />
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs">
            <Sparkles className="h-3 w-3 text-primary" />
            AI ESTIMATOR
          </div>
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Describe your project.<br />
            <span className="text-gradient">Get an estimate in seconds.</span>
          </h2>
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-3 shadow-[0_30px_80px_-30px_oklch(0_0_0/.7)]"
        >
          <div className="flex items-center gap-3 rounded-2xl bg-background/50 p-3">
            <Sparkles className="h-5 w-5 shrink-0 text-primary" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground md:text-base"
              placeholder="Build a 2BHK house under ₹10 lakh"
            />
            <button
              onClick={submit}
              disabled={thinking}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:scale-105 disabled:opacity-50"
            >
              {thinking ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
        </motion.div>

        {/* Quick examples */}
        <div className="mt-4 flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => setInput(ex)}
              className="rounded-full border border-border bg-card/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Thinking */}
        <AnimatePresence mode="wait">
          {thinking && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 flex items-center gap-3 text-sm text-muted-foreground"
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-2 w-2 rounded-full bg-primary"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              AI is analyzing materials, labor rates, and your local pricing…
            </motion.div>
          )}

          {result && !thinking && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 grid gap-4 md:grid-cols-3"
            >
              {/* Cost card — span 2 */}
              <div className="glass-strong rounded-3xl p-6 md:col-span-2">
                <div className="flex items-center gap-2 text-xs tracking-wider text-muted-foreground">
                  <IndianRupee className="h-3.5 w-3.5" /> ESTIMATED TOTAL
                </div>
                <div className="mt-2 font-display text-5xl font-bold text-gradient">
                  {typed}
                  <span className="animate-pulse">|</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {result.breakdown.map((b, i) => (
                    <motion.div
                      key={b.label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="rounded-xl bg-background/40 p-3"
                    >
                      <div className="text-xs text-muted-foreground">{b.label}</div>
                      <div className="mt-1 font-medium">{b.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="glass-strong rounded-3xl p-6">
                <div className="flex items-center gap-2 text-xs tracking-wider text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> TIMELINE
                </div>
                <div className="mt-2 font-display text-2xl font-bold">{result.timeline}</div>
                <div className="mt-6 flex items-center gap-2 text-xs tracking-wider text-muted-foreground">
                  <Package className="h-3.5 w-3.5" /> MATERIALS
                </div>
                <ul className="mt-2 space-y-1.5 text-sm">
                  {result.materials.map((m, i) => (
                    <motion.li
                      key={m}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className="flex items-center gap-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {m}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
