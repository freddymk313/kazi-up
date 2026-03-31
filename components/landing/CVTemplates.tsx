"use client"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye, FileText, ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const templates = [
  { id: 1, name: "Le Professionnel", tag: "Populaire", image: "/model-cv/2.png" },
  { id: 2, name: "L'Exécutif", tag: "Premium", image: "/model-cv/1.png" },
  { id: 3, name: "Le Créatif", tag: "Design", image: "/model-cv/3.png" },
  { id: 4, name: "Le Minimaliste", tag: "ATS-Friendly", image: "/model-cv/3.png" },
  { id: 5, name: "Le Moderne", tag: "Nouveau", image: "/model-cv/3.png" },
];

const CVTemplates = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="templates" className="py-24 bg-[#FDFDFD] overflow-hidden">
      <div className="container px-6 mx-auto">
        
        {/* Header avec contrôles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[12px] font-bold uppercase tracking-[0.2em] mb-4 inline-block"
            >
              Modèles
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Des designs qui ouvrent des <span className="text-primary italic">portes</span>
            </h2>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll("left")}
              className="rounded-full border-border hover:border-primary hover:text-primary transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll("right")}
              className="rounded-full border-border hover:border-primary hover:text-primary transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Zone de Scroll */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {templates.map((template) => (
            <motion.div
              key={template.id}
              className="min-w-[280px] md:min-w-[350px] snap-start group"
              whileHover={{ y: -10 }}
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 group-hover:shadow-2xl transition-all duration-500">
                {/* Image du CV */}
                <div className="absolute inset-0 p-4">
                   {/* Remplacer par tes vraies images public/templates/... */}
                   <div className="w-full h-full bg-white rounded-xl shadow-inner overflow-hidden *border border-slate-200">
                      <Image 
                        src={template.image} 
                        alt={template.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                   </div>
                </div>

                {/* Overlay au Hover */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 z-20">
                  <Button className="bg-white text-primary hover:bg-white/90 rounded-full font-bold px-6">
                    <Eye className="w-4 h-4 mr-2" /> Aperçu
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary rounded-full font-bold px-6">
                    Utiliser ce modèle
                  </Button>
                </div>

                {/* Badge Tag */}
                <div className="absolute top-6 left-6 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-wider text-primary shadow-sm">
                  {template.tag}
                </div>
              </div>

              {/* Infos sous l'image */}
              <div className="mt-6 flex items-center justify-between px-2">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{template.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <FileText className="w-3 h-3 mr-1" /> PDF Haute Définition
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Final */}
        <div className="mt-12 text-center">
           <Button variant="link" className="text-primary font-bold text-lg group">
             Voir tous les modèles 
             <ChevronRight className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Button>
        </div>
      </div>
    </section>
  );
};

export default CVTemplates;