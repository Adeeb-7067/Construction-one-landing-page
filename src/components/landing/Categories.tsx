import { motion } from "framer-motion";

const categories = [
  { emoji: "🧱", label: "Cement", count: "120+ brands" },
  { emoji: "🔩", label: "TMT Steel", count: "30+ brands" },
  { emoji: "🟫", label: "Bricks & Blocks", count: "AAC • Red • Fly-ash" },
  { emoji: "🪨", label: "Sand & Aggregate", count: "M-Sand • River" },
  { emoji: "🟦", label: "Tiles & Marble", count: "10,000+ SKUs" },
  { emoji: "🎨", label: "Paints", count: "Asian • Berger • Dulux" },
  { emoji: "🚿", label: "Plumbing", count: "Pipes • Fittings" },
  { emoji: "⚡", label: "Electrical", count: "Wires • Switches" },
  { emoji: "🛠️", label: "Tools", count: "Power • Hand" },
];

export const Categories = () => {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex items-end justify-between gap-6"
        >
          <div>
            <p className="mb-2 text-xs tracking-[0.3em] text-primary">SHOP BY CATEGORY</p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Every material your site needs.
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-9">
          {categories.map((c, i) => (
            <motion.button
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="glass-strong group flex flex-col items-center gap-2 rounded-2xl p-4 text-center transition-shadow hover:shadow-[0_10px_30px_-10px_var(--glow)]"
              onClick={() => {
                document.getElementById("marketplace")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="text-3xl transition-transform group-hover:scale-110">{c.emoji}</div>
              <div className="text-xs font-semibold leading-tight">{c.label}</div>
              <div className="text-[10px] leading-tight text-muted-foreground">{c.count}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
