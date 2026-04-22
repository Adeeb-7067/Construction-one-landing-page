import { motion } from "framer-motion";
import { Zap, BadgeCheck, IndianRupee, Headphones } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Quick delivery",
    stat: "24–48h",
    desc: "Materials reach most pin codes within 24–48 hours of order confirmation.",
  },
  {
    icon: BadgeCheck,
    title: "Verified suppliers",
    stat: "1,000+",
    desc: "Every vendor is GST-verified, with documents and track record reviewed by our team.",
  },
  {
    icon: IndianRupee,
    title: "Best landed price",
    stat: "Up to 18% off",
    desc: "Live price comparison, bulk-buy discounts and zero-haggle pricing.",
  },
  {
    icon: Headphones,
    title: "Real human support",
    stat: "7AM–10PM",
    desc: "Order placed at 8PM? Our procurement desk picks up before you finish your tea.",
  },
];

export const WhyChoose = () => {
  return (
    <section id="why" className="relative py-32">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-4 text-xs tracking-[0.3em] text-primary">WHY CONSTRUCTION ONE</p>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            Built for the people who <span className="text-gradient">build India.</span>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Contractors, builders and homeowners trust us to source what they need —
            quickly, cheaply and without headaches.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-strong relative overflow-hidden rounded-3xl p-6"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_var(--glow)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-display text-3xl font-bold text-gradient">{r.stat}</div>
                <div className="mt-2 font-display text-base font-semibold">{r.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
