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
  FolderOpen,
  BadgePlus,
  ClipboardList,
  Images,
  GalleryVertical,
  Briefcase as CareerIcon,
  FolderGit2,
  LayoutGrid,
  Zap,
  Wrench,
  Cable,
  Lightbulb,
  Gauge,
  Power,
  Contact
} from 'lucide-react';

import { PiCertificateFill } from "react-icons/pi";

// Home sections 
const homeSections = [
  { name: "Banner", path: "/banner", icon: Image },
  { name: "Foundation", path: "/foundation", icon: Building2 },
  { name: "Integrated Services", path: "/services", icon: BriefcaseBusiness },
  { name: "Built Performance", path: "/build_performance", icon: Briefcase },
  { name: "Brand logo", path: "/logo", icon: Diamond },
  { name: "Client voice", path: "/client", icon: Users },
];

// About sections 
const aboutSections = [
  { name: "Certificate", path: "/certificate", icon: PiCertificateFill },
  { name: "Leadership Team", path: "/Team_image", icon: UserRoundCog },
  { name: "Team Group Image", path: "/group_image", icon: Images },
];

// Service sub-sections with portfolio showcase
const serviceSections = [ 
  { 
    name: "Power Substation", 
    path: "/services/power-substation", 
    icon: Power,
    portfolioPath: "/Powersubstation/portfolio",
    hasDropdown: true
  },
  { 
    name: "Domestic Wiring", 
    path: "/services/domestic-wiring", 
    icon: Zap,
    portfolioPath: "/Service/Domestic-wiring/portfolio",
    hasDropdown: true
  },
  { 
    name: "Transformer Service", 
    path: "/services/transformer-service", 
    icon: Gauge,
    portfolioPath: "/Service/Transformer/portfolio",
    hasDropdown: true
  },
  { 
    name: "Servo Stabilizers", 
    path: "/services/servo-stabilizers", 
    icon: ShieldCheck,
    portfolioPath: "/Service/Servo-Stabilizers/portfolio",
    hasDropdown: true
  },
  { 
    name: "Cable Laying", 
    path: "/services/cable-laying", 
    icon: Cable,
    portfolioPath: "/Service/Cable-Laying/portfolio",
    hasDropdown: true
  },
  { 
    name: "Facade Lighting", 
    path: "/services/facade-lighting", 
    icon: Lightbulb,
    portfolioPath: "/Service/Facade-Lighting/portfolio",
    hasDropdown: true
  },
  { 
    name: "Contact Form", 
    path: "/Service/Service_contact_form", 
    icon: Contact,
    hasDropdown: false
  },
];

// Project sections
const projectSections = [
  { name: "Projects", path: "/project", icon: ClipboardList },
];

// Gallery sections
const gallerySections = [
  { name: "Celebrating Years", path: "/celebrating_years", icon: CalendarDays },
  { name: "Celebrating Moments", path: "/celebrating_moments", icon: Sparkles },
  { name: "Employee Award", path: "/employee_award", icon: Award },
  { name: "Festival & Culture", path: "/festival", icon: PartyPopper },
  { name: "Journey", path: "/journey", icon: Map },
];

// Career sections
const careerSections = [
  { name: "Job Post", path: "/job_post", icon: BadgePlus },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isHomeOpen, setIsHomeOpen] = useState(true);
  const [isAboutOpen, setIsAboutOpen] = useState(true);
  const [isServiceOpen, setIsServiceOpen] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(true);
  const [isCareerOpen, setIsCareerOpen] = useState(true);
  const [isProjectOpen, setIsProjectOpen] = useState(true);
  
  // State for each service sub-dropdown
  const [openServices, setOpenServices] = useState({});

  const toggleServiceDropdown = (serviceName) => {
    setOpenServices(prev => ({
      ...prev,
      [serviceName]: !prev[serviceName]
    }));
  };

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
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col h-screen shrink-0 shadow-2xl border-r border-slate-800 overflow-hidden">
      
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800 bg-slate-950/40 backdrop-blur-sm">
        <img
          src="/bhagat_logo.webp"
          alt="Bhagat Logo"
          className="h-12 bg-white rounded p-1 w-auto object-contain"
        />
        <div>
          <h4 className="text-white font-semibold text-xs leading-tight">
            Bhagat Engineering Works
          </h4>
        </div>
      </div>

      <nav 
        className="flex-1 px-3 py-6 space-y-1 overflow-y-auto"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
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
              ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-900/30'
              : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
          }`}
        >
          <div className="flex items-center gap-3">
            <Users className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${pathname === '/' ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
            <span className="text-sm tracking-wide">Admin Dashboard</span>
          </div>
          {pathname === '/' && <span className="text-[10px] text-white/80">▶</span>}
        </Link>

        {/* Home Dropdown */}
        <div className="mt-2">
          <button
            onClick={() => setIsHomeOpen(!isHomeOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
              isSectionActive(homeSections)
                ? 'bg-slate-850 text-white font-semibold border border-slate-700/50 shadow-sm'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <Home className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isSectionActive(homeSections) ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="text-sm tracking-wide">Home</span>
            </div>
            {isHomeOpen ? (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500" />
            )}
          </button>
          
          {isHomeOpen && (
            <div className="ml-4 mt-1 space-y-1 border-l border-slate-800 pl-3">
              {homeSections.map((section) => {
                const Icon = section.icon;
                const isActive = isPathActive(section.path);

                return (
                  <Link
                    key={section.name}
                    href={section.path}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-950/50'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      <span className="text-xs tracking-wide">{section.name}</span>
                    </div>
                    {isActive && <span className="text-[10px] text-white/80">▶</span>}
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
                ? 'bg-slate-850 text-white font-semibold border border-slate-700/50 shadow-sm'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <User className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isSectionActive(aboutSections) ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="text-sm tracking-wide">About</span>
            </div>
            {isAboutOpen ? (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500" />
            )}
          </button>
          
          {isAboutOpen && (
            <div className="ml-4 mt-1 space-y-1 border-l border-slate-800 pl-3">
              {aboutSections.map((section) => {
                const Icon = section.icon;
                const isActive = isPathActive(section.path);

                return (
                  <Link
                    key={section.name}
                    href={section.path}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-950/50'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      <span className="text-xs tracking-wide">{section.name}</span>
                    </div>
                    {isActive && <span className="text-[10px] text-white/80">▶</span>}
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
                ? 'bg-slate-850 text-white font-semibold border border-slate-700/50 shadow-sm'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <BriefcaseBusiness className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isSectionActive(serviceSections) ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="text-sm tracking-wide">Services</span>
            </div>
            {isServiceOpen ? (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500" />
            )}
          </button>
          
          {isServiceOpen && (
            <div className="ml-4 mt-1 space-y-1 border-l border-slate-800 pl-3">
              {serviceSections.map((service) => {
                const Icon = service.icon;
                const isActive = isPathActive(service.path) || (service.portfolioPath && isPathActive(service.portfolioPath));
                const isOpen = openServices[service.name] || false;

                // For Contact Form - no dropdown
                if (!service.hasDropdown) {
                  return (
                    <Link
                      key={service.name}
                      href={service.path}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-950/50'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                        <span className="text-xs tracking-wide">{service.name}</span>
                      </div>
                      {isActive && <span className="text-[10px] text-white/80">▶</span>}
                    </Link>
                  );
                }

                // For services with dropdown (Portfolio Showcase)
                return (
                  <div key={service.name}>
                    <button
                      onClick={() => toggleServiceDropdown(service.name)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                        isActive
                          ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-950/50'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                        <span className="text-xs tracking-wide">{service.name}</span>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </button>

                    {/* Sub-dropdown for Portfolio Showcase */}
                    {isOpen && service.portfolioPath && (
                      <div className="ml-6 mt-1 space-y-1 border-l border-slate-700 pl-3">
                        <Link
                          href={service.portfolioPath}
                          className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-200 group ${
                            isPathActive(service.portfolioPath)
                              ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-950/50'
                              : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <FolderOpen className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-105 ${isPathActive(service.portfolioPath) ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                            <span className="text-[11px] tracking-wide">Portfolio Showcase</span>
                          </div>
                          {isPathActive(service.portfolioPath) && <span className="text-[10px] text-white/80">▶</span>}
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Project Dropdown */}
        <div className="mt-1">
          <button
            onClick={() => setIsProjectOpen(!isProjectOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
              isSectionActive(projectSections)
                ? 'bg-slate-850 text-white font-semibold border border-slate-700/50 shadow-sm'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <LayoutGrid className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isSectionActive(projectSections) ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="text-sm tracking-wide">Project</span>
            </div>
            {isProjectOpen ? (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500" />
            )}
          </button>
          
          {isProjectOpen && (
            <div className="ml-4 mt-1 space-y-1 border-l border-slate-800 pl-3">
              {projectSections.map((section) => {
                const Icon = section.icon;
                const isActive = isPathActive(section.path);

                return (
                  <Link
                    key={section.name}
                    href={section.path}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-950/50'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      <span className="text-xs tracking-wide">{section.name}</span>
                    </div>
                    {isActive && <span className="text-[10px] text-white/80">▶</span>}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Gallery Dropdown */}
        <div className="mt-1">
          <button
            onClick={() => setIsGalleryOpen(!isGalleryOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
              isSectionActive(gallerySections)
                ? 'bg-slate-850 text-white font-semibold border border-slate-700/50 shadow-sm'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <GalleryVertical className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isSectionActive(gallerySections) ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="text-sm tracking-wide">Gallery</span>
            </div>
            {isGalleryOpen ? (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500" />
            )}
          </button>
          
          {isGalleryOpen && (
            <div className="ml-4 mt-1 space-y-1 border-l border-slate-800 pl-3">
              {gallerySections.map((section) => {
                const Icon = section.icon;
                const isActive = isPathActive(section.path);

                return (
                  <Link
                    key={section.name}
                    href={section.path}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-950/50'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      <span className="text-xs tracking-wide">{section.name}</span>
                    </div>
                    {isActive && <span className="text-[10px] text-white/80">▶</span>}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Career Dropdown */}
        <div className="mt-1">
          <button
            onClick={() => setIsCareerOpen(!isCareerOpen)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
              isSectionActive(careerSections)
                ? 'bg-slate-850 text-white font-semibold border border-slate-700/50 shadow-sm'
                : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <CareerIcon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isSectionActive(careerSections) ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span className="text-sm tracking-wide">Career</span>
            </div>
            {isCareerOpen ? (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500" />
            )}
          </button>
          
          {isCareerOpen && (
            <div className="ml-4 mt-1 space-y-1 border-l border-slate-800 pl-3">
              {careerSections.map((section) => {
                const Icon = section.icon;
                const isActive = isPathActive(section.path);

                return (
                  <Link
                    key={section.name}
                    href={section.path}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-950/50'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      <span className="text-xs tracking-wide">{section.name}</span>
                    </div>
                    {isActive && <span className="text-[10px] text-white/80">▶</span>}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

      </nav>

      {/* Admin Profile Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/30 backdrop-blur-sm flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-sm text-indigo-400">
          AD
        </div>
        <div>
          <p className="text-sm font-medium text-slate-200">Admin User</p>
          <p className="text-xs text-slate-500">admin@radish.com</p>
        </div>
      </div>
    </aside>
  );
}