import { motion } from "framer-motion";
import { useState } from "react";
import { Store, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const VendorSchema = z.object({
  business_name: z.string().trim().min(2, "Business name is required").max(120),
  contact_name: z.string().trim().min(2, "Your name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9 +\-()]+$/, "Digits, spaces and + - ( ) only"),
  city: z.string().trim().min(2, "City is required").max(80),
  category: z.enum([
    "cement",
    "steel",
    "bricks",
    "sand",
    "tiles",
    "plumbing",
    "electrical",
    "tools",
    "paints",
    "other",
  ]),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormState = z.infer<typeof VendorSchema>;

const initial: FormState = {
  business_name: "",
  contact_name: "",
  email: "",
  phone: "",
  city: "",
  category: "cement",
  message: "",
};

export const VendorSignup = () => {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    const parsed = VendorSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrs: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (!fieldErrs[key]) fieldErrs[key] = issue.message;
      }
      setErrors(fieldErrs);
      return;
    }

    setStatus("submitting");
    const { error } = await supabase.from("vendor_signups").insert({
      business_name: parsed.data.business_name,
      contact_name: parsed.data.contact_name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      city: parsed.data.city,
      category: parsed.data.category,
      message: parsed.data.message || null,
    });

    if (error) {
      setStatus("error");
      setServerError("Couldn't submit right now. Please try again in a moment.");
      return;
    }
    setStatus("success");
    setForm(initial);
  };

  return (
    <section id="vendors" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Left pitch */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-xs tracking-[0.3em] text-primary">FOR VENDORS</p>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
              Sell to <span className="text-gradient">10,000+ contractors</span> across India.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Whether you sell cement, TMT steel, bricks, tiles, paints or hardware —
              list your business on Construction One and reach builders who are ordering today,
              not next quarter.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Zero listing fees — pay only when you sell",
                "Daily orders from contractors in your city",
                "We handle invoicing, GST and payments",
                "Logistics support for tonnes and trucks, not just parcels",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong relative overflow-hidden rounded-3xl p-7 md:p-9"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Store className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-lg font-semibold">List your business</div>
                <div className="text-xs text-muted-foreground">Takes under 60 seconds</div>
              </div>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center"
              >
                <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 font-display text-xl font-semibold">You're on the list!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our vendor team will reach out within 1 business day to verify your business
                  and get you live on the marketplace.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-5 text-xs font-medium text-primary hover:underline"
                >
                  Submit another business
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Business name" error={errors.business_name}>
                    <input
                      value={form.business_name}
                      onChange={(e) => update("business_name", e.target.value)}
                      placeholder="UltraSteel Traders"
                      maxLength={120}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Your name" error={errors.contact_name}>
                    <input
                      value={form.contact_name}
                      onChange={(e) => update("contact_name", e.target.value)}
                      placeholder="Ravi Kumar"
                      maxLength={80}
                      className={inputCls}
                    />
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email" error={errors.email}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="ravi@ultrasteel.in"
                      maxLength={255}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Phone" error={errors.phone}>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 98xxx xxxxx"
                      maxLength={20}
                      className={inputCls}
                    />
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="City" error={errors.city}>
                    <input
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="Mumbai"
                      maxLength={80}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="What do you sell?" error={errors.category}>
                    <select
                      value={form.category}
                      onChange={(e) => update("category", e.target.value as FormState["category"])}
                      className={inputCls}
                    >
                      <option value="cement">Cement</option>
                      <option value="steel">TMT Steel</option>
                      <option value="bricks">Bricks & Blocks</option>
                      <option value="sand">Sand & Aggregate</option>
                      <option value="tiles">Tiles & Marble</option>
                      <option value="paints">Paints</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="tools">Tools</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                </div>
                <Field label="Anything else? (optional)" error={errors.message}>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Daily capacity, brands you stock, delivery range..."
                    maxLength={1000}
                    rows={3}
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                {serverError && (
                  <div className="flex items-center gap-2 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 flex-none" />
                    {serverError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_0_40px_var(--glow)] disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Apply to sell on Construction One"
                  )}
                </button>
                <p className="text-center text-[11px] text-muted-foreground">
                  By submitting, you agree to our vendor terms. We'll never share your details.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const inputCls =
  "w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-background";

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <label className="block">
    <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
    {children}
    {error && <span className="mt-1 block text-[11px] text-destructive">{error}</span>}
  </label>
);
