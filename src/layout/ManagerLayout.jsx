import React, { useState } from "react";  // <-- Add this import
import { Outlet } from "react-router-dom";
import Header from "../component/Main/Header/Header";
import ManagerSidebar from "../component/Manager/ManagerSidebar/ManagerSidebar";

const ManagerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <main className="w-full min-h-screen flex bg-[#FEFFFE] ">
      <ManagerSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {/* Main Content */}
      <section className="w-full h-full md:ml-[320px] px-2 md:px-0">
        <Header toggleSidebar={toggleSidebar} />
        <div className="py-5 md:px-5">
          <Outlet />
        </div>
      </section>

      {/* Overlay when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleSidebar}
        ></div>
      )}
    </main>
  );
};

export default ManagerLayout;
