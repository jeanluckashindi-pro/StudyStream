"use client";

import { useState, useEffect } from "react";
import {
  Home,
  ArrowLeft,
  Search,
  Zap,
  Coffee,
  Heart,
  Star,
  Users,
  GraduationCap,
  ClipboardCheck,
  Calendar,
  BookOpen,
  UserCheck,
  Building2,
  FileText,
  Award,
  Clock,
  MapPin,
  Settings,
  BarChart3,
  Bell,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

// Simulateur useTranslation
const useTranslation = () => ({
  t: (key) => {
    const translations = {
      "errors.404.title": "Page Introuvable",
      "errors.404.subtitle":
        "Oups ! Cette page semble avoir disparu dans l'espace numérique",
      "errors.404.message":
        "La page que vous recherchez n'existe pas ou a été déplacée vers une autre dimension.",
      "errors.404.funFact": "Le saviez-vous ?",
      "errors.404.funFactText":
        "L'erreur 404 doit son nom au bureau 404 du CERN où était hébergé le premier serveur web.",
      "errors.404.backToDashboard": "Retour au tableau de bord",
      "errors.404.goBack": "Page précédente",
      "errors.404.popularPages": "Pages populaires",
      "errors.404.supportMessage": "Besoin d'aide ? Contactez-nous à",
      "errors.404.supportEmail": "support@plateforme.com",
    };
    return translations[key] || key;
  },
});

// Composant d'animation flottante pour icônes universitaires avec animations individuelles
const FloatingIcon = ({
  Icon,
  delay = 0,
  className = "",
  size = 24,
  animationType = "bounce",
}) => {
  const animations = {
    bounce: "animate-bounce",
    pulse: "animate-pulse",
    spin: "animate-spin",
    ping: "animate-ping",
    float: "animate-pulse",
  };

  const customFloatStyle =
    animationType === "float"
      ? {
          animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }
      : {};

  return (
    <>
      {/* Ajout des keyframes CSS pour l'animation float */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(2deg);
          }
          50% {
            transform: translateY(-5px) rotate(-1deg);
          }
          75% {
            transform: translateY(-15px) rotate(1deg);
          }
        }
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }
        @keyframes sway {
          0%,
          100% {
            transform: translateX(0px);
          }
          50% {
            transform: translateX(10px);
          }
        }
      `}</style>
      <div
        className={`absolute opacity-15 hover:opacity-40 transition-all duration-500 hover:scale-110 ${className}`}
        style={{
          animationDelay: `${delay}s`,
          animationDuration: `${2.5 + Math.random() * 2}s`,
          ...customFloatStyle,
        }}
      >
        <div className={animations[animationType] || "animate-bounce"}>
          <Icon size={size} />
        </div>
      </div>
    </>
  );
};

const UniversityFloatingIcons = () => {
  const animationTypes = ["bounce", "pulse", "float", "ping"];

  const universityIcons = [
    {
      Icon: GraduationCap,
      position: "top-16 left-12",
      delay: 0,
      size: 28,
      animation: "float",
    },
    {
      Icon: Users,
      position: "top-24 right-16",
      delay: 0.5,
      size: 26,
      animation: "bounce",
    },
    {
      Icon: ClipboardCheck,
      position: "top-40 left-1/4",
      delay: 1,
      size: 24,
      animation: "pulse",
    },
    {
      Icon: Calendar,
      position: "top-32 right-1/3",
      delay: 1.5,
      size: 25,
      animation: "float",
    },
    {
      Icon: BookOpen,
      position: "bottom-40 left-16",
      delay: 2,
      size: 26,
      animation: "bounce",
    },
    {
      Icon: UserCheck,
      position: "bottom-32 right-20",
      delay: 0.3,
      size: 24,
      animation: "pulse",
    },
    {
      Icon: Building2,
      position: "bottom-48 right-1/4",
      delay: 1.2,
      size: 28,
      animation: "float",
    },
    {
      Icon: FileText,
      position: "top-48 left-20",
      delay: 0.8,
      size: 23,
      animation: "bounce",
    },
    {
      Icon: Award,
      position: "bottom-24 left-1/3",
      delay: 1.8,
      size: 25,
      animation: "pulse",
    },
    {
      Icon: Clock,
      position: "top-56 right-24",
      delay: 0.2,
      size: 22,
      animation: "ping",
    },
    {
      Icon: MapPin,
      position: "bottom-56 left-24",
      delay: 1.4,
      size: 24,
      animation: "float",
    },
    {
      Icon: Settings,
      position: "top-64 left-1/3",
      delay: 0.7,
      size: 23,
      animation: "bounce",
    },
    {
      Icon: BarChart3,
      position: "bottom-64 right-1/3",
      delay: 1.6,
      size: 25,
      animation: "pulse",
    },
    {
      Icon: Bell,
      position: "top-72 right-32",
      delay: 0.9,
      size: 22,
      animation: "ping",
    },
  ];

  return (
    <>
      {universityIcons.map((item, index) => (
        <FloatingIcon
          key={index}
          Icon={item.Icon}
          delay={item.delay}
          size={item.size}
          animationType={item.animation}
          className={`${item.position} text-foreground/20 hover:text-primary/40`}
        />
      ))}
    </>
  );
};

// Composant de particules animées
const AnimatedBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-blue-500/20 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

const NotFound = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  const quickLinks = [
    { href: "/login", label: "Connexion", icon: UserCheck },
    { href: "/register", label: "Inscription", icon: GraduationCap },
    { href: "/dashboard/students", label: "Étudiants", icon: Users },
    { href: "/dashboard/staff", label: "Personnel", icon: Building2 },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background avec dégradé utilisant bg-card */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background"></div>
      <AnimatedBackground />

      {/* Grille de fond avec overlay subtil */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10">
        {/* Overlay dégradé subtil pour plus de profondeur */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-card/20 to-card/30"></div>
      </div>

      {/* Icônes universitaires flottantes */}
      <UniversityFloatingIcons />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className=" p-8 md:p-12 ">
            {/* Titre principal */}
            <h1
              className="text-4xl md:text-6xl font-bold text-foreground mb-4"
              style={{ fontFamily: "var(--font-josefin-sans)" }}
            >
              {t("errors.404.title")}
            </h1>

            {/* Sous-titre */}
            <p
              className="text-xl text-foreground/70 mb-6 leading-relaxed"
              style={{ marginTop: "2rem", fontFamily: "var(--font-lobster)" }}
            >
              {t("errors.404.subtitle")}
            </p>
            <p className="text-foreground/60 mb-8 text-lg leading-relaxed text-sm">
              {t("errors.404.message")}
            </p>
          </div>

          {/* Indicateur de scroll */}
          <div className="mt-8 flex justify-center">
            <div className="animate-bounce">
              <div className="w-1 h-8 bg-gradient-to-b from-primary to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default NotFound;
