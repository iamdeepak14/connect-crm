import { Contact, Deal, Task, Meeting, DealStage, LeadScore, AIAction, TeamMember, Project, ProjectStatus, EmailTemplate, Proposal } from '../types';

export const contacts: Contact[] = [
  { id: 'c1', name: 'Elena Rodriguez', company: 'Innovate Inc.', email: 'elena@innovate.com', phone: '555-0101', avatarUrl: 'https://i.pravatar.cc/40?u=c1' },
  { id: 'c2', name: 'Marcus Chen', company: 'Quantum Solutions', email: 'marcus@quantum.com', phone: '555-0102', avatarUrl: 'https://i.pravatar.cc/40?u=c2' },
  { id: 'c3', name: 'Aisha Khan', company: 'NextGen AI', email: 'aisha@nextgen.com', phone: '555-0103', avatarUrl: 'https://i.pravatar.cc/40?u=c3' },
  { id: 'c4', name: 'Liam O\'Connell', company: 'Starlight Creative', email: 'liam@starlight.com', phone: '555-0104', avatarUrl: 'https://i.pravatar.cc/40?u=c4' },
  { id: 'c5', name: 'Sophia Dubois', company: 'Innovate Inc.', email: 'sophia@innovate.com', phone: '555-0105', avatarUrl: 'https://i.pravatar.cc/40?u=c5' },
];

export const teamMembers: TeamMember[] = [
    { id: 'tm1', name: 'Anna Miller', role: 'Project Manager', avatarUrl: 'https://i.pravatar.cc/80?u=tm1' },
    { id: 'tm2', name: 'John Smith', role: 'Lead Developer', avatarUrl: 'https://i.pravatar.cc/80?u=tm2' },
    { id: 'tm3', name: 'Sarah Chen', role: 'UX Designer', avatarUrl: 'https://i.pravatar.cc/80?u=tm3' },
];

export const deals: Deal[] = [
  { id: 'd1', title: 'Website Redesign Project', contact: contacts[0], value: 12000, stage: DealStage.Proposal, closeProbability: 75, aiLeadScore: LeadScore.Hot },
  { id: 'd2', title: 'Mobile App Development', contact: contacts[1], value: 25000, stage: DealStage.Negotiation, closeProbability: 60, aiLeadScore: LeadScore.Hot },
  { id: 'd3', title: 'Q3 Marketing Campaign', contact: contacts[2], value: 8500, stage: DealStage.Prospect, closeProbability: 30, aiLeadScore: LeadScore.Warm },
  { id: 'd4', title: 'Logo & Branding Package', contact: contacts[3], value: 5000, stage: DealStage.Prospect, closeProbability: 40, aiLeadScore: LeadScore.Warm },
  { id: 'd5', title: 'SEO & Content Strategy', contact: contacts[0], value: 7200, stage: DealStage.Proposal, closeProbability: 65, aiLeadScore: LeadScore.Warm },
  { id: 'd6', title: 'E-commerce Platform Integration', contact: contacts[1], value: 18000, stage: DealStage.Won, closeProbability: 100, aiLeadScore: LeadScore.Hot },
  { id: 'd7', title: 'Cloud Infrastructure Audit', contact: contacts[2], value: 9500, stage: DealStage.Lost, closeProbability: 0, aiLeadScore: LeadScore.Cold },
];

export const tasks: Task[] = [
  { id: 't1', title: 'Follow up with Innovate Inc.', dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), isCompleted: false, priority: 'High', linkedTo: 'Innovate Inc.' },
  { id: 't2', title: 'Prepare proposal for NextGen AI', dueDate: new Date(new Date().setDate(new Date().getDate() + 2)), isCompleted: false, priority: 'Medium', linkedTo: 'NextGen AI' },
  { id: 't3', title: 'Send invoice for E-commerce project', dueDate: new Date(), isCompleted: true, priority: 'High', linkedTo: 'Quantum Solutions' },
  { id: 't4', title: 'Schedule negotiation call with Quantum', dueDate: new Date(new Date().setDate(new Date().getDate() + 3)), isCompleted: false, priority: 'High', linkedTo: 'Quantum Solutions' },
];

export const meetings: Meeting[] = [
    { id: 'm1', title: 'Project Kick-off with Innovate Inc.', participants: [contacts[0]], startTime: new Date(new Date().setHours(10, 0, 0, 0)), endTime: new Date(new Date().setHours(11, 0, 0, 0))},
    { id: 'm2', title: 'Deal Negotiation with Quantum', participants: [contacts[1]], startTime: new Date(new Date().setDate(new Date().getDate() + 1) + new Date().setHours(14, 0, 0, 0)), endTime: new Date(new Date().setDate(new Date().getDate() + 1) + new Date().setHours(15, 30, 0, 0))},
];

export const aiActions: AIAction[] = [
    { id: 'ai1', description: "It's been 3 days since you sent the proposal to Innovate Inc. Draft a follow-up email?", actionLabel: 'Draft Email' },
    { id: 'ai2', description: "Lead score for 'Q3 Marketing Campaign' is Warm. Nurture this lead by sending a case study.", actionLabel: 'Find Case Study' },
    { id: 'ai3', description: "Your negotiation with Quantum Solutions is tomorrow. Prepare key talking points.", actionLabel: 'Prep Talking Points' },
];

export const projects: Project[] = [
    { id: 'p1', title: 'Innovate Inc. Website V2', client: contacts[0], status: ProjectStatus.InProgress, progress: 75, team: [teamMembers[0], teamMembers[2]], lastUpdate: '2 hours ago' },
    { id: 'p2', title: 'Quantum Mobile App', client: contacts[1], status: ProjectStatus.InProgress, progress: 40, team: [teamMembers[0], teamMembers[1]], lastUpdate: '1 day ago' },
    { id: 'p3', title: 'Starlight Branding Guide', client: contacts[3], status: ProjectStatus.Completed, progress: 100, team: [teamMembers[2]], lastUpdate: '1 week ago' },
    { id: 'p4', title: 'NextGen AI Content Audit', client: contacts[2], status: ProjectStatus.OnHold, progress: 20, team: [teamMembers[0]], lastUpdate: '3 days ago' },
];

export const emailTemplates: EmailTemplate[] = [
    { id: 'et1', name: 'Cold Outreach', subject: 'Transforming your business with AI', body: 'Hi [Name], I noticed your work at [Company] and wanted to...', category: 'Sales' },
    { id: 'et2', name: 'Proposal Follow-up', subject: 'Following up on our proposal', body: 'Hi [Name], it was great talking to you. Any thoughts on the...', category: 'Follow-up' },
    { id: 'et3', name: 'Client Onboarding', subject: 'Welcome to the team!', body: 'Hi [Name], we are thrilled to have you onboard. Here are the...', category: 'Support' },
];

export const proposals: Proposal[] = [
    { id: 'pr1', title: 'Digital Transformation Phase 1', clientName: 'Innovate Inc.', value: 45000, status: 'Draft', date: 'Oct 12, 2024' },
    { id: 'pr2', title: 'Cloud Infrastructure Migration', clientName: 'Quantum Solutions', value: 82000, status: 'Sent', date: 'Oct 10, 2024' },
    { id: 'pr3', title: 'Brand Identity Revamp', clientName: 'Starlight Creative', value: 12500, status: 'Signed', date: 'Sep 28, 2024' },
];