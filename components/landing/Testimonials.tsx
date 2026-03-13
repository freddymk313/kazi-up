"use client"
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle } from "lucide-react";

const testimonials = [
  {
    name: "Grace Mbala",
    role: "Ingénieure logiciel",
    text: "Grâce à kaziUp, j'ai décroché un entretien chez une grande entreprise de Kinshasa en seulement une semaine. Le CV était impeccable !",
    avatar: "https://i.pravatar.cc/150?u=grace",
    verified: true
  },
  {
    name: "Patrick Lunda",
    role: "Comptable",
    text: "Simple, rapide et efficace. Les modèles sont vraiment adaptés au marché congolais. Je recommande à tous les chercheurs d'emploi.",
    avatar: "https://i.pravatar.cc/150?u=patrick",
    verified: true
  },
  {
    name: "Esther Mukendi",
    role: "Étudiante en droit",
    text: "En tant qu'étudiante, j'avais du mal à créer un CV professionnel. kaziUp m'a tout simplifié. L'IA m'a aidé à rédiger mes descriptions.",
    avatar: "https://i.pravatar.cc/150?u=esther",
    verified: true
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-slate-50 flex justify-center overflow-hidden">
      <div className="container max-w-7xl px-6 mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-6"
          >
            <Star className="w-3 h-3 fill-current" />
            La confiance de nos candidats
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Rejoignez des milliers de <span className="text-primary">succès</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Découvrez comment kaziUp propulse les carrières partout en RDC.
          </p>
        </div>

        {/* Grille de témoignages parfaitement centrée sur PC */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative bg-white p-8 rounded-[2rem] border border-border/50 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col justify-between group transition-all duration-300"
            >
              {/* Icône de citation discrète */}
              <Quote className="absolute top-8 right-8 w-10 h-10 text-slate-100 group-hover:text-primary/10 transition-colors duration-300" />
              
              <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                
                <p className="text-foreground/80 italic leading-relaxed mb-8">
                  "{t.text}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-border/40 pt-6">
                <div className="relative">
                  <img 
                    src={t.avatar} 
                    alt={t.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  {t.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                      <CheckCircle className="w-4 h-4 text-success fill-success/10" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground flex items-center gap-1">
                    {t.name}
                  </h4>
                  <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Background Elements pour le style pro */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      </div>
    </section>
  );
};

export default Testimonials;