'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const sections = [
  { name: "Banner", path: "/banner" },
  { name: "Foundation", path: "/foundation" },
  { name: "Build Performance", path: "/build_performance" },
  { name: "Client Voice", path: "/client" },
  { name: "Journey", path: "/journey" },
  { name: "Team", path: "/team" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
   { name: "Brand logo", path: "/logo"},
   { name: "Festival", path: "/festival"},
   { name: "Team Image", path: "/Team_image"},
   { name: "Celebrating Years", path: "/celebrating_years"},
    { name: "Legacy", path: "/legacy"},
     { name: "Celebrating Moments", path: "/celebrating_moments"},
     { name: "Employee Award", path: "/employee_award"},
   { name: "Journey", path: "/journey"},
  { name: "Certificate", path: "/certificate"},
  { name: "Integrated Services", path: "/services"},
  { name: "Portfolio showcase", path: "/portfolio_showcase"},
 { name: "Job Post", path: "/job_post"},
 { name: "Projects", path: "/project"},    
     { name: "Team Group Image", path: "/group_image"},

];

export default function Header() {
  const pathname = usePathname();

  const currentSection = sections.find(s => pathname === s.path || pathname?.startsWith(s.path));
  const title = currentSection ? currentSection.name : 'Admin Dashboard';

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 shadow-sm w-full">
      <div className="flex items-center gap-3">
        {/* Left vertical visual anchor matching the deep dark radish tone */}
        <div className="w-1.5 h-6 bg-[#935053] rounded-full" />
        <h1 className="text-xl font-bold text-slate-800 tracking-tight transition-all duration-300">
          {title}
        </h1>
        {currentSection && (
          <span className="">
            {/* Section */}
          </span>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500 font-medium">Welcome, Admin</span>
        <button className="px-4 py-1.5 text-xs font-semibold text-[#935053] bg-[#935053]/5 hover:bg-[#935053]/10 rounded-full transition-colors border border-[#935053]/10">
          Logout
        </button>
      </div>
    </header>
  );
}