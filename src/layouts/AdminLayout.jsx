import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from '../components/layout/AdminHeader';
import { AdminSidebar } from '../components/layout/AdminSidebar';
import { cn } from '../lib/utils';

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300",
        isCollapsed ? "lg:pl-[80px]" : "lg:pl-[280px]"
      )}>
        <AdminHeader
          setIsMobileOpen={setIsMobileOpen}
          isCollapsed={isCollapsed}
        />

        <main className="flex-1 overflow-x-hidden pt-16">
          {/* Outlet renders the matched child route component */}
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
