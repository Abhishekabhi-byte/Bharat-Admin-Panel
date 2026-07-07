'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const sections = [
  { name: "Banner", path: "/banner" },
  { name: "Foundation", path: "/foundation" },
  { name: "Projects", path: "/project" },
  { name: "Client", path: "/client" },
  { name: "Journey", path: "/journey" },
  { name: "Team", path: "/team" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" }
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
          <span className="ml-2 px-2.5 py-0.5 text-xs font-semibold rounded-full bg-[#935053]/10 text-[#935053] border border-[#935053]/20">
            Section
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