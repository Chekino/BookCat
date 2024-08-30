import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="admin-panel">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-content">
        <Outlet /> {/* Les autres pages s'afficheront ici */}
      </div>
    </div>
  );
};

export default Dashboard;
