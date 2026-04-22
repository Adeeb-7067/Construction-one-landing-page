import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="relative mt-20 border-t border-border py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-10 md:grid-cols-4"
        >
          <div className="md:col-span-2">
            <img src={logo} alt="Construction One" className="h-8 w-auto" />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              India's trusted marketplace for construction materials. Cement, steel, bricks, sand and more —
              from verified vendors, delivered to your site.
            </p>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Marketplace</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#marketplace" className="hover:text-foreground transition-colors">Browse materials</a></li>
              <li><a href="#why" className="hover:text-foreground transition-colors">Why Construction One</a></li>
              <li><a href="#vendors" className="hover:text-foreground transition-colors">Sell with us</a></li>
              <li><a href="#testimonials" className="hover:text-foreground transition-colors">Success stories</a></li>
            </ul>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Company</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="mailto:hello@constructionone.in" className="hover:text-foreground transition-colors">hello@constructionone.in</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy & Terms</a></li>
            </ul>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Construction One. All rights reserved.</p>
          <p>Made for India's builders.</p>
        </div>
      </div>
    </footer>
  );
};
