export enum DealStage {
  Prospect = 'Prospect',
  Proposal = 'Proposal',
  Negotiation = 'Negotiation',
  Won = 'Won',
  Lost = 'Lost',
}

export enum LeadScore {
  Hot = 'Hot',
  Warm = 'Warm',
  Cold = 'Cold',
}

export enum ProjectStatus {
    InProgress = 'In Progress',
    Completed = 'Completed',
    OnHold = 'On Hold',
}

export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  avatarUrl: string;
}

export interface Deal {
  id: string;
  title: string;
  contact: Contact;
  value: number;
  stage: DealStage;
  closeProbability: number; // AI-generated
  aiLeadScore: LeadScore;
}

export interface Task {
  id: string;
  title: string;
  dueDate: Date;
  isCompleted: boolean;
  priority: 'High' | 'Medium' | 'Low';
  linkedTo?: Deal | Contact | string;
}

export interface Meeting {
  id:string;
  title: string;
  participants: Contact[];
  startTime: Date;
  endTime: Date;
}

export interface AIAction {
    id: string;
    description: string;
    actionLabel: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export interface Project {
    id: string;
    title: string;
    client: Contact;
    status: ProjectStatus;
    progress: number; // Percentage
    team: TeamMember[];
    lastUpdate: string;
}

export interface EmailTemplate {
    id: string;
    name: string;
    subject: string;
    body: string;
    category: 'Sales' | 'Support' | 'Follow-up';
}

export interface Proposal {
    id: string;
    title: string;
    clientName: string;
    value: number;
    status: 'Draft' | 'Sent' | 'Signed' | 'Declined';
    date: string;
}


export type ViewType = 'dashboard' | 'leads' | 'people' | 'companies' | 'projects' | 'schedule' | 'settings' | 'tasks' | 'templates' | 'proposals' | 'ai-lab';