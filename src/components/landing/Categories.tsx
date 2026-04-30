import { motion } from "framer-motion";
import { useLandingData } from "@/hooks/useLandingData";


export const Categories = () => {
  const { data } = useLandingData();

  const apiCategories = data?.categories || [];
  const apiPcategories = data?.pcategories || [];
  const allCategories = [...apiPcategories, ...apiCategories];

  const displayCategories = allCategories.length > 0 
    ? [
        ...apiPcategories.map(c => ({
          id: c.id,
          img: c.img,
          label: c.name,
          count: "Parent Category",
        })),
        ...apiCategories.map(c => ({
          id: c.id,
          img: c.img,
          label: c.name,
          count: "Category",
        }))
      ]
    : [];

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
          {displayCategories.map((c, i) => (
            <motion.button
              key={c.id}
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
              {c.img ? (
                <div className="h-10 w-10 overflow-hidden rounded-full transition-transform group-hover:scale-110 bg-background flex items-center justify-center p-1">
                  <img src={c.img} alt={c.label} className="h-full w-full object-contain" />
                </div>
              ) : (
                <div className="text-3xl transition-transform group-hover:scale-110">{c.emoji}</div>
              )}
              <div className="text-xs font-semibold leading-tight line-clamp-2">{c.label}</div>
              <div className="text-[10px] leading-tight text-muted-foreground">{c.count}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
