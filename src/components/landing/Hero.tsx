import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Store, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-construction.jpg";
import logo from "@/assets/logo.png";
import { ThemeToggle } from "@/components/ThemeToggle";

const Particles = () => {
  const particles = Array.from({ length: 30 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => {
        const left = (i * 37) % 100;
        const delay = (i * 0.3) % 6;
        const duration = 8 + ((i * 1.7) % 8);
        const size = 1 + ((i * 0.4) % 3);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-primary"
            style={{
              left: `${left}%`,
              bottom: -10,
              width: size,
              height: size,
              boxShadow: `0 0 ${size * 4}px var(--glow)`,
            }}
            animate={{ y: [-50, -800], opacity: [0, 1, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
          />
        );
      })}
    </div>
  );
};

const RippleButton = ({
  children,
  variant = "primary",
  icon: Icon,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  icon?: React.ComponentType<{ className?: string }>;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `position:absolute;border-radius:50%;background:currentColor;opacity:.35;pointer-events:none;width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px;transform:scale(0);animation:ripple .7s ease-out;`;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  };

  const base =
    "group relative overflow-hidden inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:shadow-[0_0_40px_var(--glow)] hover:-translate-y-0.5"
      : "glass-strong text-foreground hover:bg-white/10 hover:-translate-y-0.5";

  return (
    <button onClick={handleClick} className={`${base} ${styles}`}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image with parallax-style scale */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="AI-powered construction site at golden hour"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
      </motion.div>

      <Particles />

      {/* Top nav */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6"
      >
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Construction One" className="h-8 w-auto" />
        </a>
        <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a className="hover:text-foreground transition-colors" href="#about">About</a>
          <a className="hover:text-foreground transition-colors" href="#why">Why us</a>
          <a className="hover:text-foreground transition-colors" href="#marketplace">Marketplace</a>
          <a className="hover:text-foreground transition-colors" href="#vendors">Sell with us</a>
          <a className="hover:text-foreground transition-colors" href="#contact">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="glass rounded-full px-5 py-2 text-sm hover:bg-foreground/10 transition-colors">
            Sign in
          </button>
        </div>
      </motion.nav>

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] max-w-7xl flex-col justify-center px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-1.5 text-xs tracking-wide text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          INDIA'S MARKETPLACE FOR CONSTRUCTION MATERIALS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tighter md:text-7xl lg:text-[8rem]"
        >
          Cement.
          <br />
          <span className="text-gradient">Steel.</span>
          <br />
          Delivered.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 max-w-xl text-lg text-muted-foreground"
        >
          Order cement, TMT bars, bricks, sand, tiles and more from verified
          vendors near you — at the best price, delivered straight to your site.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <RippleButton icon={ShoppingCart}>Shop Materials</RippleButton>
          <RippleButton variant="ghost" icon={Store}>Sell on Construction One</RippleButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-muted-foreground"
      >
        <span className="tracking-[0.3em]">SCROLL</span>
        <div className="relative h-10 w-6 rounded-full border border-foreground/20">
          <span className="absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary animate-scroll-down" />
        </div>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
};
