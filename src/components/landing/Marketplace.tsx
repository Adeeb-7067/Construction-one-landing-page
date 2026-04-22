import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, ShoppingCart, Check } from "lucide-react";

const products = [
  { id: "cement", name: "OPC 53 Cement", brand: "UltraTech", price: 420, unit: "/ bag", emoji: "🧱" },
  { id: "steel", name: "TMT Steel Bars", brand: "Tata Tiscon", price: 68000, unit: "/ ton", emoji: "🔩" },
  { id: "bricks", name: "Red Clay Bricks", brand: "Local", price: 9, unit: "/ piece", emoji: "🧱" },
  { id: "sand", name: "M-Sand", brand: "Robosand", price: 1800, unit: "/ ton", emoji: "🪨" },
];

export const Marketplace = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const update = (id: string, delta: number) => {
    setCart((c) => {
      const next = { ...c, [id]: Math.max(0, (c[id] || 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });
    if (delta > 0) {
      setJustAdded(id);
      setTimeout(() => setJustAdded(null), 600);
    }
  };

  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((x) => x.id === id);
    return sum + (p?.price ?? 0) * qty;
  }, 0);
  const itemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <section id="marketplace" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs tracking-[0.3em] text-primary">MARKETPLACE</p>
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Source materials in <span className="text-gradient">one tap.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Product grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {products.map((p, i) => {
              const qty = cart[p.id] || 0;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="glass-strong group relative overflow-hidden rounded-3xl p-6 transition-shadow hover:shadow-[0_20px_60px_-20px_oklch(0_0_0/.8)]"
                >
                  <div className="flex items-start justify-between">
                    <div className="text-5xl">{p.emoji}</div>
                    <AnimatePresence>
                      {justAdded === p.id && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground"
                        >
                          <Check className="h-4 w-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="mt-4">
                    <div className="text-xs text-muted-foreground">{p.brand}</div>
                    <div className="mt-1 font-display text-lg font-semibold">{p.name}</div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-display text-2xl font-bold">₹{p.price.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">{p.unit}</span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    {qty > 0 ? (
                      <div className="flex items-center gap-3 rounded-full bg-background/60 p-1">
                        <button onClick={() => update(p.id, -1)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-foreground/10">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-sm font-medium">{qty}</span>
                        <button onClick={() => update(p.id, 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => update(p.id, 1)}
                        className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add to cart
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Cart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-strong sticky top-6 h-fit rounded-3xl p-6"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h3 className="font-display text-lg font-semibold">Your Cart</h3>
              <span className="ml-auto rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">{itemCount}</span>
            </div>

            <div className="mt-6 min-h-[120px]">
              <AnimatePresence>
                {itemCount === 0 ? (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-muted-foreground"
                  >
                    Tap "Add to cart" to start sourcing.
                  </motion.p>
                ) : (
                  <ul className="space-y-3">
                    {Object.entries(cart).map(([id, qty]) => {
                      const p = products.find((x) => x.id === id)!;
                      return (
                        <motion.li
                          key={id}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-muted-foreground">{p.name} × {qty}</span>
                          <span className="font-medium">₹{(p.price * qty).toLocaleString()}</span>
                        </motion.li>
                      );
                    })}
                  </ul>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs tracking-wider text-muted-foreground">TOTAL</span>
                <motion.span
                  key={total}
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  className="font-display text-2xl font-bold text-gradient"
                >
                  ₹{total.toLocaleString()}
                </motion.span>
              </div>
              <button
                disabled={itemCount === 0}
                className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_30px_var(--glow)] disabled:opacity-40"
              >
                Checkout
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
