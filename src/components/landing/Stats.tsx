import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { label: "Materials Delivered", value: 2400000, suffix: "+", format: "k" },
  { label: "Verified Vendors", value: 1280, suffix: "+" },
  { label: "Projects Completed", value: 9450, suffix: "" },
  { label: "Cities Live", value: 48, suffix: "" },
];

const Counter = ({ to, suffix, format }: { to: number; suffix: string; format?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => {
    if (format === "k" && v >= 1000) {
      if (v >= 1000000) return (v / 1000000).toFixed(1) + "M";
      return Math.round(v / 1000) + "K";
    }
    return Math.round(v).toLocaleString();
  });

  useEffect(() => {
    if (inView) animate(count, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1] });
  }, [inView, to, count]);

  return (
    <span ref={ref} className="font-display text-5xl font-bold text-gradient md:text-6xl">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
};

export const Stats = () => {
  return (
    <section className="relative border-y border-border py-24">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <Counter to={s.value} suffix={s.suffix} format={s.format} />
              <div className="mt-3 text-xs tracking-[0.2em] text-muted-foreground">
                {s.label.toUpperCase()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
