"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Dashboard from "./page";
import StudentsManagement from "./components/StudentsManagement";
import StaffManagement from "./components/StaffManagement";
import Archive from "./components/Archive";
import Rating from "./components/Rating";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import ExpandingButtonSidebar from "@/components/ExpandingButtonSidebar";

// Importation des composants de sous-menus
// Dashboard sous-menus
import Overview from "./components/Profile";
import Analytics from "./components/Profile";
import Reports from "./components/Profile";
import Statistics from "./components/Profile";

// Students sous-menus
import AllStudents from "./components/Profile";
import NewStudent from "./components/Profile";
import StudentGroups from "./components/Profile";
import Attendance from "./components/Profile";

// Staff sous-menus
import AllStaff from "./components/Profile";
import AddStaff from "./components/Profile";
import StaffRoles from "./components/Profile";
import StaffSchedule from "./components/Profile";

// Archive sous-menus
import ArchivedStudents from "./components/Profile";
import ArchivedStaff from "./components/Profile";
import ArchivedFiles from "./components/Profile";
import Restore from "./components/Profile";

// Rating sous-menus
import StudentRatings from "./components/Profile";
import CourseRatings from "./components/Profile";
import Performance from "./components/Profile";
import Feedback from "./components/Profile";

// Profile sous-menus
import PersonalInfo from "./components/Profile";
import Security from "./components/Profile";
import Notifications from "./components/Profile";
import Preferences from "./components/Profile";

// Settings sous-menus
import General from "./components/Profile";
import Appearance from "./components/Profile";
import Language from "./components/Profile";
import Permissions from "./components/Profile";

const drawerWidth = 80;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeView, setActiveView] = useState<string>("dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleViewChange = (viewId: string) => {
    setActiveView(viewId);
    setActiveSubMenu(null); // Reset du sous-menu quand on change de vue principale
  };

  const handleSubMenuChange = (subMenuId: string) => {
    setActiveSubMenu(subMenuId);
  };

  // Fonction pour rendre le contenu des sous-menus
  const renderSubMenuContent = () => {
    if (!activeSubMenu) return null;

    // Mappage des sous-menus vers leurs composants
    const subMenuComponents = {
      // Dashboard
      overview: <Overview />,
      analytics: <Analytics />,
      reports: <Reports />,
      statistics: <Statistics />,

      // Students
      "all-students": <AllStudents />,
      "new-student": <NewStudent />,
      "student-groups": <StudentGroups />,
      attendance: <Attendance />,

      // Staff
      "all-staff": <AllStaff />,
      "add-staff": <AddStaff />,
      "staff-roles": <StaffRoles />,
      "staff-schedule": <StaffSchedule />,

      // Archive
      "archived-students": <ArchivedStudents />,
      "archived-staff": <ArchivedStaff />,
      "archived-files": <ArchivedFiles />,
      restore: <Restore />,

      // Rating
      "student-ratings": <StudentRatings />,
      "course-ratings": <CourseRatings />,
      performance: <Performance />,
      feedback: <Feedback />,

      // Profile
      "personal-info": <PersonalInfo />,
      security: <Security />,
      notifications: <Notifications />,
      preferences: <Preferences />,

      // Settings
      general: <General />,
      appearance: <Appearance />,
      language: <Language />,
      permissions: <Permissions />,
    };

    return subMenuComponents[activeSubMenu] || null;
  };

  // Fonction pour rendre le contenu en fonction de la vue active
  const renderContent = () => {
    // Si un sous-menu est actif, afficher son contenu
    const subMenuContent = renderSubMenuContent();
    if (subMenuContent) {
      return subMenuContent;
    }

    // Sinon, afficher le contenu de la vue principale
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "students":
        return <StudentsManagement />;
      case "staff":
        return <StaffManagement />;
      case "archive":
        return <Archive />;
      case "rating":
        return <Rating />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "var(--background)",
      }}
    >
      <Box sx={{ display: "flex", flex: 1 }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Sidebar
            drawerWidth={drawerWidth}
            mobileOpen={mobileOpen}
            onDrawerToggle={handleDrawerToggle}
            activeView={activeView}
            onViewChange={handleViewChange}
          />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            bgcolor: "#00070F",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className="bg-background flex-1 overflow-auto"
            style={{ marginBottom: "10vh" }}
          >
            {renderContent()}
          </div>
        </Box>

        {/* ExpandingButtonSidebar avec gestion des sous-menus */}
        <ExpandingButtonSidebar
          activeView={activeView}
          onViewChange={handleViewChange}
          onSubMenuChange={handleSubMenuChange}
          activeSubMenu={activeSubMenu}
        />

        <Footer />
      </Box>
    </Box>
  );
}
