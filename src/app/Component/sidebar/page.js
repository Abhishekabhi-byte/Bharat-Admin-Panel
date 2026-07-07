'use client';

import React from 'react';
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
  PhoneCall 
} from 'lucide-react';

const sections = [
  { name: "Banner", path: "/banner", icon: Image },
  { name: "Foundation", path: "/foundation", icon: Building2 },
  { name: "Projects", path: "/project", icon: Briefcase },
  { name: "Client", path: "/client", icon: Users },
  { name: "Journey", path: "/journey", icon: Map },
  { name: "Team", path: "/team", icon: User },
  { name: "Services", path: "/services", icon: BriefcaseBusiness },
  { name: "Contact", path: "/contact", icon: PhoneCall }
];

export default function sidebar() {
  const pathname = usePathname();

  return (
    // Custom gradient mimicking the provided image color scheme
    <aside className="w-64 bg-gradient-to-br from-[#935053] via-[#b67376] to-[#cd9193] text-white flex flex-col h-screen shrink-0 shadow-xl">
      
      {/* Sidebar Header Brand */}
      <div className="h-16 flex items-center px-6 border-b border-white/10 bg-[#7a3e41]/30 backdrop-blur-sm">
        <div className="w-2.5 h-2.5 rounded-full bg-white mr-2 shadow-sm" />
        <span className="font-bold text-base tracking-wider text-white">
          BHARAT PANEL
        </span>
      </div>

      {/* Navigation Fields */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = pathname === section.path || pathname?.startsWith(section.path);

          return (
            <Link
              key={section.name}
              href={section.path}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-white/20 text-white font-semibold backdrop-blur-md shadow-inner border border-white/10'
                  : 'text-rose-100/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-rose-200/60 group-hover:text-white'}`} />
                <span className="text-sm tracking-wide">{section.name}</span>
              </div>
              {isActive && <span className="text-xs text-white/80">▶</span>}
            </Link>
          );
        })}
      </nav>

      {/* Profile Footer */}
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