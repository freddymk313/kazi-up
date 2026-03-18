"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Star } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden bg-[#FDFDFD] dark:bg-background">
      {/* Background Glows - Inspiré du design pro */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
          {/* Badge Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent *border border-primary mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs md:text-sm font-medium text-foreground">
              Le générateur de CV intelligent n°1 en RDC
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-8"
          >
            Décrochez plus d'offres avec un{" "}
            <span className="relative inline-block italic text-primary">
              CV optimisé
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-2 left-0 h-3 bg-primary/20 -z-10"
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Concevez un CV professionnel en 5 minutes. Nos modèles sont conçus
            pour passer les filtres ATS et impressionner les recruteurs en RDC.
          </motion.p>

          {/* Buttons CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button
              size="lg"
              className="h-14 px-8 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all"
            >
              Commencer gratuitement
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 rounded-full border-border bg-white/50 backdrop-blur-sm font-semibold hover:bg-white transition-all"
            >
              Voir les modèles
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full border-2 border-white bg-slate-200 shadow-sm flex items-center justify-center overflow-hidden`}
                >
                  <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-orange-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">2 500+</span>{" "}
                utilisateurs satisfaits
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual - CV Style + ulistration */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative max-w-3xl mx-auto group px-4 md:px-0"
        >
          {/* Effet de lueur derrière l'image */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-[2rem] blur-3xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>

          <div className="relative rounded-[2rem] border border-white/40 bg-white/20 p-2 shadow-2xl backdrop-blur-sm">
            <Image
              src="/landing/cv-hero-2.png"
              alt="Aperçu du CV kaziUp"
              width={800}
              height={500}
              className="w-full h-auto rounded-[1.5rem] shadow-sm"
            />

            {/* Badge Flottant 1 : Score ATS (Droite) */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-8 -right-4 md:-right-12 bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                <svg className="w-full h-full rotate-[-90deg]">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    className="text-slate-100"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray="125.6"
                    strokeDashoffset="12.5"
                    className="text-primary"
                  />
                </svg>
                <span className="absolute text-[9px] md:text-[10px] font-black">
                  98%
                </span>
              </div>
              <div>
                <p className="text-[10px] md:text-xs font-black text-slate-900 leading-none">
                  Score ATS
                </p>
                <p className="text-[9px] md:text-[10px] text-emerald-500 font-bold mt-1">
                  Excellent
                </p>
              </div>
            </motion.div>

            {/* Badge Flottant 2 : Validation (Bas Gauche) */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute bottom-10 -left-4 md:-left-12 bg-slate-900 text-white px-4 py-2.5 md:px-5 md:py-3 rounded-2xl shadow-2xl flex items-center gap-3 z-20"
            >
              <div className="bg-primary rounded-full p-1 shrink-0">
                <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
              </div>
              <div>
                <p className="text-[8px] md:text-[10px] font-bold text-primary-foreground/60 uppercase tracking-widest leading-none">
                  Technologie
                </p>
                <p className="text-[10px] md:text-xs font-bold italic mt-1 leading-none">
                  Format RDC Validé
                </p>
              </div>
            </motion.div>

            {/* NOUVEAU Badge Flottant 3 : Rapidité (Haut Gauche) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="absolute top-24 -left-6 md:-left-16 bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 z-20"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0 border border-amber-100">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs font-black text-slate-900 leading-none">
                  Rapidité
                </p>
                <p className="text-[9px] md:text-[10px] text-amber-600 font-bold mt-1 whitespace-nowrap">
                  Généré en 5 min
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
