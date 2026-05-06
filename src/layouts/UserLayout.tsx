import React, { useState } from 'react'
import Sidebar from './UserLayout/Common/Sidebar';
import Navbar from './UserLayout/Common/Navbar';
// import Breadcrumb from './UserLayout/Common/Breadcrumb';
import UseFooter from './UserLayout/Common/UseFooter';

const UserLayout = ({ children }: any) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  return (
    <div className="flex h-screen">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed
            ? "ml-20 w-[calc(100%-5rem)]"
            : "ml-72 w-[calc(100%-18rem)]"
        } bg-gray-50 right_sidesec bg-[#f9fafc]`}
      >
        <Navbar
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        <main className="md:p-8 p-4 bg-[#f9fafc]">
          {/* <Breadcrumb /> */}
          {children}
        </main>
        <UseFooter />
      </div>
    </div>
  );
};

export default UserLayout


