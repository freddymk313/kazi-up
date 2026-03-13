"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import heroPhone from "@/assets/hero-phone.png";

const Hero = () => {
  return (
    <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            🇨🇩 Le #1 des générateurs de CV au Congo
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            Créez un CV <span className="text-primary">professionnel</span> qui vous démarque
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg">
            Concevez votre CV en quelques minutes grâce à nos modèles optimisés pour le marché congolais. Décrochez l'emploi de vos rêves avec kaziUp.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button size="lg">
              Commencer gratuitement
            </Button>
            <Button size="lg">
              Voir les modèles
            </Button>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-9 h-9 rounded-full bg-primary/20 border-2 border-background" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">2 500+</span> CV créés ce mois
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center"
        >
          {/* <img
            src={heroPhone}
            alt="KaziUp - Aperçu de l'application CV"
            className="w-72 md:w-80 lg:w-96 animate-float drop-shadow-2xl"
          /> */}
        </motion.div>
      </div>

      {/* Decorative blob */}
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
    </section>
  );
};

export default Hero;
