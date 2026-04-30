import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { useLandingData } from "@/hooks/useLandingData";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export const Footer = () => {
  const { data } = useLandingData();
  const company = data?.company;

  const socialIcons: Record<string, any> = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
  };

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
            {company?.footerLogo || company?.headerLogo ? (
              <img src={company.footerLogo || company.headerLogo} alt={company?.name || "Construction One"} className="h-8 w-auto" />
            ) : (
              <img src={logo} alt="Construction One" className="h-8 w-auto" />
            )}
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              {company?.paragraph || "India's trusted marketplace for construction materials. Cement, steel, bricks, sand and more — from verified vendors, delivered to your site."}
            </p>
            
            {company?.socialMedia && Object.keys(company.socialMedia).length > 0 && (
              <div className="mt-6 flex items-center gap-4">
                {Object.entries(company.socialMedia).map(([platform, url]) => {
                  const Icon = socialIcons[platform.toLowerCase()];
                  if (!Icon || !url) return null;
                  return (
                    <a 
                      key={platform} 
                      href={url as string} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Marketplace</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" hash="marketplace" className="hover:text-foreground transition-colors">Browse materials</Link></li>
              <li><Link to="/" hash="why" className="hover:text-foreground transition-colors">Why Construction One</Link></li>
              <li><Link to="/" hash="vendors" className="hover:text-foreground transition-colors">Sell with us</Link></li>
              <li><Link to="/" hash="testimonials" className="hover:text-foreground transition-colors">Success stories</Link></li>
            </ul>
          </div>

          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-foreground">Company</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" hash="about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/" hash="contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              {company?.email ? (
                <li><a href={`mailto:${company.email}`} className="hover:text-foreground transition-colors">{company.email}</a></li>
              ) : (
                <li><a href="mailto:hello@constructionone.in" className="hover:text-foreground transition-colors">hello@constructionone.in</a></li>
              )}
              {company?.phone && (
                <li><a href={`tel:${company.phone}`} className="hover:text-foreground transition-colors">Phone: {company.phone}</a></li>
              )}
              <li><Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-foreground transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/ban" className="hover:text-foreground transition-colors text-destructive/80 hover:text-destructive">Ban User</Link></li>
            </ul>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} {company?.name || "Construction One"}. All rights reserved.</p>
          <p>Made for India's builders.</p>
        </div>
      </div>
    </footer>
  );
};
