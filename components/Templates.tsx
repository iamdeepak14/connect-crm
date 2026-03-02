import React, { useState } from 'react';
import { EmailTemplate, Contact } from '../types';
import { PlusIcon } from './icons/PlusIcon';

interface TemplatesProps {
    onAction: (type: string) => void;
    templates: EmailTemplate[];
    contacts: Contact[];
}

const Templates: React.FC<TemplatesProps> = ({ onAction, templates, contacts }) => {
    const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
    const [sendingTo, setSendingTo] = useState<string>('');
    const [isSent, setIsSent] = useState(false);

    const handleSend = () => {
        setIsSent(true);
        setTimeout(() => {
            setIsSent(false);
            setSelectedTemplate(null);
            setSendingTo('');
        }, 1500);
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight">Email Templates</h1>
                    <p className="text-muted-foreground mt-1">Ready-to-use professional communication drafts.</p>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                    <button 
                        onClick={() => onAction('AI_GENERATE_TEMPLATE')}
                        className="w-full sm:w-auto bg-card text-foreground font-black px-6 py-3.5 rounded-2xl hover:bg-muted transition-all border border-border flex items-center justify-center active:scale-95 group"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary group-hover:rotate-12 transition-transform"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
                        AI Generate
                    </button>
                    <button 
                        onClick={() => onAction('ADD_TEMPLATE')}
                        className="w-full sm:w-auto bg-primary text-primary-foreground font-black px-6 py-3.5 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center active:scale-95"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        New Template
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map(template => (
                    <div key={template.id} className="bg-card rounded-[2.5rem] border border-border p-8 shadow-sm flex flex-col hover:border-primary/20 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ${
                                template.category === 'Sales' ? 'bg-emerald-500 text-white' :
                                template.category === 'Follow-up' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                            }`}>
                                {template.category}
                            </span>
                             <button 
                                onClick={() => navigator.clipboard.writeText(template.body)}
                                className="text-muted-foreground hover:text-primary p-2 rounded-xl hover:bg-primary/5 transition-all"
                                title="Copy Content"
                             >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                        </div>
                        <h3 className="text-xl font-black text-foreground mb-2 group-hover:text-primary transition-colors relative z-10">{template.name}</h3>
                        <p className="text-sm font-bold text-muted-foreground mb-6 relative z-10 line-clamp-1 opacity-70">Subject: {template.subject}</p>
                        <div className="flex-1 bg-muted/30 p-5 rounded-[1.5rem] mb-8 relative z-10 border border-border/50">
                            <p className="text-xs text-foreground/80 leading-relaxed line-clamp-4 italic font-medium">"{template.body}"</p>
                        </div>
                        <button 
                            onClick={() => setSelectedTemplate(template)}
                            className="w-full py-4 rounded-2xl border-2 border-primary/10 text-primary text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95 shadow-sm hover:shadow-primary/20"
                        >
                            Deploy Template
                        </button>
                    </div>
                ))}
            </div>

            {/* Template Usage Modal */}
            {selectedTemplate && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
                    <div className="bg-card w-full max-w-xl rounded-[3rem] shadow-2xl border border-border overflow-hidden animate-in zoom-in-95 duration-300">
                        {isSent ? (
                            <div className="p-16 text-center animate-in fade-in zoom-in duration-500">
                                <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/30">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                <h3 className="text-3xl font-black text-foreground tracking-tighter">Communication Sent</h3>
                                <p className="text-muted-foreground mt-2 font-bold uppercase tracking-widest text-[10px]">Registry synchronized successfully</p>
                            </div>
                        ) : (
                            <>
                                <div className="p-8 border-b border-border bg-primary/5 flex justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-black text-foreground tracking-tighter">Compose Communication</h2>
                                        <p className="text-xs text-muted-foreground font-bold mt-1 uppercase tracking-wider">Using: {selectedTemplate.name}</p>
                                    </div>
                                    <button onClick={() => setSelectedTemplate(null)} className="p-2 hover:bg-white rounded-xl transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Recipient</label>
                                        <select 
                                            value={sendingTo}
                                            onChange={(e) => setSendingTo(e.target.value)}
                                            className="w-full bg-background border border-border rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="">Select Target Contact...</option>
                                            {contacts.map(c => <option key={c.id} value={c.email}>{c.name} ({c.company})</option>)}
                                        </select>
                                    </div>
                                    <div className="bg-muted/30 p-6 rounded-3xl border border-border/50">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Message Preview</p>
                                        <div className="space-y-3">
                                            <p className="text-sm font-black text-foreground">Subject: {selectedTemplate.subject}</p>
                                            <p className="text-sm text-foreground/80 leading-relaxed font-medium whitespace-pre-wrap">{selectedTemplate.body}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <button onClick={() => setSelectedTemplate(null)} className="flex-1 py-4 text-xs font-black text-muted-foreground uppercase tracking-widest hover:bg-muted rounded-2xl transition-all">Cancel</button>
                                        <button 
                                            disabled={!sendingTo}
                                            onClick={handleSend}
                                            className="flex-[2] bg-primary text-white font-black py-4 rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale uppercase tracking-widest text-xs"
                                        >
                                            Transmit Message
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Templates;