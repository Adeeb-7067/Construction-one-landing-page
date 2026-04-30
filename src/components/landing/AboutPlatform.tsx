import { motion } from "framer-motion";
import { Package, Truck, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { useLandingData } from "@/hooks/useLandingData";

const pillars = [
  {
    icon: Package,
    title: "Catalogue",
    desc: "Every category of building material — cement, TMT steel, bricks, sand, aggregates, tiles, paints, plumbing & electrical.",
    accent: "from-primary/30 to-transparent",
  },
  {
    icon: ShieldCheck,
    title: "Verified vendors",
    desc: "GST-verified suppliers across India. Every brand & batch is quality-checked before it leaves the warehouse.",
    accent: "from-accent/30 to-transparent",
  },
  {
    icon: Truck,
    title: "Site delivery",
    desc: "On-site delivery with live tracking. Tonnes of cement to your slab, bundles of TMT to your basement.",
    accent: "from-primary/25 to-transparent",
  },
  {
    icon: Sparkles,
    title: "Best price",
    desc: "Live price comparison and bulk discounts — pay the lowest landed cost, every time.",
    accent: "from-accent/25 to-transparent",
  },
];

export const AboutPlatform = () => {
  const { data } = useLandingData();
  const company = data?.company;

  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs tracking-[0.3em] text-primary">ABOUT THE PLATFORM</p>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            {company?.title ? (
              <>
                {company.title.includes(" ") ? (
                  <>
                    {company.title.split(" ").slice(0, -2).join(" ")} <span className="text-gradient">{company.title.split(" ").slice(-2).join(" ")}</span>
                  </>
                ) : (
                  <span className="text-gradient">{company.title}</span>
                )}
              </>
            ) : (
              <>
                One marketplace. <span className="text-gradient">Every building material.</span>
              </>
            )}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
            {company?.paragraph || "Construction One is India's online marketplace for construction materials. We don't build your project — we make sure every brick, bag and bar reaches your site on time, at the right price, from suppliers you can trust."}
          </p>
        </motion.div>

        {/* Diagram */}
        <div className="relative">
          {/* Center hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto mb-12 flex h-32 w-32 items-center justify-center rounded-full"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-90 blur-2xl" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_0_60px_var(--glow)]">
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em]">
                {company?.name ? company.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase() : "C1"}
              </span>
            </div>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="glass-strong group relative overflow-hidden rounded-3xl p-6"
                >
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${p.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <div className="relative">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
