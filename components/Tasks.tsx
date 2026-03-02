import React from 'react';
import { Task } from '../types';
import { PlusIcon } from './icons/PlusIcon';

interface TasksProps {
    tasks: Task[];
    onToggleTask: (id: string) => void;
    onAction: (type: string) => void;
}

const Tasks: React.FC<TasksProps> = ({ tasks, onToggleTask, onAction }) => {
    const getPriorityColor = (priority: string) => {
        switch(priority) {
            case 'High': return 'text-destructive bg-destructive/10 border-destructive/20';
            case 'Medium': return 'text-amber-600 bg-amber-500/10 border-amber-200';
            case 'Low': return 'text-emerald-600 bg-emerald-500/10 border-emerald-200';
            default: return 'text-muted-foreground bg-muted';
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight">Tasks</h1>
                    <p className="text-muted-foreground mt-1">Manage your day-to-day work items.</p>
                </div>
                <button 
                    onClick={() => onAction('ADD_TASK')}
                    className="w-full sm:w-auto bg-primary text-primary-foreground font-black px-6 py-3.5 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center active:scale-95"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add Task
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Active Tasks</h2>
                    <div className="space-y-3">
                        {tasks.filter(t => !t.isCompleted).map(task => (
                            <div key={task.id} className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between hover:border-primary/20 transition-all group">
                                <div className="flex items-center space-x-4">
                                    <button 
                                        onClick={() => onToggleTask(task.id)}
                                        className="w-6 h-6 rounded-lg border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary/5 transition-colors"
                                    >
                                        <div className="w-3 h-3 rounded-sm bg-primary/0 group-hover:bg-primary/10 transition-colors"></div>
                                    </button>
                                    <div>
                                        <p className="font-black text-foreground group-hover:text-primary transition-colors">{task.title}</p>
                                        <p className="text-xs text-muted-foreground font-bold italic">Link: {typeof task.linkedTo === 'string' ? task.linkedTo : 'Lead'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getPriorityColor(task.priority)}`}>
                                        {task.priority}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] pt-6">Completed</h2>
                    <div className="space-y-3 opacity-60">
                        {tasks.filter(t => t.isCompleted).map(task => (
                            <div key={task.id} className="bg-card p-5 rounded-2xl border border-border flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <button 
                                        onClick={() => onToggleTask(task.id)}
                                        className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center text-white"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </button>
                                    <p className="font-black text-foreground line-through">{task.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tasks;