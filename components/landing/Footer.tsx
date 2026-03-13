"use client"
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter, Heart } from "lucide-react";

const footerLinks = {
  Produit: [
    { name: "Fonctionnalités", href: "#features" },
    { name: "IA Agent", href: "#ai" },
    { name: "Modèles", href: "#templates" },
    { name: "Tarifs", href: "#pricing" },
  ],
  Entreprise: [
    { name: "À propos", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Carrières", href: "#careers" },
    { name: "Contact", href: "#contact" },
  ],
  Légal: [
    { name: "Confidentialité", href: "#privacy" },
    { name: "Conditions d'utilisation", href: "#terms" },
    { name: "Politique de Cookies", href: "#cookies" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border/60 pt-20 pb-10 flex justify-center">
      <div className="container max-w-7xl px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Section Brand / Logo */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                kazi<span className="text-primary">Up</span>
              </span>
            </a>
            <p className="text-[15px] text-muted-foreground leading-relaxed max-w-sm">
              Propulsez votre carrière avec le générateur de CV intelligent n°1 en RDC. 
              Conçu pour les standards internationaux, optimisé pour le succès local.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Sections de Liens */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-[13px] font-bold uppercase tracking-[0.1em] text-foreground">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-[14px] text-muted-foreground hover:text-primary transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-primary mr-0 group-hover:mr-2 transition-all" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-border/60 flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-muted-foreground">
          <div className="flex items-center gap-1">
            © {new Date().getFullYear()} <span className="font-bold text-foreground mx-1 text-primary">kaziUp</span> 
            — Une création de <a href="https://nordevagency.vercel.app/" target="_blank" className="font-bold text-foreground hover:underline ml-1 underline-offset-4 decoration-primary">Nordev Agency</a>.
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              Fait avec <Heart className="w-3 h-3 text-red-500 fill-current" /> à Lubumbashi
            </div>
            <div className="w-1 h-1 bg-border rounded-full hidden md:block" />
            <div className="text-foreground font-medium">République Démocratique du Congo</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;