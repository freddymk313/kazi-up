"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Lock, User, KeyRound } from "lucide-react";
import Link from "next/link";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* --- CÔTÉ GAUCHE : VISUEL (Aligné sur Register) --- */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden md:flex md:w-1/2 bg-foreground p-12 flex-col justify-between relative overflow-hidden"
      >
        {/* Cercles décoratifs (Identiques à Register pour la cohérence) */}
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
            Ravi de vous <br />
            <span className="text-primary italic">revoir.</span>
          </h2>
          <p className="text-white/60 text-lg max-w-sm leading-relaxed">
            Connectez-vous pour accéder à vos CV et continuer votre progression
            vers votre prochain emploi.
          </p>
        </div>

        {/* Badge de réassurance (Style Glassmorphism identique) */}
        {/* <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <KeyRound className="text-primary w-5 h-5" />
             </div>
             <div>
                <p className="text-white font-bold text-sm">Connexion sécurisée</p>
                <p className="text-white/40 text-xs">Chiffrement de bout en bout</p>
             </div>
          </div>
          <p className="text-white/50 text-xs">
            Vos données sont stockées en toute sécurité et ne sont jamais partagées sans votre accord.
          </p>
        </div> */}
      </motion.div>

      {/* --- CÔTÉ DROIT : LE FORMULAIRE --- */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
              Bon <span className="text-primary italic">retour !</span>
            </h1>
            <p className="text-muted-foreground">
              Entrez vos identifiants pour continuer.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="identifier">Email ou Numéro de téléphone</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="identifier"
                  placeholder="nom@exemple.com ou 81 000..."
                  className="pl-11 rounded-xl h-12 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mot de passe</Label>
                <Link
                  href="#"
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Oublié ?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 rounded-xl h-12 focus-visible:ring-primary"
                />
              </div>
            </div>

            <Button
              className="rounded-full text-base bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 w-full font-semibold transition-all active:scale-95"
              // className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg mt-6 shadow-lg shadow-primary/20 group transition-all active:scale-[0.98]"
            >
              Se connecter
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link
              href="/register"
              className="text-primary italic font-bold hover:underline"
            >
              S'inscrire gratuitement
            </Link>
          </p>

          {/* Footer de formulaire identique à Register */}
          {/* <div className="pt-6 border-t border-border flex justify-center gap-6 text-[10px] uppercase tracking-widest font-bold text-muted-foreground/50">
            <span>Propulsé par Nordev</span>
            <span>Support 24/7</span>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
