import React, { useState } from 'react';
import { SlackIcon, GoogleIcon, MicrosoftIcon, AtlassianIcon } from './icons/AppIcons';

type SettingsTab = 'profile' | 'notifications' | 'integrations' | 'billing';

interface SettingsProps {
    onAction: (type: string) => void;
    profile: any;
    onUpdateProfile: (data: any) => void;
}

const Settings: React.FC<SettingsProps> = ({ onAction, profile, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return <ProfileSettings profile={profile} onUpdateProfile={onUpdateProfile} onAction={onAction} />;
      case 'notifications':
        return <NotificationSettings onAction={onAction} />;
      case 'integrations':
        return <IntegrationSettings onAction={onAction} />;
      case 'billing':
        return <BillingSettings onAction={onAction} />;
      default:
        return null;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-foreground tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and workspace preferences.</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-1/4">
          <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <SettingsTabButton label="Profile" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
            <SettingsTabButton label="Notifications" isActive={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
            <SettingsTabButton label="Integrations" isActive={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} />
            <SettingsTabButton label="Billing" isActive={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
          </nav>
        </aside>
        <div className="flex-1 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const SettingsTabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({ label, isActive, onClick}) => {
    return (
        <button onClick={onClick} className={`px-5 py-3 rounded-xl text-left text-sm font-bold transition-all whitespace-nowrap active:scale-[0.98] ${
            isActive ? 'bg-primary/10 text-primary shadow-sm' : 'hover:bg-muted/50 text-muted-foreground'
        }`}>
            {label}
        </button>
    )
}

const Toggle: React.FC<{ active: boolean, onToggle: () => void }> = ({ active, onToggle }) => (
    <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${active ? 'bg-primary' : 'bg-muted'}`}
    >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${active ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
);

const NotificationSettings: React.FC<{onAction: (t:string)=>void}> = ({ onAction }) => {
    const [notifs, setNotifs] = useState({
        emailLeads: true,
        emailTasks: false,
        pushDeals: true,
        pushMeetings: true,
        aiSummary: true
    });

    const toggle = (key: keyof typeof notifs) => setNotifs(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div>
            <div className="p-6 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">Notifications</h3>
                <p className="text-sm text-muted-foreground">Control when and how you want to be alerted.</p>
            </div>
            <div className="p-6 space-y-8">
                <section className="space-y-4">
                    <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest">Email Notifications</h4>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-foreground">New Lead Assignments</p>
                                <p className="text-xs text-muted-foreground">Receive an email when a new lead is assigned to you.</p>
                            </div>
                            <Toggle active={notifs.emailLeads} onToggle={() => toggle('emailLeads')} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-foreground">Task Deadlines</p>
                                <p className="text-xs text-muted-foreground">Get reminded of upcoming tasks 24 hours before they're due.</p>
                            </div>
                            <Toggle active={notifs.emailTasks} onToggle={() => toggle('emailTasks')} />
                        </div>
                    </div>
                </section>
                <section className="space-y-4">
                    <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest">Push Notifications</h4>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-foreground">Deal Status Updates</p>
                                <p className="text-xs text-muted-foreground">Instant alerts when a deal moves between pipeline stages.</p>
                            </div>
                            <Toggle active={notifs.pushDeals} onToggle={() => toggle('pushDeals')} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold text-foreground">AI Intelligence Alerts</p>
                                <p className="text-xs text-muted-foreground">Get notified when AI detects high probability for a deal.</p>
                            </div>
                            <Toggle active={notifs.aiSummary} onToggle={() => toggle('aiSummary')} />
                        </div>
                    </div>
                </section>
            </div>
            <div className="p-6 bg-muted/20 border-t border-border flex justify-end">
                <button 
                    onClick={() => {
                      onAction('SAVE_PREFERENCES');
                    }}
                    className="w-full sm:w-auto bg-primary text-primary-foreground font-bold px-8 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                >
                    Update Preferences
                </button>
            </div>
        </div>
    );
};

const IntegrationSettings: React.FC<{onAction: (t:string)=>void}> = ({ onAction }) => {
    const apps = [
        { name: 'Slack', desc: 'Sync conversations & alerts', icon: <SlackIcon className="w-8 h-8" />, connected: true },
        { name: 'Google Workspace', desc: 'Import contacts & calendar', icon: <GoogleIcon className="w-8 h-8" />, connected: true },
        { name: 'Microsoft 365', desc: 'Sync Outlook & Teams', icon: <MicrosoftIcon className="w-8 h-8" />, connected: false },
        { name: 'Jira Software', desc: 'Link project tickets', icon: <AtlassianIcon className="w-8 h-8" />, connected: false },
    ];

    return (
        <div>
            <div className="p-6 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">Integrations</h3>
                <p className="text-sm text-muted-foreground">Connect your favorite tools to streamline your workflow.</p>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {apps.map(app => (
                    <div key={app.name} className="p-5 border border-border rounded-2xl bg-card hover:border-primary/30 transition-all group">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-xl bg-muted/50 group-hover:bg-primary/5 transition-colors">
                                {app.icon}
                            </div>
                            {app.connected ? (
                                <span className="bg-primary/10 text-primary text-[10px] font-black uppercase px-2 py-1 rounded-full">Connected</span>
                            ) : (
                                <span className="bg-muted text-muted-foreground text-[10px] font-black uppercase px-2 py-1 rounded-full">Available</span>
                            )}
                        </div>
                        <h4 className="font-bold text-foreground">{app.name}</h4>
                        <p className="text-xs text-muted-foreground mb-4">{app.desc}</p>
                        <button 
                            onClick={() => onAction('INTEGRATIONS')}
                            className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all active:scale-[0.97] ${
                            app.connected 
                            ? 'border border-border hover:bg-destructive/5 hover:text-destructive' 
                            : 'bg-primary text-primary-foreground hover:bg-primary/90'
                        }`}>
                            {app.connected ? 'Disconnect' : 'Connect Now'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BillingSettings: React.FC<{onAction: (t:string)=>void}> = ({ onAction }) => {
    const invoices = [
        { id: 'INV-001', date: 'May 1, 2024', amount: '$19.00', status: 'Paid' },
        { id: 'INV-002', date: 'Apr 1, 2024', amount: '$19.00', status: 'Paid' },
        { id: 'INV-003', date: 'Mar 1, 2024', amount: '$19.00', status: 'Paid' },
    ];

    return (
        <div>
            <div className="p-6 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">Billing & Plans</h3>
                <p className="text-sm text-muted-foreground">Manage your subscription and view payment history.</p>
            </div>
            <div className="p-6 space-y-8">
                <div className="bg-gradient-to-br from-primary to-purple-700 p-6 rounded-2xl text-primary-foreground shadow-xl shadow-primary/20">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest opacity-80">Current Plan</p>
                            <h4 className="text-2xl font-black tracking-tight mt-1">Connect CRM Pro</h4>
                        </div>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">Monthly</span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                        <div>
                            <p className="text-3xl font-black">$19.00<span className="text-sm font-normal opacity-80"> /mo</span></p>
                            <p className="text-xs opacity-80 mt-1">Next billing date: June 1, 2024</p>
                        </div>
                        <button 
                            onClick={() => onAction('CHANGE_PLAN')}
                            className="w-full sm:w-auto bg-white text-primary font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-white/90 transition-all active:scale-95 shadow-lg"
                        >
                            Change Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileSettings: React.FC<{profile: any, onUpdateProfile: (d: any) => void, onAction: (t:string)=>void}> = ({ profile, onUpdateProfile, onAction }) => {
    const [localProfile, setLocalProfile] = useState(profile);

    const handleSave = () => {
      onUpdateProfile(localProfile);
      onAction('SAVE_PROFILE');
    };

    return (
        <div>
            <div className="p-6 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">Profile Information</h3>
                <p className="text-sm text-muted-foreground">Update your personal information and presence.</p>
            </div>
            <div className="p-6 space-y-8">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <div className="relative group">
                        <img src={localProfile.avatarUrl} alt="User" className="w-24 h-24 rounded-2xl object-cover ring-4 ring-primary/5 shadow-xl shadow-primary/10" />
                        <div 
                            onClick={() => onAction('CHANGE_PHOTO')}
                            className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                    </div>
                    <div className="text-center sm:text-left">
                        <button 
                            onClick={() => onAction('CHANGE_PHOTO')}
                            className="w-full sm:w-auto bg-primary text-primary-foreground text-sm font-bold px-6 py-3 rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
                        >
                            Change Photo
                        </button>
                        <p className="text-xs text-muted-foreground mt-3">JPG, GIF or PNG. Recommended size 400x400px.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-widest block">Full Name</label>
                        <input 
                          type="text" 
                          value={localProfile.name} 
                          onChange={(e) => setLocalProfile({...localProfile, name: e.target.value})}
                          className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-widest block">Email Address</label>
                        <input 
                          type="email" 
                          value={localProfile.email} 
                          onChange={(e) => setLocalProfile({...localProfile, email: e.target.value})}
                          className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-widest block">Job Title</label>
                        <input 
                          type="text" 
                          value={localProfile.jobTitle} 
                          onChange={(e) => setLocalProfile({...localProfile, jobTitle: e.target.value})}
                          className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-muted-foreground uppercase tracking-widest block">Timezone</label>
                        <select 
                          value={localProfile.timezone}
                          onChange={(e) => setLocalProfile({...localProfile, timezone: e.target.value})}
                          className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
                        >
                            <option>Pacific Time (PT)</option>
                            <option>Eastern Time (ET)</option>
                            <option>Greenwich Mean Time (GMT)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="p-6 bg-muted/20 border-t border-border flex justify-end">
                <button 
                    onClick={handleSave}
                    className="w-full sm:w-auto bg-primary text-primary-foreground font-bold px-10 py-4 rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95"
                >
                    Save All Changes
                </button>
            </div>
        </div>
    )
}

export default Settings;