import { motion } from "framer-motion";
import { useLandingData } from "@/hooks/useLandingData";

export const Marketplace = () => {
  const { data, isLoading, isError, error } = useLandingData();
  const products = data?.recentProducts || [];

  return (
    <section id="marketplace" className="relative py-12">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-xs tracking-[0.3em] text-primary">MARKETPLACE</p>
          <h2 className="font-display text-4xl font-bold md:text-6xl">
            Recent <span className="text-gradient">Products.</span>
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-strong animate-pulse rounded-3xl p-4 flex flex-col gap-5">
                <div className="aspect-square w-full rounded-2xl bg-foreground/10" />
                <div className="h-6 w-3/4 rounded bg-foreground/10" />
                <div className="h-4 w-1/2 rounded bg-foreground/10" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="text-center text-destructive py-20 glass-strong rounded-3xl">
            <p className="font-bold text-lg">Failed to load recent products</p>
            <p className="text-sm mt-2 opacity-80">{error instanceof Error ? error.message : "Unknown error"}</p>
            <p className="text-xs mt-4 opacity-60">Please check console for CORS or network issues.</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((p: any, i: number) => (
              <motion.div
                key={p.productId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-strong group relative overflow-hidden rounded-3xl p-4 transition-shadow hover:shadow-[0_20px_60px_-20px_oklch(0_0_0/.8)] flex flex-col"
              >
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-background/50 flex items-center justify-center p-4">
                  {p.image ? (
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="text-muted-foreground/30 font-display font-bold tracking-widest text-lg uppercase">
                      No Image
                    </div>
                  )}
                </div>
                <div className="mt-5 flex-1">
                  <div className="font-display text-lg font-semibold line-clamp-2">{p.name}</div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Added {new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-20 glass-strong rounded-3xl">
            No recent products to showcase at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

