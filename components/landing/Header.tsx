"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const navLinks = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "IA Agent", href: "#ai" },
  { label: "Modèles", href: "#templates" },
  { label: "À propos", href: "#about" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 transition-all duration-300">
      <nav 
        className={`
          flex items-center justify-between w-full max-w-7xl px-6 h-14 md:h-16 rounded-full transition-all duration-300 border
          ${scrolled 
            ? "bg-background/80 backdrop-blur-md border-border/50 shadow-sm" 
            : "bg-background/50 backdrop-blur-sm border-transparent"}
        `}
      >
        {/* Logo - Pur & Simple */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            kazi<span className="text-primary">Up</span>
          </span>
        </a>

        {/* Desktop Navigation - Centrée et Minimaliste */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth Actions - Style Lowker */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="text-[13px] font-medium px-4 hover:bg-transparent hover:text-primary">
            Connexion
          </Button>
          <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-6 text-[13px] font-medium transition-all">
            S'inscrire
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu - Adapté au style arrondi */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-background border border-border rounded-[2rem] p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-5 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-base font-medium text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <hr className="border-border/50" />
              <div className="flex flex-col gap-3">
                <Button variant="ghost" className="w-full text-base">Connexion</Button>
                <Button className="w-full rounded-full bg-primary text-white">S'inscrire</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;