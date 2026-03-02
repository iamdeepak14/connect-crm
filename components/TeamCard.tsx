import React, { useState } from 'react';
import { TeamMember } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface TeamCardProps {
    members: TeamMember[];
}

export const TeamCard: React.FC<TeamCardProps> = ({ members }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? members.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === members.length - 1 ? 0 : prevIndex + 1));
    };

    const activeMember = members[currentIndex];

    return (
        <div className="bg-card p-10 rounded-[3rem] border border-border shadow-sm animate-in fade-in duration-700">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-2xl font-black text-foreground tracking-tight">Ecosystem Team</h2>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">Personnel management</p>
                </div>
                <div className="flex space-x-3">
                    <button 
                        onClick={() => setViewMode(viewMode === 'slider' ? 'grid' : 'slider')}
                        className="p-2.5 rounded-xl text-primary hover:bg-primary/10 border border-primary/20 transition-all"
                    >
                        {viewMode === 'slider' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                        )}
                    </button>
                    {viewMode === 'slider' && (
                        <div className="flex space-x-1">
                            <button onClick={handlePrev} className="p-2.5 rounded-xl text-muted-foreground hover:bg-muted border border-transparent transition-all"><ChevronLeftIcon className="w-5 h-5" /></button>
                            <button onClick={handleNext} className="p-2.5 rounded-xl text-muted-foreground hover:bg-muted border border-transparent transition-all"><ChevronRightIcon className="w-5 h-5" /></button>
                        </div>
                    )}
                </div>
            </div>

            {viewMode === 'slider' ? (
                <div className="relative pt-4">
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-12 bg-primary/10 rounded-[2rem] blur-2xl"></div>
                    <div className="relative bg-gradient-to-br from-primary to-purple-600 text-primary-foreground p-10 rounded-[2.5rem] text-center shadow-[0_32px_64px_rgba(var(--primary-rgb),0.3)] border border-white/10 group overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                        <img 
                            src={activeMember.avatarUrl} 
                            alt={activeMember.name} 
                            className="w-24 h-24 rounded-3xl mx-auto mb-6 border-4 border-white/20 shadow-2xl object-cover transform group-hover:scale-105 transition-transform duration-700" 
                        />
                        <p className="text-xl font-black tracking-tight">{activeMember.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-6">{activeMember.role}</p>
                        <div className="flex justify-center space-x-6 text-white/70">
                            <svg className="w-6 h-6 hover:text-white transition-colors cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            <svg className="w-6 h-6 hover:text-white transition-colors cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-500">
                    {members.map(member => (
                        <div key={member.id} className="bg-muted/40 p-4 rounded-3xl border border-border flex flex-col items-center text-center group hover:bg-primary/5 transition-all">
                             <img 
                                src={member.avatarUrl} 
                                alt={member.name} 
                                className="w-12 h-12 rounded-xl mb-3 border-2 border-primary/20 object-cover grayscale group-hover:grayscale-0 transition-all" 
                            />
                            <p className="text-xs font-black tracking-tight line-clamp-1">{member.name.split(' ')[0]}</p>
                            <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{member.role.split(' ')[0]}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};