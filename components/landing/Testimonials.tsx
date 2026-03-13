"use client"
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Grace Mbala",
    role: "Ingénieure logiciel",
    text: "Grâce à kaziUp, j'ai décroché un entretien chez une grande entreprise de Kinshasa en seulement une semaine. Le CV était impeccable !",
    rating: 5,
  },
  {
    name: "Patrick Lunda",
    role: "Comptable",
    text: "Simple, rapide et efficace. Les modèles sont vraiment adaptés au marché congolais. Je recommande à tous les chercheurs d'emploi.",
    rating: 5,
  },
  {
    name: "Esther Mukendi",
    role: "Étudiante en droit",
    text: "En tant qu'étudiante, j'avais du mal à créer un CV professionnel. kaziUp m'a tout simplifié. L'IA m'a aidé à rédiger mes descriptions.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28" style={{ background: "var(--cta-gradient)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Témoignages</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Ce que disent nos <span className="text-primary">utilisateurs</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl p-6 shadow-lg shadow-foreground/5"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
