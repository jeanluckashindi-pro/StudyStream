"use client";

import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import BadgeIcon from "@mui/icons-material/Badge";
import ArchiveIcon from "@mui/icons-material/Archive";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import ExpandingButtonSidebar from "./ExpandingButtonSidebar";
import ConnectionStatusNotifier from "./ConnectionStatusNotifier";
interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  activeView: string;
  onViewChange: (viewId: string) => void;
}

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  badge?: number;
  description?: string;
}

export default function Sidebar({
  drawerWidth,
  mobileOpen,
  onDrawerToggle,
  activeView,
  onViewChange,
}: SidebarProps) {
  const { t } = useTranslation();

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      icon: <DashboardIcon fontSize="small" />,
      label: t("common.dashboard"),
      description: "Vue d'ensemble et statistiques",
    },
    {
      id: "students",
      icon: <GroupIcon fontSize="small" />,
      label: t("common.students"),
      badge: 5, // Exemple: 5 nouvelles demandes
      description: "Gestion des étudiants",
    },
    {
      id: "staff",
      icon: <BadgeIcon fontSize="small" />,
      label: t("common.staff"),
      description: "Gestion du personnel",
    },
    {
      id: "archive",
      icon: <ArchiveIcon fontSize="small" />,
      label: t("common.archive"),
      description: "Documents archivés",
    },
    {
      id: "rating",
      icon: <RateReviewIcon fontSize="small" />,
      label: t("common.rating"),
      badge: 3,
      description: "Évaluations et notes",
    },
  ];

  const bottomMenuItems: MenuItem[] = [
    {
      id: "profile",
      icon: <AccountCircleIcon fontSize="small" />,
      label: t("common.profile"),
      description: "Profil utilisateur",
    },
    {
      id: "settings",
      icon: <SettingsIcon fontSize="small" />,
      label: t("common.settings"),
      description: "Paramètres système",
    },
  ];

  useEffect(() => {
    // Charger la vue active depuis localStorage au montage
    const storedView = localStorage.getItem("activeView");
    if (storedView && storedView !== activeView) {
      onViewChange(storedView);
    }
  }, []);

  const handleMenuClick = (viewId: string) => {
    localStorage.setItem("activeView", viewId); // Enregistre dans localStorage
    onViewChange(viewId);
  };

  const handleItemClick = (itemId: string) => {
    onViewChange(itemId);
    // Optionnel: fermer le drawer mobile après sélection
    if (mobileOpen) {
      onDrawerToggle();
    }
  };

  const isActive = (itemId: string) => {
    return activeView === itemId;
  };

  const renderMenuItem = (item: MenuItem) => (
    <Tooltip
      key={item.id}
      title={
        <div>
          <div className="font-medium">{item.label}</div>
          {item.description && (
            <div
              className="text-xs opacity-80 mt-1"
              style={{ fontSize: "10px" }}
            ></div>
          )}
        </div>
      }
      placement="right"
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: "rgba(55, 65, 81, 0.9)",
            "& .MuiTooltip-arrow": {
              color: "rgba(55, 65, 81, 0.9)",
            },
          },
        },
      }}
    >
      <div className="relative group">
        <div
          className={`relative flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 ${
            isActive(item.id)
              ? "bg-blue-500 text-white shadow-lg"
              : "hover:bg-gray-800 text-white"
          }`}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "8px",
            border: "1px solid var(--card)",
          }}
          onClick={() => handleMenuClick(item.id)}
        >
          {item.icon}

          {/* Badge pour les notifications */}
          {item.badge && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {item.badge}
            </div>
          )}

          {/* Indicateur actif */}
          {isActive(item.id) && (
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
          )}
        </div>
      </div>
    </Tooltip>
  );

  const renderMobileMenuItem = (item: MenuItem) => (
    <div key={item.id} className="w-full">
      <div
        className={`flex items-center gap-3 p-3 cursor-pointer rounded-lg transition-all duration-200 relative ${
          isActive(item.id)
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200 text-gray-800"
        }`}
        onClick={() => handleItemClick(item.id)}
      >
        <div className="relative">
          {item.icon}
          {/* Badge pour mobile */}
          {item.badge && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {item.badge > 9 ? "9+" : item.badge}
            </div>
          )}
        </div>
        <div className="flex-1">
          <span className="text-sm font-medium">{item.label}</span>
          {item.description && (
            <p className="text-xs opacity-70 mt-0.5">{item.description}</p>
          )}
        </div>

        {isActive(item.id) && <div className="text-xs">→</div>}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="hidden sm:block relative left-0 h-full"
        style={{
          width: `${drawerWidth}px`,
          height: "calc(100vh - 10vh)",
          padding: "10px",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Menu items principaux */}
          <div className="flex flex-col items-center gap-3 flex-1">
            {menuItems.map(renderMenuItem)}
          </div>

          {/* Menu items du bas (Profil et Paramètres) */}
          <div className="flex flex-col items-center gap-3">
            {bottomMenuItems.map(renderMenuItem)}
          </div>
        </div>
      </div>
      <ConnectionStatusNotifier></ConnectionStatusNotifier>
    </>
  );
}
