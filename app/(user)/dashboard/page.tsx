"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FileText,
  Plus,
  MoreHorizontal,
  Clock,
  Eye,
  Download,
  Target,
  ArrowRight,
  Zap,
  TrendingUp,
  Briefcase,
} from "lucide-react";

import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/LanguageContext";
import Image from "next/image";

// Variantes d'animation pour un chargement en cascade
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const mockResumes = [
  {
    id: 1,
    name: "Product Designer Resume",
    template: "Modern Minimal",
    updated: "Il y a 2h",
    score: 92,
    views: 48,
  },
  {
    id: 2,
    name: "Frontend Developer CV",
    template: "Sidebar Professional",
    updated: "Hier",
    score: 87,
    views: 124,
  },
  {
    id: 3,
    name: "Marketing Manager",
    template: "Creative Accent",
    updated: "Il y a 3 jours",
    score: 78,
    views: 36,
  },
];

const mockJobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "Google",
    match: 95,
    location: "Paris / Remote",
  },
  // {
  //   id: 2,
  //   title: "Lead Frontend React",
  //   company: "Spotify",
  //   match: 88,
  //   location: "Remote",
  // },
  // {
  //   id: 3,
  //   title: "Fullstack Developer",
  //   company: "Stripe",
  //   match: 82,
  //   location: "Lille, FR",
  // },
];

export default function DashboardPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const quickStats = [
    {
      icon: FileText,
      label: "Mes CV",
      value: "03",
      trend: "+1 ce mois",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    // { icon: Eye, label: "Vues", value: "208", trend: "+12% vs hier", color: "text-purple-600", bg: "bg-purple-50" },
    // { icon: Target, label: "Score Moyen", value: "86%", trend: "Top 5% users", color: "text-emerald-600", bg: "bg-emerald-50" },
    // { icon: Download, label: "Téléchargements", value: "12", trend: "Stable", color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto space-y-10"
      >
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              {t("dashboard_welcome")},{" "}
              <span className="text-primary italic">Freddy</span> 👋
            </h1>
            <p className="text-slate-500 font-medium">
              {t("dashboard_subtitle")}
            </p>
          </div>
          {/* <Button 
            onClick={() => router.push("/builder")} 
            // className="rounded-full px-6 py-6 h-auto shadow-xl shadow-primary/20 gap-2 text-md font-bold transition-transform hover:scale-105 active:scale-95"
              className="rounded-full text-base bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 font-semibold transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" /> {t("dashboard_create_new")}
          </Button> */}
        </div>

        {/* --- SECTION STATS --- */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-background border-slate-100 p-6 rounded-3xl hover:shadow-sm transition-shadow relative overflow-hidden group"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-black text-slate-900">
                    {stat.value}
                  </h3>
                  <span className="text-[10px] font-bold text-emerald-500 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded-md">
                    <TrendingUp className="w-3 h-3 mr-1" /> {stat.trend}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div> */}

        {/* --- MAIN CONTENT GRID --- */}
        {/* <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                <FileText className="w-5 h-5 text-primary" />{" "}
                {t("dashboard_recent")}
              </h2>
              <Button
                variant="ghost"
                className="text-slate-400 font-bold hover:text-primary transition-colors"
              >
                Voir tout <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid gap-4">
              {mockResumes.map((resume) => (
                <motion.div
                  key={resume.id}
                  variants={itemVariants}
                  whileHover={{ x: 8 }}
                  className="bg-white rounded-3xl p-5 flex items-center gap-5 cursor-pointer hover:shadow-md hover:shadow-slate-200/50 transition-all group"
                  onClick={() => router.push("/builder")}
                >
                  <div className="w-16 h-20 -mt-2 -ml-1 group-hover:bg-primary/5 transition-colors">
                    <Image
                      src="/landing/cv-hero-2.png"
                      alt="Aperçu du CV kaziUp"
                      width={800}
                      height={500}
                      className="w-full rounded-lg h-auto"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-slate-900 text-lg group-hover:text-primary transition-colors truncate">
                      {resume.name}
                    </h4>
                    <div className="flex items-center gap-4 mt-1 text-slate-400 text-xs font-bold uppercase tracking-wide">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {resume.updated}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded-full">
                        {resume.template}
                      </span>
                    </div>
                  </div>

                  <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">
                <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />{" "}
                Matches
              </h2>
            </div>

            <div className="space-y-4">
              {mockJobs.map((job) => (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                    <Zap className="w-16 h-16" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black bg-primary px-3 py-1 rounded-full uppercase tracking-widest">
                        {job.match}% Match
                      </span>
                    </div>
                    <h4 className="font-bold text-lg leading-tight mb-1">
                      {job.title}
                    </h4>
                    <p className="text-slate-400 text-sm mb-4 font-medium">
                      {job.company} • {job.location}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full bg-white/10 hover:bg-white/20 border-0 text-white font-bold rounded-xl"
                    >
                      Postuler via IA
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div> */}
      </motion.div>
    </DashboardLayout>
  );
}
