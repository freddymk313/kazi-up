"use client"
import React from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import Link from "next/link"

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      
      {/* --- CÔTÉ GAUCHE : VISUEL & RÉASSURANCE --- */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden md:flex md:w-1/2 bg-foreground p-12 flex-col justify-between relative overflow-hidden"
      >
        {/* Cercles décoratifs en arrière-plan */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-16">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              kazi<span className="text-primary">Up</span>
            </span>
          </Link>

          <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Rejoignez la nouvelle génération de <span className="text-primary italic">talents</span> en RDC.
          </h2>
          
          <div className="space-y-6 mt-12">
            {[
              "Modèles de CV optimisés pour l'IA (ATS)",
              "Assistance à la rédaction par IA",
              "Export PDF haute définition illimité"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-white/80 text-lg">
                <CheckCircle2 className="text-primary w-6 h-6" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
          <p className="text-white/70 italic mb-4">
            "En moins de 10 minutes, j'avais un CV qui a attiré l'attention de 3 recruteurs à Lubumbashi."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20" />
            <div>
              <p className="text-white font-bold text-sm">Freddy M.</p>
              <p className="text-white/40 text-xs">Développeur Full Stack</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* --- CÔTÉ DROIT : LE FORMULAIRE --- */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Créer un compte</h1>
            <p className="text-muted-foreground">C'est gratuit et cela ne prend que quelques secondes.</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" placeholder="Jean" className="rounded-xl h-12 focus-visible:ring-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" placeholder="Kabasele" className="rounded-xl h-12" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="postnom">Postnom</Label>
              <Input id="postnom" placeholder="Mubiala" className="rounded-xl h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Adresse Email</Label>
              <Input id="email" type="email" placeholder="nom@exemple.com" className="rounded-xl h-12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground border-r pr-2">+243</span>
                <Input id="phone" type="tel" placeholder="81 000 000" className="rounded-xl h-12 pl-16" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" placeholder="••••••••" className="rounded-xl h-12" />
            </div>

            <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg mt-6 shadow-lg shadow-primary/20 group">
              Créer mon compte
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Vous avez déjà un compte ?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Se connecter
            </Link>
          </p>

          <div className="pt-6 border-t border-border flex justify-center gap-6 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/50">
            <span>Sécurisé par Nordev</span>
            <span>Données en RDC</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Register