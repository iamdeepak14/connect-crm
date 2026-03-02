import React, { useState } from 'react';
import { Project, ProjectStatus } from '../types';
import { MoreHorizontalIcon } from './icons/MoreHorizontalIcon';

interface ProjectsProps {
    onAction: (type: string) => void;
    projects: Project[];
}

const statusColors: Record<ProjectStatus, string> = {
    [ProjectStatus.InProgress]: 'bg-primary text-primary-foreground',
    [ProjectStatus.Completed]: 'bg-emerald-500 text-white',
    [ProjectStatus.OnHold]: 'bg-amber-500 text-white',
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="bg-card rounded-2xl border border-border p-6 flex flex-col shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="font-black text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-0.5">{project.client?.company || 'General'}</p>
                </div>
                <button className="text-muted-foreground hover:text-foreground p-1.5 rounded-xl hover:bg-muted transition-colors">
                    <MoreHorizontalIcon className="w-5 h-5" />
                </button>
            </div>
            
            <div className="flex-grow space-y-6">
                <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${statusColors[project.status] || 'bg-muted'}`}>
                        {project.status}
                    </span>
                    <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">Update: {project.lastUpdate}</span>
                </div>

                <div>
                    <div className="flex justify-between mb-2 items-end">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Overall Progress</span>
                        <span className="text-sm font-black text-foreground">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full shadow-[0_0_8px_rgba(var(--primary-rgb),0.3)]" style={{ width: `${project.progress}%` }}></div>
                    </div>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 flex justify-between items-center">
                <div className="flex items-center">
                    {(project.team || []).map((member, index) => (
                        <img 
                            key={member.id} 
                            src={member.avatarUrl} 
                            alt={member.name} 
                            className={`w-8 h-8 rounded-full border-2 border-card shadow-sm ${index > 0 ? '-ml-2.5' : ''}`}
                            title={member.name}
                        />
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center -ml-2.5 shadow-sm">
                        <span className="text-[10px] font-black text-muted-foreground">+</span>
                    </div>
                </div>
                {project.client && (
                    <div className="flex items-center space-x-2.5 bg-muted/40 px-3 py-1.5 rounded-xl">
                        <img src={project.client.avatarUrl} alt={project.client.name} className="w-5 h-5 rounded-full" />
                        <span className="text-xs font-bold text-foreground/80">{project.client.name.split(' ')[0]}</span>
                    </div>
                )}
            </div>
        </div>
    );
};


const Projects: React.FC<ProjectsProps> = ({ onAction, projects }) => {
  const [filter, setFilter] = useState<ProjectStatus | 'all'>('all');

  const filteredProjects = projects.filter(p => filter === 'all' || p.status === filter);

  const tabs: {label: string, value: ProjectStatus | 'all'}[] = [
      { label: 'All Projects', value: 'all' },
      { label: 'In Progress', value: ProjectStatus.InProgress },
      { label: 'Completed', value: ProjectStatus.Completed },
      { label: 'On Hold', value: ProjectStatus.OnHold },
  ]

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Oversee all your active and completed business operations.</p>
        </div>
        <button 
            onClick={() => onAction('ADD_PROJECT')}
            className="w-full sm:w-auto bg-primary text-primary-foreground font-black px-6 py-3.5 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95"
        >
          Add New Project
        </button>
      </div>

      <div className="bg-card/50 p-1.5 rounded-2xl border border-border inline-flex flex-wrap gap-1">
        {tabs.map(tab => (
            <button 
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                    filter === tab.value
                    ? 'bg-card text-primary shadow-sm ring-1 ring-border'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
            >
                {tab.label}
            </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-20 text-center bg-card rounded-[2rem] border border-dashed border-border text-muted-foreground font-bold">
             No projects found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;