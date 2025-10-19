// Sidebar.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiTimerOutline,
  mdiViewDashboardOutline,
  mdiTagOutline,
  mdiHistory,
} from "@mdi/js";

interface MenuItem {
  icon: string;
  label: string;
  path: string;
}

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const menuItems: MenuItem[] = [
    { icon: mdiTimerOutline, label: "Timer", path: "/timer" },
    { icon: mdiViewDashboardOutline, label: "Dashboard", path: "/dashboard" },
    { icon: mdiTagOutline, label: "Tags", path: "/tags" },
    { icon: mdiHistory, label: "History", path: "/history" },
  ];

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-white/46 backdrop-blur-sm rounded-full p-3 shadow-lg"
        aria-label="Toggle menu"
        type="button"
      >
        <Icon
          path={mdiViewDashboardOutline}
          size={1}
          className="text-[#4F46E5]"
        />
      </button>

      {isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          aria-label="Close menu"
          type="button"
        />
      )}

      <aside
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`fixed top-0 z-40 h-screen bg-white/46 backdrop-blur-sm transition-all duration-300 ease-in-out flex flex-col items-start justify-center gap-6 px-4 ${
          isExpanded ? "w-40" : "w-20"
        } ${isMobileOpen ? "right-0" : "-right-full"} md:left-0 md:right-auto`}
        id="sidebar-nav"
      >
        <nav className="flex flex-col gap-6 w-full">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="sidebar-item flex items-center gap-3 group"
              aria-label={item.label}
              onClick={() => setIsMobileOpen(false)}
            >
              <span
                className="sidebar-icon-wrapper relative flex items-center justify-center min-w-[50px] w-[50px] h-[50px] flex-shrink-0 rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{
                  background:
                    "linear-gradient(to bottom right, #4F46E5, #726BEA, #8983EE, #AEAAF3)",
                }}
              >
                <Icon path={item.icon} size={1.2} className="text-white" />
              </span>

              <span
                className={`sidebar-label text-[#4F46E5] font-medium whitespace-nowrap transition-all duration-300 ${
                  isExpanded
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 pointer-events-none"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
