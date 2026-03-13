"use client"
import { motion } from "framer-motion";
import { Sparkles, Globe, Shield, Palette, Zap, FileCheck, CheckCircle2 } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32 bg-slate-50/50 flex justify-center overflow-hidden">
      <div className="container max-w-7xl px-6 mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[12px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            Puissance & Simplicité
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground max-w-3xl">
            Tout pour réussir votre <span className="text-primary italic">carrière</span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:grid-rows-2 h-auto md:h-[700px]">
          
          {/* Card 1: L'IA (Grande carte) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-3 md:row-span-2 relative overflow-hidden rounded-[2.5rem] bg-white border border-border/60 p-10 flex flex-col justify-between shadow-sm group transition-all"
          >
            <div className="relative z-10">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                <Sparkles className="text-white w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Rédaction par Intelligence Artificielle</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                Plus besoin de chercher vos mots. Notre IA génère des descriptions percutantes adaptées à votre métier.
              </p>
            </div>
            {/* Visual preview element */}
            <div className="mt-8 relative h-40 bg-slate-50 rounded-2xl border border-dashed border-border p-6 overflow-hidden">
               <div className="space-y-3">
                 <div className="h-2 w-3/4 bg-primary/20 rounded animate-pulse" />
                 <div className="h-2 w-full bg-slate-200 rounded" />
                 <div className="h-2 w-5/6 bg-slate-200 rounded" />
               </div>
               <div className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg shadow-lg border border-border flex items-center gap-2">
                 <div className="w-2 h-2 bg-success rounded-full animate-ping" />
                 <span className="text-[10px] font-bold uppercase tracking-wider">IA Optimisée</span>
               </div>
            </div>
          </motion.div>

          {/* Card 2: Localisation (Congo) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-3 md:row-span-1 rounded-[2.5rem] bg-white border border-border/60 p-8 flex flex-col md:flex-row gap-6 items-center shadow-sm"
          >
            <div className="flex-1 text-center md:text-left">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto md:mx-0">
                <Globe className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 tracking-tight tracking-tight">100% Adapté à la RDC</h3>
              <p className="text-muted-foreground text-[15px]">
                Des modèles conformes aux exigences des recruteurs à Kinshasa, Lubumbashi et Goma.
              </p>
            </div>
            <div className="w-full md:w-48 h-32 bg-slate-50 rounded-2xl border border-border flex items-center justify-center text-4xl">
               🇨🇩
            </div>
          </motion.div>

          {/* Card 3: Design (Carré) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-1 md:row-span-1 rounded-[2.5rem] bg-foreground text-background p-8 flex flex-col justify-between shadow-xl"
          >
            <Palette className="w-8 h-8 text-primary" />
            <h3 className="font-bold text-lg leading-tight">Templates Modernes</h3>
          </motion.div>

          {/* Card 4: Sécurité & Rapidité (Couché) */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-1 rounded-[2.5rem] bg-white border border-border/60 p-8 flex flex-col justify-between shadow-sm"
          >
            <div className="flex justify-between items-start">
               <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                 <Shield className="text-emerald-600 w-5 h-5" />
               </div>
               <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                 <Zap className="text-orange-600 w-5 h-5" />
               </div>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Sécurisé & Instantané</h3>
              <p className="text-xs text-muted-foreground">Export PDF en 1 clic.</p>
            </div>
          </motion.div>

        </div>

        {/* Bottom Banner Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 flex justify-center"
        >
           <div className="flex items-center gap-6 px-8 py-4 bg-white border border-border/60 rounded-full shadow-sm">
             <div className="flex items-center gap-2">
               <CheckCircle2 className="w-5 h-5 text-success" />
               <span className="text-sm font-medium">Compatible ATS</span>
             </div>
             <div className="w-px h-4 bg-border" />
             <div className="flex items-center gap-2">
               <CheckCircle2 className="w-5 h-5 text-success" />
               <span className="text-sm font-medium">Format PDF HD</span>
             </div>
             <div className="w-px h-4 bg-border" />
             <div className="flex items-center gap-2">
               <CheckCircle2 className="w-5 h-5 text-success" />
               <span className="text-sm font-medium">Sans Filigrane</span>
             </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Features;