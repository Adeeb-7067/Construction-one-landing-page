import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";
import chaosImg from "@/assets/chaos.jpg";
import orderImg from "@/assets/order.jpg";

const ProgressDot = ({ progress, index }: { progress: MotionValue<number>; index: number }) => {
  const opacity = useTransform(
    progress,
    [index * 0.33, index * 0.33 + 0.15, (index + 1) * 0.33],
    [0.3, 1, 0.3],
  );
  return <motion.div style={{ opacity }} className="h-12 w-0.5 rounded-full bg-primary" />;
};

export const StoryScroll = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const chaosOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.45], [1, 1, 1, 0]);
  const transitionOpacity = useTransform(scrollYProgress, [0.4, 0.55, 0.65], [0, 1, 0]);
  const orderOpacity = useTransform(scrollYProgress, [0.6, 0.75, 1], [0, 1, 1]);

  const chaosBlur = useTransform(scrollYProgress, [0.3, 0.5], [0, 20]);
  const orderScale = useTransform(scrollYProgress, [0.6, 0.85], [1.2, 1]);

  return (
    <section id="story" ref={ref} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Chaos */}
        <motion.div
          style={{ opacity: chaosOpacity, filter: useTransform(chaosBlur, (v) => `blur(${v}px)`) }}
          className="absolute inset-0"
        >
          <img src={chaosImg} alt="Chaotic construction site" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-background/50 mix-blend-multiply" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="max-w-3xl text-center">
              <p className="mb-4 text-xs tracking-[0.3em] text-destructive">ACT I — THE PROBLEM</p>
              <h2 className="font-display text-5xl font-bold leading-tight md:text-7xl">
                Sourcing materials is <span className="text-destructive">painful.</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Five vendor calls for a single price. Wrong cement grade delivered.
                Steel rates that change every morning. A WhatsApp chat that runs your supply chain.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Transition */}
        <motion.div
          style={{ opacity: transitionOpacity }}
          className="absolute inset-0 flex items-center justify-center bg-background"
        >
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="relative text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30"
            >
              <Sparkles className="h-10 w-10 text-primary animate-pulse-glow" />
            </motion.div>
            <p className="text-xs tracking-[0.3em] text-primary">TRANSITION</p>
            <h3 className="mt-4 font-display text-4xl font-bold md:text-5xl">
              What if every material was <span className="text-gradient">one tap away</span>?
            </h3>
          </div>
        </motion.div>

        {/* Order */}
        <motion.div style={{ opacity: orderOpacity }} className="absolute inset-0">
          <motion.img
            style={{ scale: orderScale }}
            src={orderImg}
            alt="Beautifully completed building"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="max-w-3xl text-center">
              <p className="mb-4 text-xs tracking-[0.3em] text-primary">ACT II — THE SOLUTION</p>
              <h2 className="font-display text-5xl font-bold leading-tight md:text-7xl">
                One marketplace.<br />
                <span className="text-gradient">Every material.</span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Browse cement, steel, bricks, sand, tiles and tools from
                verified vendors. Compare prices. Order in seconds. Delivered to your site.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress indicator */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden flex-col gap-2 md:flex">
          {[0, 1, 2].map((i) => (
            <ProgressDot key={i} progress={scrollYProgress} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
