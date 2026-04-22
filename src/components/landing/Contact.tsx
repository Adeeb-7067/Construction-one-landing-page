import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, MapPin, Apple, Smartphone } from "lucide-react";

const channels = [
  {
    icon: Mail,
    label: "Email us",
    value: "hello@constructionone.in",
    href: "mailto:hello@constructionone.in",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+91 80000 00000",
    href: "tel:+918000000000",
    sub: "Mon–Sat • 7AM – 10PM",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 80000 00000",
    href: "https://wa.me/918000000000",
    sub: "Fastest response",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Construction One HQ",
    sub: "Bengaluru, Karnataka 560001",
  },
];

export const Contact = () => {
  return (
    <section id="contact" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs tracking-[0.3em] text-primary">CONTACT & SUPPORT</p>
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Need a hand? <span className="text-gradient">We're a tap away.</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => {
            const Icon = c.icon;
            const inner = (
              <>
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_var(--glow)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                <div className="mt-1 font-display text-base font-semibold">{c.value}</div>
                {c.sub && <div className="mt-1 text-xs text-muted-foreground">{c.sub}</div>}
              </>
            );
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-strong rounded-3xl p-6"
              >
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </motion.div>
            );
          })}
        </div>

        {/* App download */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl p-8 text-center md:flex-row md:text-left"
        >
          <div>
            <h3 className="font-display text-2xl font-bold">Get the app.</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Order materials, track delivery and reorder in one tap — from anywhere on site.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button className="flex items-center gap-3 rounded-2xl bg-primary px-6 py-3.5 text-primary-foreground transition-all hover:shadow-[0_0_40px_var(--glow)]">
              <Apple className="h-5 w-5" />
              <div className="text-left">
                <div className="text-[10px] opacity-80">Download on</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </button>
            <button className="flex items-center gap-3 rounded-2xl glass-strong px-6 py-3.5 hover:bg-white/10 transition-colors">
              <Smartphone className="h-5 w-5" />
              <div className="text-left">
                <div className="text-[10px] opacity-80">Get it on</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
