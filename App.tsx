import React, { useState, useEffect } from 'react';
import { ViewType, Deal, Contact, Task, Project, EmailTemplate, Proposal, DealStage, LeadScore } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Deals from './components/Deals';
import People from './components/People';
import Companies from './components/Companies';
import Projects from './components/Projects';
import Schedule from './components/Schedule';
import Settings from './components/Settings';
import Tasks from './components/Tasks';
import Templates from './components/Templates';
import Proposals from './components/Proposals';
import AILab from './components/AILab';
import GlobalActionModal from './components/GlobalActionModal';
import Auth from './components/Auth';
import AITemplateGenerator from './components/AITemplateGenerator';

// API Service Mock (To be replaced with actual fetch/axios calls)
const api = {
  fetchDashboard: async () => {
    // Simulated GET /api/dashboard/stats
    const { deals, tasks, projects } = await import('./data/dummyData');
    return { deals, tasks, projects };
  },
  fetchContacts: async () => {
    const { contacts } = await import('./data/dummyData');
    return contacts;
  },
  fetchTemplates: async () => {
    const { emailTemplates } = await import('./data/dummyData');
    return emailTemplates;
  },
  fetchProposals: async () => {
    const { proposals } = await import('./data/dummyData');
    return proposals;
  }
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [isAIGeneratingTemplate, setIsAIGeneratingTemplate] = useState(false);

  // Unified Data State
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  
  const [profile, setProfile] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@connect-crm.com',
    role: 'Admin',
    jobTitle: 'Senior CRM Manager',
    avatarUrl: 'https://i.pravatar.cc/80?u=user-alex',
    timezone: 'Pacific Time (PT)'
  });

  // Effect: Initial Data Hydration
  useEffect(() => {
    if (isAuthenticated) {
      const loadData = async () => {
        setIsLoading(true);
        try {
          const [dashboardData, contactsData, templateData, proposalData] = await Promise.all([
            api.fetchDashboard(),
            api.fetchContacts(),
            api.fetchTemplates(),
            api.fetchProposals()
          ]);
          
          setDeals(dashboardData.deals);
          setTasks(dashboardData.tasks);
          setProjects(dashboardData.projects);
          setContacts(contactsData);
          setTemplates(templateData);
          setProposals(proposalData);
        } catch (error) {
          console.error("API Fetch Error:", error);
        } finally {
          setIsLoading(false);
        }
      };
      loadData();
    }
  }, [isAuthenticated]);

  const handleSignIn = (userData: any) => {
    setIsAuthenticated(true);
  };

  const handleDataAdd = (type: string, data: any) => {
    const avatarUrl = data.imageUrl || `https://i.pravatar.cc/40?u=${Date.now()}`;
    
    // Optimistic Update + API Call Placeholder
    switch (type) {
      case 'ADD_LEAD':
        const newDeal: Deal = {
          id: `d${Date.now()}`,
          title: data.title,
          contact: data.contact || { id: 'new', name: 'Draft', company: data.company || 'TBD', email: '', phone: '', avatarUrl },
          value: data.value,
          stage: DealStage.Prospect,
          closeProbability: 30,
          aiLeadScore: data.value > 15000 ? LeadScore.Hot : LeadScore.Warm
        };
        setDeals(prev => [newDeal, ...prev]);
        break;
      case 'ADD_CONTACT':
        const newContact: Contact = {
          id: `c${Date.now()}`,
          name: data.title,
          company: data.company || 'Private',
          email: `${data.title.toLowerCase().replace(' ', '.')}@example.com`,
          phone: '555-0199',
          avatarUrl
        };
        setContacts(prev => [newContact, ...prev]);
        break;
      case 'ADD_TASK':
        const newTask: Task = {
          id: `t${Date.now()}`,
          title: data.title,
          isCompleted: false,
          dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
          priority: data.priority || 'Medium',
          linkedTo: data.contact?.company || 'General'
        };
        setTasks(prev => [newTask, ...prev]);
        break;
      case 'ADD_TEMPLATE':
        const newTemplate: EmailTemplate = {
          id: `et${Date.now()}`,
          name: data.title,
          subject: data.subject || 'Follow up',
          body: data.body || '',
          category: (data.category as any) || 'Sales'
        };
        setTemplates(prev => [newTemplate, ...prev]);
        break;
    }
  };

  const toggleTask = (id: string) => {
    // PATCH /api/tasks/{id}/toggle
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  if (!isAuthenticated) {
    return <Auth onSignIn={handleSignIn} />;
  }

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Synchronizing Workspace...</p>
        </div>
      );
    }

    const commonProps = { 
      onAction: (type: string) => {
        if (type === 'AI_GENERATE_TEMPLATE') setIsAIGeneratingTemplate(true);
        else setActiveAction(type);
      },
      onNavigate: (view: ViewType) => setActiveView(view)
    };
    
    switch (activeView) {
      case 'dashboard':
        return <Dashboard {...commonProps} deals={deals} tasks={tasks} projects={projects} />;
      case 'leads':
        return <Deals {...commonProps} deals={deals} setDeals={setDeals} />;
      case 'companies':
        return <Companies {...commonProps} contacts={contacts} deals={deals} />;
      case 'people':
        return <People {...commonProps} contacts={contacts} />;
      case 'projects':
         return <Projects {...commonProps} projects={projects} />;
      case 'schedule':
        return <Schedule {...commonProps} tasks={tasks} />;
      case 'tasks':
        return <Tasks {...commonProps} tasks={tasks} onToggleTask={toggleTask} />;
      case 'templates':
        return <Templates {...commonProps} templates={templates} contacts={contacts} />;
      case 'proposals':
        return <Proposals {...commonProps} proposals={proposals} />;
      case 'ai-lab':
        return <AILab {...commonProps} deals={deals} tasks={tasks} />;
      case 'settings':
        return <Settings {...commonProps} profile={profile} onUpdateProfile={(d:any) => setProfile(prev => ({...prev, ...d}))} />;
      default:
        return <Dashboard {...commonProps} deals={deals} tasks={tasks} projects={projects} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden text-foreground">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        activeView={activeView} 
        setActiveView={(view) => { setActiveView(view); setIsSidebarOpen(false); }} 
        isOpen={isSidebarOpen}
      />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} profile={profile} onProfileClick={() => setActiveView('settings')} />
        <main className="flex-1 overflow-y-auto bg-secondary/30 scroll-smooth">
          <div className="mx-auto w-full max-w-[1600px] p-4 md:p-8 lg:p-10 animate-in fade-in duration-500">
            {renderView()}
          </div>
        </main>
      </div>

      {activeAction && (
        <GlobalActionModal 
          type={activeAction} 
          contacts={contacts}
          onSave={(data) => handleDataAdd(activeAction, data)}
          onClose={() => setActiveAction(null)} 
        />
      )}

      {isAIGeneratingTemplate && (
        <AITemplateGenerator 
          onSave={(data) => {
            handleDataAdd('ADD_TEMPLATE', data);
            setIsAIGeneratingTemplate(false);
          }}
          onClose={() => setIsAIGeneratingTemplate(false)}
        />
      )}
    </div>
  );
};

export default App;