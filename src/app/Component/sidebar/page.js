'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Image, 
  Building2, 
  Briefcase, 
  Users, 
  Map, 
  User, 
  BriefcaseBusiness,
  Home,
  ChevronDown,
  ChevronRight,
  PartyPopper,
  UserRoundCog,
  Diamond,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  Award,
  FolderOpen
} from 'lucide-react';

import { PiCertificateFill } from "react-icons/pi";

// Home sections 
const homeSections = [
  { name: "Banner", path: "/banner", icon: Image },
  { name: "Foundation", path: "/foundation", icon: Building2 },
  { name: "Build Performance", path: "/build_performance", icon: Briefcase },
  { name: "Client voice", path: "/client", icon: Users },
  { name: "Brand logo", path: "/logo", icon: Diamond },
  { name: "Bussiness services", path: "/services", icon: BriefcaseBusiness },
];

// About sections 
const aboutSections = [
  { name: "Festival", path: "/festival", icon: PartyPopper },
  { name: "Team Image", path: "/Team_image", icon: UserRoundCog },
  { name: "Celebrating", path: "/celebrating_years", icon: CalendarDays },
  { name: "Legacy", path: "/legacy", icon: ShieldCheck },
  { name: "Celebrating Moments", path: "/celebrating_moments", icon: Sparkles },
  { name: "Employee Award", path: "/employee_award", icon: Award },
  { name: "Journey", path: "/journey", icon: Map },
  { name: "Certificate", path: "/certificate", icon: PiCertificateFill }
];

// Service sections
const serviceSections = [ 
  { name: "Portfolio showcase", path: "/portfolio_showcase", icon: FolderOpen },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isHomeOpen, setIsHomeOpen] = useState(true);
  const [isAboutOpen, setIsAboutOpen] = useState(true);
  const [isServiceOpen, setIsServiceOpen] = useState(true);

  const isPathActive = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(path);
  };

  const isSectionActive = (sections) => {
    return sections.some(section => isPathActive(section.path));
  };

  return (
    <aside className="w-64 bg-[#B50508] text-white flex flex-col h-screen shrink-0 shadow-xl overflow-hidden">
      
      <div className="h-16 flex items-center px-6 border-b border-white/10 bg-[#7a3e41]/30 backdrop-blur-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-white mr-2 shadow-sm" />
        <span className="font-bold text-base tracking-wider text-white">
          BHARAT PANEL
        </span>
      </div>

      {/* 
        FIXED: Changed to overflow-y-auto so you can slide/scroll up and down.
        Added custom inline styles to hide the scrollbar completely while remaining fully functional.
      */}
      <nav 
        className="flex-1 px-3 py-6 space-y-1 overflow-y-auto"
        style={{
          scrollbarWidth: 'none',          /* Firefox */
          msOverflowStyle: 'none',         /* IE and Edge */
        }}
      >
        {/* Style block to inject webkit scrollbar hiding rule for Chrome/Safari */}
        <style dangerouslySetInnerHTML={{__html: `
          nav::-webkit-scrollbar {
            display: none !important;
          }
        `}} />
        
        {/* Admin Dashboard Button */}
        <Link
          href="/"
          className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
            pathname === '/'
              ? 'bg-white/20 text-white font-semibold backdrop-blur-md shadow-inner border border-white/10'
              : 'text-rose-100/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <Users className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${pathname === '/' ? 'text-white' : 'text-rose-200/60 group-hover:text-white'}`} />
            <span className="text-sm tracking-wide">Admin Dashboard</span>
          </div>
          {pathname === '/' && <span className="text-xs text-white/80">▶</span>}
        </Link>

        {/* Home Dropdown */}
        <div className="mt-2">
          <button
            onClick={() => setIsHomeOpen(!isHomeOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
              isSectionActive(homeSections)
                ? 'bg-white/20 text-white font-semibold backdrop-blur-md shadow-inner border border-white/10'
                : 'text-rose-100/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Home className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isSectionActive(homeSections) ? 'text-white' : 'text-rose-200/60 group-hover:text-white'}`} />
              <span className="text-sm tracking-wide">Home</span>
            </div>
            {isHomeOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          {isHomeOpen && (
            <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
              {homeSections.map((section) => {
                const Icon = section.icon;
                const isActive = isPathActive(section.path);

                return (
                  <Link
                    key={section.name}
                    href={section.path}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-white/20 text-white font-semibold backdrop-blur-md shadow-inner border border-white/10'
                        : 'text-rose-100/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-rose-200/60 group-hover:text-white'}`} />
                      <span className="text-xs tracking-wide">{section.name}</span>
                    </div>
                    {isActive && <span className="text-xs text-white/80">▶</span>}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* About Dropdown */}
        <div className="mt-1">
          <button
            onClick={() => setIsAboutOpen(!isAboutOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
              isSectionActive(aboutSections)
                ? 'bg-white/20 text-white font-semibold backdrop-blur-md shadow-inner border border-white/10'
                : 'text-rose-100/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <User className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isSectionActive(aboutSections) ? 'text-white' : 'text-rose-200/60 group-hover:text-white'}`} />
              <span className="text-sm tracking-wide">About</span>
            </div>
            {isAboutOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          {isAboutOpen && (
            <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
              {aboutSections.map((section) => {
                const Icon = section.icon;
                const isActive = isPathActive(section.path);

                return (
                  <Link
                    key={section.name}
                    href={section.path}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-white/20 text-white font-semibold backdrop-blur-md shadow-inner border border-white/10'
                        : 'text-rose-100/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-rose-200/60 group-hover:text-white'}`} />
                      <span className="text-xs tracking-wide">{section.name}</span>
                    </div>
                    {isActive && <span className="text-xs text-white/80">▶</span>}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Services Dropdown */}
        <div className="mt-1">
          <button
            onClick={() => setIsServiceOpen(!isServiceOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
              isSectionActive(serviceSections)
                ? 'bg-white/20 text-white font-semibold backdrop-blur-md shadow-inner border border-white/10'
                : 'text-rose-100/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <BriefcaseBusiness className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isSectionActive(serviceSections) ? 'text-white' : 'text-rose-200/60 group-hover:text-white'}`} />
              <span className="text-sm tracking-wide">Services</span>
            </div>
            {isServiceOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          {isServiceOpen && (
            <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-3">
              {serviceSections.map((section) => {
                const Icon = section.icon;
                const isActive = isPathActive(section.path);

                return (
                  <Link
                    key={section.name}
                    href={section.path}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-white/20 text-white font-semibold backdrop-blur-md shadow-inner border border-white/10'
                        : 'text-rose-100/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-rose-200/60 group-hover:text-white'}`} />
                      <span className="text-xs tracking-wide">{section.name}</span>
                    </div>
                    {isActive && <span className="text-xs text-white/80">▶</span>}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

      </nav>

      <div className="p-4 border-t border-white/10 bg-[#7a3e41]/20 backdrop-blur-sm flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-white/20 border border-white/20 flex items-center justify-center font-bold text-sm text-white">
          AD
        </div>
        <div>
          <p className="text-sm font-medium text-white">Admin User</p>
          <p className="text-xs text-rose-200/60">admin@radish.com</p>
        </div>
      </div>
    </aside>
  );
}