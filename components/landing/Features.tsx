import { motion } from "framer-motion";
import { Sparkles, Globe, Shield, Palette, Zap, FileCheck } from "lucide-react";
import resumePreview from "@/assets/resume-preview.png";

const features = [
  { icon: Sparkles, title: "IA intégrée", desc: "Notre IA vous aide à rédiger des descriptions percutantes." },
  { icon: Globe, title: "Adapté au Congo", desc: "Modèles optimisés pour le marché de l'emploi congolais." },
  { icon: Shield, title: "Données sécurisées", desc: "Vos informations sont protégées et confidentielles." },
  { icon: Palette, title: "Design moderne", desc: "Des templates professionnels qui impressionnent les recruteurs." },
  { icon: Zap, title: "Rapide et simple", desc: "Créez un CV complet en moins de 10 minutes." },
  { icon: FileCheck, title: "Export PDF", desc: "Téléchargez en haute qualité, prêt à envoyer." },
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-card">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Fonctionnalités</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tout ce dont vous avez besoin pour un <span className="text-primary">CV parfait</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{f.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            {/* <img
              src={resumePreview}
              alt="Aperçu d'un modèle de CV kaziUp"
              className="w-72 md:w-96 drop-shadow-xl animate-float"
            /> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
