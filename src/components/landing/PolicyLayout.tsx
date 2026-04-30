import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLandingData } from "@/hooks/useLandingData";
import { Footer } from "./Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";

interface PolicyLayoutProps {
  title: string;
  content: string;
}

export const PolicyLayout = ({ title, content }: PolicyLayoutProps) => {
  const { data } = useLandingData();
  const company = data?.company;

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Header */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        <Link to="/" className="flex items-center gap-2 group">
          {company?.headerLogo ? (
            <img src={company.headerLogo} alt={company.name || "Construction One"} className="h-8 w-auto" />
          ) : (
            <img src={logo} alt="Construction One" className="h-8 w-auto" />
          )}
        </Link>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="h-4 w-px bg-border mx-2" />
          <ThemeToggle />
        </div>
      </nav>

      {/* Content */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-foreground">
              {title}
            </h1>
            <div className="mt-6 h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="policy-content glass-strong rounded-3xl p-8 md:p-12 border border-border/50">
            {content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            ) : (
              <p className="text-muted-foreground italic">Content is currently being updated. Please check back later.</p>
            )}
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};
