"use client"
import { motion } from "framer-motion";
import { UserPlus, FileEdit, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Créez votre profil",
    description: "Inscrivez-vous en 30 secondes. Votre tableau de bord personnel vous attend pour gérer tous vos CV au même endroit.",
    step: "01",
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    icon: FileEdit,
    title: "Générez avec l'IA",
    description: "Saisissez votre poste, et notre IA rédige des puces percutantes optimisées pour les standards de recrutement actuels.",
    step: "02",
    color: "bg-orange-500/10 text-orange-600"
  },
  {
    icon: Download,
    title: "Exportez & Postulez",
    description: "Téléchargez votre CV en PDF haute définition, compatible avec les logiciels de lecture automatique (ATS).",
    step: "03",
    color: "bg-emerald-500/10 text-emerald-600"
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden bg-white flex justify-center">
      {/* Utilisation de mx-auto et max-w-7xl pour un centrage parfait sur PC */}
      <div className="container max-w-7xl px-6 relative z-10 mx-auto">
        
        {/* Header de section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 rounded-full bg-secondary/5 text-secondary text-xs font-bold uppercase tracking-wider mb-4 border border-secondary/10"
          >
            Le processus
          </motion.div> */}
          <motion.span 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[12px] font-bold uppercase tracking-[0.2em] mb-4"
          >
            Processus
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight"
          >
            Votre prochain emploi commence en <span className="text-primary italic">3 étapes</span> 
          </motion.h2>
        </div>

        {/* Grille des étapes - On s'assure que c'est bien 3 colonnes sur MD+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-stretch">
          
          {/* Ligne de connexion (Desktop uniquement) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-border/40 -translate-y-16 -z-0" />

          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative bg-white p-8 rounded-[2.5rem] border border-primary hover:border-primary/50 hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)] transition-all duration-500 flex flex-col"
            >
              {/* Badge Numéro en arrière-plan */}
              <div className="absolute top-6 right-8 text-7xl font-black text-slate-50 group-hover:text-primary/5 transition-colors duration-500 select-none z-0">
                {item.step}
              </div>

              {/* Icon Container */}
              <div className={`relative z-10 w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <item.icon className="w-7 h-7" />
              </div>

              {/* Contenu */}
              <div className="relative z-10 flex-grow">
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {item.description}
                </p>
              </div>

              {/* Pied de carte */}
              <div className="mt-8 pt-6 border-t border-border/40 flex items-center text-sm font-bold text-primary transition-all">
                <span className="group-hover:mr-2 transition-all">Commencer</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Proof subtil */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 flex flex-col items-center justify-center gap-4"
        >
          <div className="h-px w-20 bg-border/60" />
          <p className="text-muted-foreground text-sm font-medium italic">
            Rejoignez <span className="text-foreground font-bold">10,000+</span> candidats déjà prêts
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;