import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { LoginForm } from "./components/LoginForm";
import { DashboardHeader } from "./components/DashboardHeader";
import { SharedHome } from "./components/SharedHome";
import { SharedDashboard } from "./components/SharedDashboard";
import { RecruiterDashboard } from "./components/RecruiterDashboard";
import { TeamLeadDashboard } from "./components/TeamLeadDashboard";
import { ManagerDashboard } from "./components/ManagerDashboard";
import { AdminDashboard } from "./components/AdminDashboard";

export type UserRole =
  | "recruiter"
  | "teamlead"
  | "manager"
  | "admin";

export interface User {
  email: string;
  role: UserRole;
  name: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "landing" | "login" | "dashboard"
  >("landing");
  const [selectedRole, setSelectedRole] =
    useState<UserRole | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard'>('home');

  // Handle role selection from landing page
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentPage("login");
  };

  // Handle successful login
  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage("dashboard");
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
    setCurrentPage("landing");
  };

  // Handle back to landing
  const handleBackToLanding = () => {
    setSelectedRole(null);
    setCurrentPage("landing");
  };

  const renderDashboard = () => {
    if (!user) return null;

    const dashboardProps = {
      user,
      onLogout: handleLogout,
    };

    switch (user.role) {
      case "recruiter":
        return <RecruiterDashboard {...dashboardProps} />;
      case "teamlead":
        return <TeamLeadDashboard {...dashboardProps} />;
      case "manager":
        return <ManagerDashboard {...dashboardProps} />;
      case "admin":
        return <AdminDashboard {...dashboardProps} />;
      default:
        return <RecruiterDashboard {...dashboardProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-white transition-smooth">
      {currentPage === "landing" && (
        <LandingPage onRoleSelect={handleRoleSelect} />
      )}

      {currentPage === "login" && selectedRole && (
        <LoginForm
          role={selectedRole}
          onLogin={handleLogin}
          onBack={handleBackToLanding}
        />
      )}

      {currentPage === "dashboard" && user && (
        <div className="min-h-screen bg-gray-50">
          <DashboardHeader
            user={user}
            onLogout={handleLogout}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          <main className="pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mt-12">
                {activeTab === 'home' ? (
                  <SharedHome user={user} />
                ) : (
                  <SharedDashboard />
                )}
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
