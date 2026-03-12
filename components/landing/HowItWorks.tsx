import { motion } from "framer-motion";
import { UserPlus, FileText, Download } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Créez votre compte",
    description: "Inscrivez-vous gratuitement en quelques secondes et commencez à construire votre CV.",
    step: "01",
  },
  {
    icon: FileText,
    title: "Remplissez vos infos",
    description: "Ajoutez votre expérience, formation et compétences. Notre IA vous aide à rédiger.",
    step: "02",
  },
  {
    icon: Download,
    title: "Téléchargez votre CV",
    description: "Exportez en PDF haute qualité, prêt à envoyer aux recruteurs congolais et internationaux.",
    step: "03",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Comment ça marche</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Créez votre CV en <span className="text-primary">3 étapes</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="text-5xl font-bold text-primary/15">{step.step}</span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
