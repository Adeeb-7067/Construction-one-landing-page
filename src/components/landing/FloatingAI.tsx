import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

type Msg = { role: "user" | "ai"; text: string };

const prompts = [
  "Best cement brand?",
  "Find vendors near me",
  "Today's steel price?",
];

const responses: Record<string, string> = {
  price: "Today's TMT steel rate in Bangalore is around ₹68,000/ton (Tata Tiscon). Cement OPC 53 is ₹420/bag. Tap Marketplace above for live, vendor-wise prices.",
  vendor: "I found 47 verified vendors within 15km. Top-rated: BuildPro (4.9★), Concrete Co (4.8★), SteelMart (4.8★). Want me to share contact info?",
  cement: "For load-bearing walls, OPC 53 (UltraTech, ACC) is ideal. For plastering, PPC works great and is 8-12% cheaper. Most users pick UltraTech 53 — ₹420/bag.",
  default: "Great question! You can browse, compare and order materials right from the marketplace. Download Construction One for delivery tracking and bulk pricing ✨",
};

const findResponse = (q: string) => {
  const l = q.toLowerCase();
  if (l.includes("price") || l.includes("rate") || l.includes("cost") || l.includes("steel")) return responses.price;
  if (l.includes("vendor") || l.includes("supplier") || l.includes("near")) return responses.vendor;
  if (l.includes("cement") || l.includes("brand") || l.includes("material")) return responses.cement;
  return responses.default;
};

export const FloatingAI = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Hey! I'm One — your construction copilot. Ask me anything 👷" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: findResponse(text) }]);
      setTyping(false);
    }, 1100);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="glass-strong fixed bottom-24 right-6 z-50 flex h-[480px] w-[360px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl shadow-[0_30px_80px_-20px_oklch(0_0_0/.8)]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-background/40 px-4 py-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-background" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">One</div>
                <div className="text-[10px] text-muted-foreground">AI Copilot · Online</div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-foreground/10">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-background/60 rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex">
                  <div className="rounded-2xl rounded-bl-sm bg-background/60 px-3.5 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick prompts */}
            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {prompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-border bg-background/40 p-3">
              <div className="flex items-center gap-2 rounded-full bg-background/60 px-3 py-1.5">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  placeholder="Ask anything…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => send(input)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground hover:scale-105 transition-transform"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_40px_var(--glow)] animate-pulse-glow"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span key="msg" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <MessageSquare className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};
