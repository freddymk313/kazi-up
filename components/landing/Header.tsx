"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";

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
    // <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 transition-all duration-300">
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-50 flex justify-center p-4 md:p-6 transition-all duration-300">
      {/* <nav
        className={`
          flex items-center justify-between w-full max-w-7xl px-6 h-14 md:h-19 rounded-full transition-all duration-300
          ${
            scrolled
              ? "bg-background/80 backdrop-blur-md shadow-md"
              : "bg-background/50 backdrop-blur-sm"
          }
        `}
      > */}
      <nav
        className={`
    flex items-center justify-between w-full max-w-7xl px-6 h-14 md:h-19 rounded-full transition-all duration-300
    ${
      scrolled
        ? "bg-background/80 backdrop-blur-md shadow-md border border-white/20"
        : "bg-background/50 backdrop-blur-sm border border-transparent"
    }
  `}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">
            kazi<span className="text-primary">Up</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-base *font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-base *font-medium *bg-transparent h-12 px-8 rounded-full *hover:bg-accent hover:border hover:border-border transition"
            >
              Connexion
            </Button>
          </Link>

          <Link href="/register">
            <Button 
            className="rounded-full text-base bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 font-semibold transition-all active:scale-95"
            >
              S'inscrire
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden bg-background rounded-[2.5rem] p-8 shadow-2xl"
          >
            <div className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-lg font-medium text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="h-[1px] bg-border/60 w-full" />
              <div className="flex flex-col gap-4">
                <Link href="/login">
                  <Button variant="ghost" className="w-full text-base py-6">
                    Connexion
                  </Button>
                </Link>

                <Link href="/register">
                  <Button className="w-full rounded-full bg-primary text-white h-14 text-base font-bold">
                    S'inscrire
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
