"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Home,
  User,
  Settings,
  GripVertical,
  Archive,
  BadgeCheck,
  Star,
  DashboardIcon,
  GroupIcon,
  BadgeIcon,
  ArchiveIcon,
  RateReviewIcon,
  AccountCircleIcon,
  SettingsIcon,
  Users,
  FileText,
  BookOpen,
  Award,
  UserCheck,
  Calendar,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  Settings as SettingsLucide,
  Lock,
  Bell,
  Palette,
  Globe,
  Shield,
} from "lucide-react";
import { useTranslation } from "react-i18next";

// Configuration des sous-menus pour chaque section principale
const subMenusConfig = {
  dashboard: [
    { id: "overview", label: "Vue d'ensemble", icon: <Activity size={20} /> },
    { id: "analytics", label: "Analytiques", icon: <TrendingUp size={20} /> },
    { id: "reports", label: "Rapports", icon: <BarChart3 size={20} /> },
    { id: "statistics", label: "Statistiques", icon: <PieChart size={20} /> },
  ],
  students: [
    {
      id: "all-students",
      label: "Tous les étudiants",
      icon: <Users size={20} />,
    },
    { id: "new-student", label: "Nouvel étudiant", icon: <User size={20} /> },
    {
      id: "student-groups",
      label: "Groupes d'étudiants",
      icon: <GroupIcon size={20} />,
    },
    { id: "attendance", label: "Présences", icon: <Calendar size={20} /> },
  ],
  staff: [
    { id: "all-staff", label: "Tout le personnel", icon: <Users size={20} /> },
    {
      id: "add-staff",
      label: "Ajouter personnel",
      icon: <UserCheck size={20} />,
    },
    {
      id: "staff-roles",
      label: "Rôles du personnel",
      icon: <BadgeCheck size={20} />,
    },
    { id: "staff-schedule", label: "Horaires", icon: <Calendar size={20} /> },
  ],
  archive: [
    {
      id: "archived-students",
      label: "Étudiants archivés",
      icon: <Users size={20} />,
    },
    {
      id: "archived-staff",
      label: "Personnel archivé",
      icon: <UserCheck size={20} />,
    },
    {
      id: "archived-files",
      label: "Fichiers archivés",
      icon: <FileText size={20} />,
    },
    { id: "restore", label: "Restaurer", icon: <Archive size={20} /> },
  ],
  rating: [
    {
      id: "student-ratings",
      label: "Notes étudiants",
      icon: <Star size={20} />,
    },
    {
      id: "course-ratings",
      label: "Éval. cours",
      icon: <BookOpen size={20} />,
    },
    { id: "performance", label: "Performance", icon: <Award size={20} /> },
    { id: "feedback", label: "Commentaires", icon: <FileText size={20} /> },
  ],
  profile: [
    {
      id: "personal-info",
      label: "Infos personnelles",
      icon: <User size={20} />,
    },
    { id: "security", label: "Sécurité", icon: <Lock size={20} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={20} /> },
    { id: "preferences", label: "Préférences", icon: <Settings size={20} /> },
  ],
  settings: [
    { id: "general", label: "Général", icon: <SettingsLucide size={20} /> },
    { id: "appearance", label: "Apparence", icon: <Palette size={20} /> },
    { id: "language", label: "Langue", icon: <Globe size={20} /> },
    { id: "permissions", label: "Permissions", icon: <Shield size={20} /> },
  ],
};

export default function ExpandingButtonSidebar({
  activeView,
  onViewChange,
  onSubMenuChange,
  activeSubMenu, // <-- prop du parent
}) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 68, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [openDirection, setOpenDirection] = useState({
    vertical: "down",
    horizontal: "right",
  });
  const [localActiveSubMenu, setLocalActiveSubMenu] = useState(null); // <-- gardez celle-ci
  const buttonRef = useRef(null);
  const dragThreshold = 5;
  const { t } = useTranslation();

  // Obtenir les sous-menus pour la vue active
  const currentSubMenus = subMenusConfig[activeView] || [];

  // Calculer la direction d'ouverture basée sur la position
  const calculateOpenDirection = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const buttonWidth = 140;
    const buttonHeight = 56;
    const expandedWidth = 320;
    const expandedHeight = 450;

    const isInBottomHalf = position.y > screenHeight / 2;
    const vertical = isInBottomHalf ? "up" : "down";

    const isInRightHalf = position.x > screenWidth / 2;
    const horizontal = isInRightHalf ? "left" : "right";

    const spaceBelow = screenHeight - (position.y + buttonHeight);
    const spaceAbove = position.y;
    const spaceRight = screenWidth - (position.x + buttonWidth);
    const spaceLeft = position.x;

    let finalVertical = vertical;
    let finalHorizontal = horizontal;

    if (vertical === "up" && spaceAbove < expandedHeight - buttonHeight) {
      if (spaceBelow >= expandedHeight) {
        finalVertical = "down";
      }
    } else if (
      vertical === "down" &&
      spaceBelow < expandedHeight - buttonHeight
    ) {
      if (spaceAbove >= expandedHeight - buttonHeight) {
        finalVertical = "up";
      }
    }

    if (horizontal === "left" && spaceLeft < expandedWidth - buttonWidth) {
      if (spaceRight >= expandedWidth - buttonWidth) {
        finalHorizontal = "right";
      }
    } else if (
      horizontal === "right" &&
      spaceRight < expandedWidth - buttonWidth
    ) {
      if (spaceLeft >= expandedWidth - buttonWidth) {
        finalHorizontal = "left";
      }
    }

    setOpenDirection({ vertical: finalVertical, horizontal: finalHorizontal });
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
    setHasMoved(false);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const moveX = Math.abs(e.clientX - (position.x + dragStart.x));
    const moveY = Math.abs(e.clientY - (position.y + dragStart.y));

    if (moveX > dragThreshold || moveY > dragThreshold) {
      setHasMoved(true);
    }

    if (hasMoved || moveX > dragThreshold || moveY > dragThreshold) {
      e.preventDefault();

      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      const elementWidth = open ? 320 : 140;
      const elementHeight = open ? 450 : 56;

      const maxX = window.innerWidth - elementWidth;
      const maxY = window.innerHeight - elementHeight;

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    }
  };

  const handleMouseUp = (e) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!hasMoved) {
      if (!open) {
        calculateOpenDirection();
      }
      setOpen(!open);
    }
  };

  // Gestionnaire pour fermer au clic extérieur
  const handleClickOutside = (e) => {
    if (open && buttonRef.current && !buttonRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const handleSubMenuClick = (subMenuId) => {
    localStorage.setItem("activeSubMenu", subMenuId);
    setLocalActiveSubMenu(subMenuId);
    if (onSubMenuChange) {
      onSubMenuChange(subMenuId);
    }
    setOpen(false);
  };

  // Gestionnaires d'événements globaux
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    };
  }, [isDragging, dragStart, position, open, hasMoved]);

  // Effet pour gérer le clic extérieur
  useEffect(() => {
    if (open) {
      // Ajouter l'écouteur après un petit délai pour éviter la fermeture immédiate
      const timer = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 50);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  // Recalculer la direction quand la position change
  useEffect(() => {
    if (open) {
      calculateOpenDirection();
    }
  }, [position, open]);

  // Reset du sous-menu actif quand on change de vue principale
  useEffect(() => {
    setLocalActiveSubMenu(null);
    if (onSubMenuChange) {
      onSubMenuChange(null);
    }
  }, [activeView]);

  // Synchroniser avec le prop activeSubMenu du parent
  useEffect(() => {
    setLocalActiveSubMenu(activeSubMenu); // <-- modifié ici
  }, [activeSubMenu]);

  // Calculer les styles de transformation
  const getTransformOrigin = () => {
    const vOrigin = openDirection.vertical === "up" ? "bottom" : "top";
    const hOrigin = openDirection.horizontal === "left" ? "right" : "left";
    return `${hOrigin} ${vOrigin}`;
  };

  const getExpandedPosition = () => {
    let x = position.x;
    let y = position.y;

    if (openDirection.horizontal === "left") {
      x = position.x - (320 - 140);
    }

    if (openDirection.vertical === "up") {
      y = position.y - (450 - 56);
    }

    return { x, y };
  };

  const expandedPos = getExpandedPosition();

  // Obtenir le titre de la section active
  const getSectionTitle = () => {
    const titles = {
      dashboard: t("sidebar.dashboard", "Tableau de bord"),
      students: t("sidebar.students", "Étudiants"),
      staff: t("sidebar.staff", "Personnel"),
      archive: t("sidebar.archive", "Archives"),
      rating: t("sidebar.rating", "Évaluations"),
      profile: t("sidebar.profile", "Profil"),
      settings: t("sidebar.settings", "Paramètres"),
    };
    return titles[activeView] || t("sidebar.actions", "Actions");
  };

  return currentSubMenus.length > 1 ? (
    <div
      ref={buttonRef}
      className="fixed z-50 select-none"
      style={{
        left: `${open ? expandedPos.x : position.x}px`,
        top: `${open ? expandedPos.y : position.y}px`,
        transformOrigin: getTransformOrigin(),
      }}
    >
      <div
        className={`relative transition-all duration-300 ease-out shadow-xl rounded-2xl overflow-hidden backdrop-blur-sm
    ${
      open
        ? "w-80 h-[450px] bg-card border border-card scale-100"
        : "w-auto h-14 bg-primary scale-100 hover:scale-105"
    } 
    flex flex-col transform-gpu`}
        style={
          open
            ? {
                transformOrigin: getTransformOrigin(),
                backgroundColor: "var(--card)",
              }
            : { transformOrigin: getTransformOrigin() }
        }
      >
        {/* Bouton d'ouverture/fermeture */}
        <div
          className={`flex items-center transition-all duration-200 ease-out ${
            open
              ? "h-16 w-full bg-card text-gray-700 hover:bg-card/80 border-b border-gray-200"
              : "h-14 px-4 text-gray-700 hover:bg-card/90 rounded-2xl bg-card"
          }`}
          onMouseDown={handleMouseDown}
          onClick={handleClick}
          style={{
            cursor: isDragging ? "grabbing" : hasMoved ? "grabbing" : "grab",
            padding: "8px 24px",
            fontFamily: "var(--font-josefin-sans), sans-serif",
          }}
        >
          {open ? (
            <div className="flex items-center justify-between w-full px-4">
              <div className="flex items-center gap-3">
                <GripVertical
                  size={18}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                />
                <span className="font-semibold text-lg">
                  {getSectionTitle()}
                </span>
              </div>
              <ChevronDown
                size={22}
                className={`transform transition-transform duration-300 ${
                  openDirection.vertical === "up" ? "rotate-0" : "rotate-180"
                }`}
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <GripVertical
                size={16}
                className="text-white/70 hover:text-white transition-colors duration-200"
              />
              <span className="font-medium text-sm whitespace-nowrap">
                {getSectionTitle()}
              </span>
            </div>
          )}
        </div>

        {/* Contenu affiché uniquement quand ouvert */}
        <div
          className={`transition-all duration-300 ease-out overflow-hidden ${
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 h-0"
          }`}
        >
          {open && (
            <div className="p-6 flex-1 bg-card overflow-y-auto">
              <div className="space-y-2 relative">
                {currentSubMenus.length > 0 ? (
                  currentSubMenus.map((subMenu) => (
                    <div
                      key={subMenu.id}
                      className={`group flex items-center gap-4 cursor-pointer transition-all duration-100 rounded-lg ${
                        localActiveSubMenu === subMenu.id // <-- modifié ici
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-background hover:shadow-sm"
                      }`}
                      onClick={() => handleSubMenuClick(subMenu.id)}
                      style={{
                        fontFamily: "var(--font-josefin-sans), sans-serif",
                        padding: "12px",
                      }}
                    >
                      <div
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          localActiveSubMenu === subMenu.id // <-- modifié ici
                            ? "bg-primary/20 text-primary"
                            : "group-hover:bg-primary/10 group-hover:text-primary"
                        }`}
                      >
                        {subMenu.icon}
                      </div>
                      <span
                        className={`font-medium transition-colors duration-200 ${
                          localActiveSubMenu === subMenu.id // <-- modifié ici
                            ? "text-primary"
                            : "text-gray-700 group-hover:text-primary"
                        }`}
                      >
                        {t(`sidebar.${subMenu.id}`, subMenu.label)}
                      </span>
                      {localActiveSubMenu === subMenu.id && ( // <-- modifié ic
                        <div className="ml-auto">
                          <div
                            className="w-2 h-2  rounded-full animate-pulse"
                            style={{
                              position: "absolute",
                              right: "10px",
                              backgroundColor: "var(--primary)",
                              color: "white",
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>
                      {t("sidebar.noSubMenu", "Aucun sous-menu disponible")}
                    </p>
                    <p className="text-sm">
                      {t("sidebar.forSection", "pour cette section")}
                    </p>
                  </div>
                )}
              </div>

              {/* Séparateur élégant */}
              {currentSubMenus.length > 0 && (
                <div
                  className="my-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                  style={{ margin: "10px 0" }}
                ></div>
              )}

              {/* Section d'actions rapides */}
              {currentSubMenus.length > 0 && (
                <div className="text-center">
                  <p
                    className="text-sm text-gray-500 mb-2"
                    style={{
                      fontFamily: "var(--font-josefin-sans), sans-serif",
                    }}
                  >
                    {t("sidebar.quickActions", "Actions rapides")}
                  </p>
                  <div className="flex justify-center gap-2">
                    <button className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors duration-200">
                      {t("sidebar.new", "Nouveau")}
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors duration-200">
                      {t("sidebar.search", "Rechercher")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
}
