import React from 'react';
import { ViewType } from '../types';
import { SyncLogo } from './icons/SyncLogo';
import { DashboardIcon } from './icons/DashboardIcon';
import { LeadsIcon } from './icons/LeadsIcon';
import { PeopleIcon } from './icons/PeopleIcon';
import { CompaniesIcon } from './icons/CompaniesIcon';
import { ProjectsIcon } from './icons/ProjectsIcon';
import { ScheduleIcon } from './icons/ScheduleIcon';
import { SettingsIcon } from './icons/SettingsIcon';
import { RocketIcon } from './icons/RocketIcon';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  isOpen: boolean;
}

interface SidebarNavItem {
  view: ViewType;
  label: string;
  icon: React.ReactNode;
  badge?: string;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  badge?: string;
}> = ({ icon, label, isActive, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-5 py-3 rounded-lg text-sm transition-all duration-200 group ${
      isActive
        ? 'font-black text-white bg-black shadow-lg shadow-black/10'
        : 'font-bold text-muted-foreground hover:text-black hover:bg-secondary'
    }`}
  >
    <span className={`w-5 h-5 mr-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-muted-foreground'}`}>{icon}</span>
    <span className="flex-1 text-left tracking-tight">{label}</span>
    {badge && <span className="text-[9px] bg-black text-white px-2 py-0.5 rounded font-black border border-white/20">{badge}</span>}
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen }) => {
  const navItems: SidebarNavItem[] = [
    { view: 'dashboard', label: 'Overview', icon: <DashboardIcon /> },
    { view: 'leads', label: 'Sales Pipeline', icon: <LeadsIcon /> },
    { view: 'companies', label: 'Deals', icon: <CompaniesIcon /> },
    { view: 'tasks', label: 'Tasks List', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg> },
    { view: 'people', label: 'Contacts', icon: <PeopleIcon /> },
    { view: 'projects', label: 'Projects', icon: <ProjectsIcon /> },
    { view: 'proposals', label: 'Proposals', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> },
    { view: 'templates', label: 'Templates', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> },
    { view: 'ai-lab', label: 'AI Intelligence', icon: <RocketIcon />, badge: 'LIVE' },
    { view: 'schedule', label: 'Schedule', icon: <ScheduleIcon /> },
    { view: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border p-8 transition-transform duration-500 ease-in-out md:static md:translate-x-0
      ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
    `}>
      <div className="flex items-center h-20 px-2 mb-10">
        <SyncLogo className="w-8 h-8 text-black mr-3" />
        <h1 className="text-2xl font-black text-black tracking-tighter uppercase italic">connect</h1>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto pr-2 scrollbar-none max-h-[calc(100vh-320px)]">
        {navItems.map((item) => (
          <NavItem
            key={item.view}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            isActive={activeView === item.view}
            onClick={() => setActiveView(item.view)}
          />
        ))}
      </nav>
      <div className="p-8 mt-10 bg-black rounded-2xl text-center shadow-2xl shadow-black/20 hidden md:block relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
          <RocketIcon className="w-6 h-6 text-white" />
        </div>
        <p className="text-sm font-black text-white">Scale Up</p>
        <p className="text-[10px] font-bold text-white/60 mb-6 leading-relaxed uppercase tracking-widest">Enterprise Access</p>
        <button className="w-full bg-white text-black hover:bg-white/90 px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95">
          View Plans
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;