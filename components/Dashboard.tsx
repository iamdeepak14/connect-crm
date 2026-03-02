import React from 'react';
import KPI from './KPI';
import { StatisticsChart } from './StatisticsChart';
import { GoogleIcon, SlackIcon, ExcelIcon, AtlassianIcon, MicrosoftIcon, GoogleDriveIcon } from './icons/AppIcons';
import { Deal, Task, Project, DealStage, ViewType } from '../types';
import { RocketIcon } from './icons/RocketIcon';

const AppIcon: React.FC<{ children: React.ReactNode, position: string }> = ({ children, position }) => (
    <div className={`absolute ${position} bg-card p-2 sm:p-2.5 rounded-xl shadow-xl border border-border transition-transform hover:scale-110 duration-300`}>
        {children}
    </div>
);

const FeatureOption: React.FC<{ 
    title: string; 
    icon: React.ReactNode; 
    color: string; 
    onClick: () => void;
    description: string;
}> = ({ title, icon, color, onClick, description }) => (
    <button 
        onClick={onClick}
        className="group flex flex-col items-start p-6 bg-card border border-border rounded-2xl hover:border-black hover:shadow-xl hover:shadow-black/5 transition-all text-left relative overflow-hidden active:scale-[0.98]"
    >
        <div className={`p-4 rounded-xl mb-4 transition-transform group-hover:scale-110 ${color}`}>
            {icon}
        </div>
        <h3 className="text-sm font-black text-foreground mb-1 tracking-tight">{title}</h3>
        <p className="text-[10px] text-muted-foreground font-medium leading-relaxed uppercase tracking-wider">{description}</p>
        <div className="absolute top-0 right-0 w-24 h-24 bg-black/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-black/10 transition-colors"></div>
    </button>
);

interface DashboardProps {
    onAction: (type: string) => void;
    onNavigate: (view: ViewType) => void;
    deals: Deal[];
    tasks: Task[];
    projects: Project[];
}

const Dashboard: React.FC<DashboardProps> = ({ onAction, onNavigate, deals, tasks, projects }) => {
    const totalWonSales = deals.filter(d => d.stage === DealStage.Won).reduce((acc, d) => acc + d.value, 0);
    const activeLeadsCount = deals.filter(d => d.stage !== DealStage.Won && d.stage !== DealStage.Lost).length;
    const tasksPendingCount = tasks.filter(t => !t.isCompleted).length;

    return (
        <div className="flex flex-col xl:grid xl:grid-cols-3 gap-8 pb-10">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-10 order-2 xl:order-1">
                <div className="text-center sm:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground mb-4 leading-[1.05] tracking-tighter uppercase italic">
                        Minimalize &<br className="hidden sm:block"/>Scale Now
                    </h1>
                    <p className="text-muted-foreground text-base md:text-xl max-w-2xl mb-8 leading-relaxed mx-auto sm:mx-0 font-medium">
                        Sophisticated simplicity for enterprise teams. Tracking performance and deals with absolute precision.
                    </p>
                    <button 
                        onClick={() => onAction('ADD_PROJECT')}
                        className="w-full sm:w-auto bg-black text-white font-black px-10 py-5 rounded-lg hover:bg-black/90 transition-all shadow-2xl shadow-black/20 text-base active:scale-95 uppercase tracking-widest"
                    >
                        Initialize project
                    </button>
                </div>

                {/* KPI BOXES: SALES, LEADS, TASKS */}
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    <div onClick={() => onNavigate('companies')} className="cursor-pointer group">
                        <KPI 
                            title="Capital" 
                            value={`$${(totalWonSales / 1000).toFixed(1)}k`} 
                            lastMonthValue={45} 
                            percentageChange={12} 
                        />
                    </div>
                    <div onClick={() => onNavigate('leads')} className="cursor-pointer group">
                        <KPI 
                            title="Volume" 
                            value={activeLeadsCount.toString()} 
                            lastMonthValue={70} 
                            percentageChange={Math.round(((activeLeadsCount - 70) / 70) * 100)} 
                        />
                    </div>
                    <div onClick={() => onNavigate('tasks')} className="cursor-pointer group">
                        <KPI 
                            title="Backlog" 
                            value={tasksPendingCount.toString()} 
                            lastMonthValue={15} 
                            percentageChange={-5} 
                        />
                    </div>
                </div>

                <div className="bg-card p-8 rounded-3xl border border-border shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-black/5 rounded-full -mr-40 -mt-40 blur-[100px] group-hover:bg-black/10 transition-colors duration-500"></div>
                    <h2 className="text-3xl font-black text-foreground mb-2 relative z-10 tracking-tight uppercase">Infrastructure</h2>
                    <p className="text-muted-foreground mb-8 font-medium">Synced ecosystem components.</p>
                    
                    <div className="relative h-64 sm:h-80 flex items-center justify-center my-8">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-black text-white flex items-center justify-center rounded-2xl z-10 shadow-2xl transition-all duration-700 cursor-pointer">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M4 12H20" stroke="currentColor" strokeWidth="2"/>
                                <path d="M12 4V20" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                        </div>
                        <div className="absolute w-full h-full inset-0 pointer-events-none opacity-20">
                            <svg width="100%" height="100%" className="text-black">
                                <line x1="50%" y1="50%" x2="20%" y2="20%" stroke="currentColor" strokeWidth="1" strokeDasharray="8"/>
                                <line x1="50%" y1="50%" x2="80%" y2="20%" stroke="currentColor" strokeWidth="1" strokeDasharray="8"/>
                                <line x1="50%" y1="50%" x2="10%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="8"/>
                                <line x1="50%" y1="50%" x2="90%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="8"/>
                            </svg>
                        </div>
                        <AppIcon position="top-0 left-1/4"><ExcelIcon className="w-6 h-6 sm:w-8 sm:h-8 grayscale" /></AppIcon>
                        <AppIcon position="top-0 right-1/4"><AtlassianIcon className="w-6 h-6 sm:w-8 sm:h-8 grayscale" /></AppIcon>
                        <AppIcon position="bottom-0 left-1/4"><GoogleIcon className="w-6 h-6 sm:w-8 sm:h-8 grayscale" /></AppIcon>
                        <AppIcon position="bottom-0 right-1/4"><MicrosoftIcon className="w-6 h-6 sm:w-8 sm:h-8 grayscale" /></AppIcon>
                        <AppIcon position="top-1/2 -translate-y-1/2 left-0"><GoogleDriveIcon className="w-6 h-6 sm:w-8 sm:h-8 grayscale" /></AppIcon>
                        <AppIcon position="top-1/2 -translate-y-1/2 right-0"><SlackIcon className="w-6 h-6 sm:w-8 sm:h-8 grayscale" /></AppIcon>
                    </div>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8 order-1 xl:order-2">
                <div className="bg-card p-10 rounded-3xl border border-border shadow-sm">
                    <div className="mb-10">
                        <h2 className="text-2xl font-black text-foreground tracking-tight uppercase">Module Suite</h2>
                        <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mt-1">Workspace tools</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FeatureOption 
                            title="Logic" 
                            description="AI Lab"
                            color="bg-secondary text-black"
                            icon={<RocketIcon className="w-6 h-6" />}
                            onClick={() => onNavigate('ai-lab')}
                        />
                        <FeatureOption 
                            title="Drafts" 
                            description="Mailers"
                            color="bg-secondary text-black"
                            icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13"></path><path d="M22 2L15 22L11 13L2 9L22 2Z"></path></svg>}
                            onClick={() => onNavigate('templates')}
                        />
                        <FeatureOption 
                            title="Legal" 
                            description="Vault"
                            color="bg-secondary text-black"
                            icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>}
                            onClick={() => onNavigate('proposals')}
                        />
                        <FeatureOption 
                            title="Ops" 
                            description="Safety"
                            color="bg-secondary text-black"
                            icon={<svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}
                            onClick={() => onNavigate('settings')}
                        />
                    </div>
                </div>

                <div className="bg-card p-6 sm:p-10 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h2 className="text-2xl font-black text-foreground tracking-tight uppercase">Metrics</h2>
                            <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mt-1">Real-time status</p>
                        </div>
                        <div className="bg-black text-white text-[10px] font-black px-4 py-2 rounded-full shadow-lg">ACTIVE</div>
                    </div>
                    <StatisticsChart deals={deals} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;