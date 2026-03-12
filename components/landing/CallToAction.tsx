import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="py-20 md:py-28 bg-foreground text-background">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Prêt à décrocher votre prochain emploi ?
          </h2>
          <p className="text-background/70 text-lg">
            Rejoignez des milliers de Congolais qui font confiance à kaziUp pour créer des CV professionnels et percutants.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button variant="hero" size="lg">
              Créer mon CV gratuitement
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
