
import React from 'react';
import { Proposal } from '../types';
import { PlusIcon } from './icons/PlusIcon';

interface ProposalsProps {
    onAction: (type: string) => void;
    // Added proposals prop
    proposals: Proposal[];
}

const Proposals: React.FC<ProposalsProps> = ({ onAction, proposals }) => {
    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight">Proposals</h1>
                    <p className="text-muted-foreground mt-1">Track and manage your business documents.</p>
                </div>
                <button 
                    onClick={() => onAction('CREATE_PROPOSAL')}
                    className="w-full sm:w-auto bg-primary text-primary-foreground font-black px-6 py-3.5 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center active:scale-95"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Create Proposal
                </button>
            </div>

            <div className="bg-card rounded-[2.5rem] border border-border overflow-hidden shadow-sm">
                 <div className="hidden md:block">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/30">
                            <tr>
                                <th className="p-6 font-black text-left text-muted-foreground uppercase tracking-widest text-[10px]">Title</th>
                                <th className="p-6 font-black text-left text-muted-foreground uppercase tracking-widest text-[10px]">Client</th>
                                <th className="p-6 font-black text-left text-muted-foreground uppercase tracking-widest text-[10px]">Status</th>
                                <th className="p-6 font-black text-left text-muted-foreground uppercase tracking-widest text-[10px]">Value</th>
                                <th className="p-6 font-black text-left text-muted-foreground uppercase tracking-widest text-[10px]">Date</th>
                                <th className="p-6 w-12"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {/* Fixed: Use proposals from props instead of dummyData */}
                            {proposals.map(proposal => (
                                <tr key={proposal.id} className="hover:bg-muted/10 transition-colors group">
                                    <td className="p-6 font-black text-foreground group-hover:text-primary transition-colors">{proposal.title}</td>
                                    <td className="p-6 text-muted-foreground font-bold">{proposal.clientName}</td>
                                    <td className="p-6">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-2 h-2 rounded-full ${
                                                proposal.status === 'Signed' ? 'bg-emerald-500' :
                                                proposal.status === 'Sent' ? 'bg-primary' : 'bg-muted-foreground'
                                            }`}></div>
                                            <span className="font-black uppercase text-[10px] tracking-widest">{proposal.status}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 font-black text-foreground">${proposal.value.toLocaleString()}</td>
                                    <td className="p-6 text-muted-foreground font-bold">{proposal.date}</td>
                                    <td className="p-6 text-right">
                                        <button className="text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-muted transition-all">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Grid */}
                <div className="md:hidden divide-y divide-border/50">
                    {proposals.map(proposal => (
                        <div key={proposal.id} className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-black text-foreground">{proposal.title}</h4>
                                    <p className="text-xs text-muted-foreground font-bold">{proposal.clientName}</p>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                    proposal.status === 'Signed' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-primary/10 text-primary'
                                }`}>
                                    {proposal.status}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="font-black text-primary">${proposal.value.toLocaleString()}</span>
                                <span className="text-[10px] text-muted-foreground font-bold">{proposal.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Proposals;
