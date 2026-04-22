import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const reviews = [
  {
    quote:
      "Order at 9PM, cement on site by lunch the next day. We've stopped maintaining our own supplier rolodex.",
    name: "Rakesh Mehta",
    role: "Site engineer • Pune",
    project: "G+4 residential, 18,000 sq ft",
  },
  {
    quote:
      "TMT prices change every week. Construction One shows me live rates from 6 vendors — I save ₹2–3 per kg, every order.",
    name: "Anjali Desai",
    role: "Civil contractor • Ahmedabad",
    project: "12 units in 2 years",
  },
  {
    quote:
      "I'm building my own home in Bangalore. Construction One made it possible to source like a pro contractor without one.",
    name: "Karthik Ramesh",
    role: "Homeowner • Bengaluru",
    project: "3 BHK independent house",
  },
  {
    quote:
      "GST invoices, delivery proofs, reorder in one tap. Our accounts team finally stopped chasing vendors.",
    name: "Faisal Khan",
    role: "Project manager • Hyderabad",
    project: "Commercial fit-out, 40,000 sq ft",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs tracking-[0.3em] text-primary">SUCCESS STORIES</p>
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Trusted by India's <span className="text-gradient">builders.</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-strong relative overflow-hidden rounded-3xl p-7"
            >
              <Quote className="absolute right-5 top-5 h-10 w-10 text-primary/15" strokeWidth={1.5} />
              <div className="mb-4 flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="font-display text-lg leading-relaxed">
                "{r.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-display text-sm font-bold text-primary-foreground">
                  {r.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
                <div className="hidden text-right text-xs text-muted-foreground sm:block">
                  {r.project}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};
