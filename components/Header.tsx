import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { NotificationIcon } from './icons/NotificationIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface HeaderProps {
  onMenuClick: () => void;
  profile: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  onProfileClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, profile, onProfileClick }) => {
  return (
    <header className="flex items-center justify-between h-20 px-4 md:px-8 border-b border-border bg-card sticky top-0 z-30">
      <div className="flex items-center space-x-4 flex-1">
        <button 
          onClick={onMenuClick}
          className="p-2 md:hidden text-muted-foreground hover:bg-muted rounded-lg"
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>

        <div className="relative w-full max-w-xs md:max-w-sm hidden sm:block">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full bg-background border border-border/50 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-6">
        <button className="p-2 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground relative">
          <NotificationIcon className="w-5 h-5"/>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-card"></span>
        </button>
        
        <div 
          onClick={onProfileClick}
          className="flex items-center space-x-2 md:space-x-3 cursor-pointer p-1 pr-2 rounded-full hover:bg-muted transition-colors"
        >
          <img 
            src={profile.avatarUrl} 
            alt="User profile" 
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-primary/10" 
          />
          <div className="hidden lg:block text-left">
            <p className="font-bold text-sm text-foreground leading-tight">{profile.name}</p>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">{profile.role}</p>
          </div>
          <ChevronDownIcon className="w-4 h-4 text-muted-foreground hidden sm:block"/>
        </div>
      </div>
    </header>
  );
};

export default Header;