"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Star } from "lucide-react";

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-border shadow-sm mb-8"
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
            Décrochez plus d'offres avec un <span className="relative inline-block">
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
            Concevez un CV professionnel en 5 minutes. Nos modèles sont conçus pour passer les filtres ATS et impressionner les recruteurs en RDC.
          </motion.p>

          {/* Buttons CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button size="lg" className="h-14 px-8 rounded-full bg-primary text-white text-md font-semibold shadow-xl shadow-primary/25 hover:bg-primary/90 hover:scale-105 transition-all">
              Commencer gratuitement
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-border bg-white/50 backdrop-blur-sm text-md font-semibold hover:bg-white transition-all">
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
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-white bg-slate-200 shadow-sm flex items-center justify-center overflow-hidden`}>
                   <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-orange-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground">2 500+</span> utilisateurs satisfaits
              </p>
            </div>
          </motion.div>
        </div>

        {/* Hero Visual - Dashboard Style comme ton image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl border border-border bg-white/50 p-2 shadow-2xl backdrop-blur-sm">
             {/* Simulant une interface de CV Maker */}
            <div className="bg-white rounded-xl border border-border/50 overflow-hidden shadow-inner aspect-[16/9] flex flex-col md:flex-row">
               <div className="w-full md:w-1/3 border-r border-border/50 p-6 bg-slate-50/50">
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-2 w-full bg-slate-200 rounded animate-pulse" />)}
                  </div>
               </div>
               <div className="flex-1 p-8 relative">
                  {/* Le CV flottant au milieu */}
                  <div className="w-full h-full bg-white border border-border shadow-2xl rounded-lg p-6 flex flex-col gap-4">
                      <div className="h-8 w-1/2 bg-slate-100 rounded" />
                      <div className="space-y-2">
                        <div className="h-3 w-full bg-slate-50 rounded" />
                        <div className="h-3 w-full bg-slate-50 rounded" />
                        <div className="h-3 w-2/3 bg-slate-50 rounded" />
                      </div>
                  </div>

                  {/* Badges flottants comme sur ton exemple */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute top-12 -right-4 md:-right-8 bg-white p-4 rounded-2xl shadow-xl border border-border flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-full border-4 border-success flex items-center justify-center text-xs font-bold">
                      96%
                    </div>
                    <div>
                      <p className="text-xs font-bold">Excellent score</p>
                      <p className="text-[10px] text-muted-foreground">Optimisé pour l'IA</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
                    className="absolute bottom-12 -left-4 md:-left-8 bg-white px-4 py-3 rounded-xl shadow-xl border border-border flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <span className="text-xs font-bold">Format ATS Valide</span>
                  </motion.div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;