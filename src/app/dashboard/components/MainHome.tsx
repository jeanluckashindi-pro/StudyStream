"use client";
import React, { useState } from "react";
import OptiAcadButton from "@/components/OptiAcadButton";
import MegaMenu from "./Home/MegaMenu";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const MainHome = () => {
  const [activeTab, setActiveTab] = useState("evolution");

  // Données d'évolution mensuelle
  const evolutionData = [
    {
      mois: "Sept",
      inscriptions: 1200,
      presents: 1150,
      abandons: 20,
      payements: 1100,
    },
    {
      mois: "Oct",
      inscriptions: 1180,
      presents: 1120,
      abandons: 35,
      payements: 1080,
    },
    {
      mois: "Nov",
      inscriptions: 1160,
      presents: 1100,
      abandons: 45,
      payements: 1050,
    },
    {
      mois: "Déc",
      inscriptions: 1150,
      presents: 1080,
      abandons: 55,
      payements: 1030,
    },
    {
      mois: "Jan",
      inscriptions: 1140,
      presents: 1060,
      abandons: 65,
      payements: 1010,
    },
    {
      mois: "Fév",
      inscriptions: 1130,
      presents: 1050,
      abandons: 70,
      payements: 1000,
    },
    {
      mois: "Mars",
      inscriptions: 1120,
      presents: 1040,
      abandons: 75,
      payements: 990,
    },
  ];

  // Données de répartition des statuts
  const statusData = [
    { name: "Présents Réguliers", value: 850, color: "#10B981" },
    { name: "Présents Irréguliers", value: 200, color: "#F59E0B" },
    { name: "Abandons", value: 75, color: "#EF4444" },
    { name: "Suspendus", value: 25, color: "#6B7280" },
  ];

  // Données de paiement
  const paymentData = [
    {
      mois: "Sept",
      totalDu: 120000,
      paye: 110000,
      enRetard: 8000,
      impaye: 2000,
    },
    {
      mois: "Oct",
      totalDu: 118000,
      paye: 108000,
      enRetard: 7000,
      impaye: 3000,
    },
    {
      mois: "Nov",
      totalDu: 116000,
      paye: 105000,
      enRetard: 8000,
      impaye: 3000,
    },
    {
      mois: "Déc",
      totalDu: 115000,
      paye: 103000,
      enRetard: 9000,
      impaye: 3000,
    },
    {
      mois: "Jan",
      totalDu: 114000,
      paye: 101000,
      enRetard: 10000,
      impaye: 3000,
    },
    {
      mois: "Fév",
      totalDu: 113000,
      paye: 100000,
      enRetard: 10000,
      impaye: 3000,
    },
    {
      mois: "Mars",
      totalDu: 112000,
      paye: 99000,
      enRetard: 10000,
      impaye: 3000,
    },
  ];

  // Données de progression académique
  const progressionData = [
    {
      niveau: "1ère Année",
      inscrits: 400,
      reussites: 320,
      echecs: 60,
      abandons: 20,
    },
    {
      niveau: "2ème Année",
      inscrits: 350,
      reussites: 280,
      echecs: 50,
      abandons: 20,
    },
    {
      niveau: "3ème Année",
      inscrits: 300,
      reussites: 250,
      echecs: 35,
      abandons: 15,
    },
    {
      niveau: "4ème Année",
      inscrits: 250,
      reussites: 220,
      echecs: 20,
      abandons: 10,
    },
  ]; // Données simulées avec structure améliorée
  const dashboardData = {
    students: {
      active: 1250,
      total: 1350,
      percentage: Math.round((1250 / 1350) * 100),
      trend: "+5.2%",
      status: "excellent",
    },
    technicalStaff: {
      active: 45,
      total: 50,
      percentage: Math.round((45 / 50) * 100),
      trend: "+2.1%",
      status: "optimal",
    },
    administrativeStaff: {
      present: 28,
      total: 35,
      percentage: Math.round((28 / 35) * 100),
      trend: "-1.5%",
      status: "normal",
    },
    library: {
      borrowed: 320,
      available: 2180,
      total: 2500,
      borrowedPercentage: Math.round((320 / 2500) * 100),
      availablePercentage: Math.round((2180 / 2500) * 100),
      newBooks: 15,
      overdueBooks: 8,
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "excellent":
        return "text-green-500";
      case "optimal":
        return "text-blue-500";
      case "normal":
        return "text-orange-500";
      default:
        return "text-gray-500";
    }
  };

  const getTrendIcon = (trend) => {
    return trend.startsWith("+") ? "pi pi-arrow-up" : "pi pi-arrow-down";
  };

  const getTrendColor = (trend) => {
    return trend.startsWith("+") ? "text-green-500" : "text-red-500";
  };

  const StatCard = ({
    icon,
    title,
    description,
    mainNumber,
    buttonText,
    additionalInfo,
    trend,
    status,
  }) => (
    <div
      className="bg-card rounded-2xl relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      style={{
        height: "360px",
        background: "var(--background-2)",
        padding: "24px",
        border: "1px solid var(--card-border, rgba(255,255,255,0.1))",
      }}
    >
      {/* Header avec icône PrimeIcon */}
      <div className="header flex justify-between items-start mb-6">
        <div className="flex justify-start gap-4 items-center">
          <div
            style={{ width: "56px", height: "56px" }}
            className="flex items-center justify-center cursor-pointer rounded-xl bg-card text-2xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <i className={`${icon} text-primary`}></i>
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg mb-1">{title}</h2>
            {/* <span className="text-sm opacity-70">{description}</span> */}
            {trend && (
              <div className="flex items-center gap-2 mt-2">
                <i
                  className={`${getTrendIcon(trend)} text-xs ${getTrendColor(
                    trend
                  )}`}
                ></i>
                <span className={`text-xs font-medium ${getTrendColor(trend)}`}>
                  {trend}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full bg-opacity-20 ${getStatusColor(
                    status
                  )} bg-current`}
                >
                  {status}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="main-content flex flex-col justify-center items-center flex-1"
        style={{ marginTop: "35px" }}
      >
        <div className="text-center mb-8">
          <p
            className="main-number font-bold bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent"
            style={{
              fontFamily: "var(--font-josefin-sans)",
              fontSize: "56px",
              lineHeight: "1",
              marginBottom: "16px",
            }}
          >
            {mainNumber}
          </p>
          {additionalInfo && (
            <div className="additional-info space-y-2">
              {additionalInfo.map((info, index) => (
                <div key={index} className="text-sm opacity-80 font-medium">
                  {info}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Button positioned at bottom */}
      <div className="absolute left-6 right-6" style={{ bottom: "24px" }}>
        <OptiAcadButton width="full" variant="outline">
          {buttonText}
        </OptiAcadButton>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary to-transparent opacity-5 rounded-bl-full" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary to-transparent opacity-5 rounded-tr-full" />
    </div>
  );

  return (
    <div className="main-container">
      {/* Top Section */}
      <div className="top-section">
        <div className="top-main flex w-full">
          <div className="left-side block w-full">
            <div
              className="top-child flex w-full justify-between items-center px-6"
              style={{ marginTop: "16px" }}
            >
              <div className="flex items-center" style={{ gap: "16px" }}>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                  <i className="pi pi-home text-primary"></i>
                  Tableau de Bord
                </h1>
                <div className="flex gap-3">
                  <button
                    style={{
                      fontFamily: "var(--font-josefin-sans), sans-serif",
                      cursor: "pointer",
                      transition: "all 0.3s ease-in-out",
                      position: "relative",
                      padding: "10px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      borderRadius: "8px",
                      border: "1px solid var(--card)",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                    className="hover:bg-card hover:shadow-md hover:border-primary"
                  >
                    <i className="pi pi-chart-bar"></i> Statistiques
                  </button>
                  <button
                    style={{
                      fontFamily: "var(--font-josefin-sans), sans-serif",
                      cursor: "pointer",
                      transition: "all 0.3s ease-in-out",
                      position: "relative",
                      padding: "10px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      borderRadius: "8px",
                      border: "1px solid var(--card)",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                    className="hover:bg-card hover:shadow-md hover:border-primary"
                  >
                    <i className="pi pi-chart-line"></i> Rapports
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Main Dashboard */}
      <div
        className="bottom-main flex w-full"
        style={{ margin: "24px 16px", gap: "24px" }}
      >
        {/* Cards Section */}
        <div className="cards-section" style={{ width: "80%" }}>
          <div className="cards-grid grid grid-cols-3 gap-6">
            {/* Étudiants Actifs */}
            <StatCard
              icon="pi pi-graduation-cap"
              title="Étudiants"
              description="Présence quotidienne des étudiants"
              mainNumber={`${dashboardData.students.percentage}%`}
              buttonText="Voir tous les étudiants"
              additionalInfo={[
                `${dashboardData.students.active} sur ${dashboardData.students.total} étudiants présents`,
                `Tendance: ${dashboardData.students.trend}`,
                "Classement: Excellent",
              ]}
              trend={dashboardData.students.trend}
              status={dashboardData.students.status}
            />

            {/* Personnel */}
            <StatCard
              icon="pi pi-users"
              title="Personnels"
              description="Présence du personnel de l’établissement"
              mainNumber={`${dashboardData.administrativeStaff.percentage}%`}
              buttonText="Voir les présences"
              additionalInfo={[
                `${dashboardData.administrativeStaff.present} sur ${dashboardData.administrativeStaff.total} présents`,
                `Tendance: ${dashboardData.administrativeStaff.trend}`,
                "Statut: Actif",
              ]}
              trend={dashboardData.administrativeStaff.trend}
              status={dashboardData.administrativeStaff.status}
            />

            {/* Bibliothèque */}
            <StatCard
              icon="pi pi-book"
              title="Bibliothèque"
              description="Gestion des livres et emprunts"
              mainNumber={`${dashboardData.library.borrowedPercentage}%`}
              buttonText="Voir les livres"
              additionalInfo={[
                `${dashboardData.library.borrowed} livres empruntés sur ${dashboardData.library.total}`,
                `${dashboardData.library.available} livres disponibles`,
                `${dashboardData.library.overdueBooks} livres en retard`,
                `${dashboardData.library.newBooks} nouveaux livres ajoutés`,
              ]}
              status="normal"
            />
          </div>

          {/* Bibliothèque Section */}
        </div>
      </div>
      <div className="w-full space-y-6 p-6">
        {/* En-tête de section */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <i className="pi pi-chart-line text-blue-600"></i>
              Analytique des Étudiants
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Suivi détaillé de l'évolution, progression et paiements des
              étudiants
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <i className="pi pi-download"></i>
              Exporter
            </button>
          </div>
        </div>

        {/* Cartes de statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon="pi pi-users"
            title="Total Inscrits"
            value="1,150"
            subtitle="Cette année"
            color="blue"
          />
          <StatCard
            icon="pi pi-user-plus"
            title="Actifs"
            value="1,050"
            subtitle="91.3% du total"
            color="green"
          />
          <StatCard
            icon="pi pi-user-minus"
            title="Abandons"
            value="75"
            subtitle="6.5% du total"
            color="red"
          />
          <StatCard
            icon="pi pi-credit-card"
            title="Paiements"
            value="99,000 €"
            subtitle="88.4% collectés"
            color="purple"
          />
        </div>

        {/* Onglets de navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            {[
              { id: "evolution", label: "Évolution", icon: "pi pi-chart-line" },
              { id: "status", label: "Statuts", icon: "pi pi-chart-pie" },
              { id: "payments", label: "Paiements", icon: "pi pi-credit-card" },
              {
                id: "progression",
                label: "Progression",
                icon: "pi pi-chart-bar",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <i className={tab.icon}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Contenu des onglets */}
        <div className="space-y-6">
          {activeTab === "evolution" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Évolution des Inscriptions vs Présences
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={evolutionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="inscriptions"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Inscrits"
                    />
                    <Line
                      type="monotone"
                      dataKey="presents"
                      stroke="#10B981"
                      strokeWidth={2}
                      name="Présents"
                    />
                    <Line
                      type="monotone"
                      dataKey="abandons"
                      stroke="#EF4444"
                      strokeWidth={2}
                      name="Abandons"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Tendance des Abandons
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={evolutionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="abandons"
                      stroke="#EF4444"
                      fill="#FEE2E2"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "status" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Répartition des Statuts Étudiants
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Détails des Statuts
                </h3>
                <div className="space-y-4">
                  {statusData.map((status, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: status.color }}
                        ></div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {status.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          {status.value}
                        </span>
                        <p className="text-sm text-gray-500">
                          {(
                            (status.value /
                              statusData.reduce((sum, s) => sum + s.value, 0)) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Évolution des Paiements
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={paymentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value.toLocaleString()} €`, ""]}
                    />
                    <Legend />
                    <Bar dataKey="paye" fill="#10B981" name="Payé" />
                    <Bar dataKey="enRetard" fill="#F59E0B" name="En retard" />
                    <Bar dataKey="impaye" fill="#EF4444" name="Impayé" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      88.4%
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Taux de Paiement
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      99,000€ / 112,000€
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-2">
                      8.9%
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      En Retard
                    </p>
                    <p className="text-sm text-gray-500 mt-1">10,000€</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600 mb-2">
                      2.7%
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Impayés</p>
                    <p className="text-sm text-gray-500 mt-1">3,000€</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "progression" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Progression par Niveau Académique
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={progressionData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="niveau" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="reussites" fill="#10B981" name="Réussites" />
                    <Bar dataKey="echecs" fill="#F59E0B" name="Échecs" />
                    <Bar dataKey="abandons" fill="#EF4444" name="Abandons" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {progressionData.map((niveau, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      {niveau.niveau}
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Inscrits:
                        </span>
                        <span className="font-medium">{niveau.inscrits}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-green-600">
                          Réussites:
                        </span>
                        <span className="font-medium text-green-600">
                          {niveau.reussites}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-orange-600">Échecs:</span>
                        <span className="font-medium text-orange-600">
                          {niveau.echecs}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-red-600">Abandons:</span>
                        <span className="font-medium text-red-600">
                          {niveau.abandons}
                        </span>
                      </div>
                      <div className="mt-2 pt-2 border-t">
                        <div className="text-xs text-gray-500">
                          Taux de réussite
                        </div>
                        <div className="font-bold text-green-600">
                          {((niveau.reussites / niveau.inscrits) * 100).toFixed(
                            1
                          )}
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainHome;
