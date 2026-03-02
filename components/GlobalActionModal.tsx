import React, { useState } from 'react';
import { Contact } from '../types';

interface GlobalActionModalProps {
  type: string;
  contacts: Contact[];
  onSave: (data: any) => void;
  onClose: () => void;
}

const GlobalActionModal: React.FC<GlobalActionModalProps> = ({ type, contacts, onSave, onClose }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    contactId: '',
    priority: 'Medium',
    dueDate: '',
    category: 'Sales',
    imageUrl: '',
    company: '',
    subject: '',
    body: ''
  });

  const getTitle = () => {
    switch(type) {
      case 'ADD_LEAD': return 'Initialize Deal';
      case 'ADD_CONTACT': return 'New Contact';
      case 'ADD_TASK': return 'Assign Task';
      case 'ADD_PROJECT': return 'Kickoff Project';
      case 'ADD_TEAM': return 'Onboard Team Member';
      case 'ADD_TEMPLATE': return 'Author Template';
      default: return 'Action';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const selectedContact = contacts.find(c => c.id === formData.contactId);
    const dataToSave = {
      ...formData,
      contact: selectedContact || null,
      value: Number(formData.value) || 0,
    };

    setTimeout(() => {
      onSave(dataToSave);
      setIsSaving(false);
      setIsSuccess(true);
      setTimeout(() => onClose(), 1200);
    }, 800);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[100] p-4">
        <div className="bg-card w-full max-w-sm rounded-[3rem] p-12 text-center animate-in zoom-in-95 duration-500 border border-border">
          <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h3 className="text-3xl font-black text-foreground tracking-tighter">Done!</h3>
          <p className="text-muted-foreground mt-2 font-bold uppercase tracking-widest text-[10px]">Registry updated successfully</p>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-background border border-border/60 rounded-2xl px-5 py-4 text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/50";
  const labelClass = "text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1 mb-2 block";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-card w-full max-w-lg rounded-[3rem] shadow-[0_32px_128px_rgba(0,0,0,0.3)] overflow-hidden border border-border/50 animate-in fade-in slide-in-from-bottom-10 duration-500">
        <div className="p-8 md:p-10 border-b border-border bg-primary/5 flex justify-between items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-foreground tracking-tighter">{getTitle()}</h2>
            <p className="text-xs text-muted-foreground font-bold mt-1 uppercase tracking-wider">Global Workspace Action</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl transition-all text-muted-foreground hover:shadow-lg active:scale-90">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6 max-h-[70vh] overflow-y-auto scrollbar-thin">
          <div className="space-y-6">
            <div className="space-y-1">
                <label className={labelClass}>{type === 'ADD_TEMPLATE' ? 'Template Name' : 'Main Title / Name'}</label>
                <input 
                  required 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  type="text" placeholder="e.g. Q4 Outreach / Project Kickoff" className={inputClass} 
                />
            </div>

            {type === 'ADD_TEMPLATE' && (
                <>
                    <div className="space-y-1">
                        <label className={labelClass}>Email Subject</label>
                        <input 
                          required 
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          type="text" placeholder="e.g. Transforming your business..." className={inputClass} 
                        />
                    </div>
                    <div className="space-y-1">
                        <label className={labelClass}>Classification</label>
                        <select 
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                            className={inputClass}
                        >
                            <option value="Sales">Sales</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Support">Support</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className={labelClass}>Template Content</label>
                        <textarea 
                          required 
                          value={formData.body}
                          onChange={(e) => setFormData({...formData, body: e.target.value})}
                          rows={6}
                          placeholder="Author your professional template here..." className={`${inputClass} resize-none h-40 font-medium leading-relaxed`} 
                        />
                    </div>
                </>
            )}

            {type !== 'ADD_TEMPLATE' && (
                <div className="space-y-1">
                    <label className={labelClass}>Image URL / Profile Picture</label>
                    <input 
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    type="url" placeholder="https://images.unsplash.com/..." className={inputClass} 
                    />
                </div>
            )}

            {(type === 'ADD_LEAD' || type === 'ADD_CONTACT') && (
               <div className="space-y-1">
                  <label className={labelClass}>Company Identity</label>
                  <input 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    type="text" placeholder="e.g. Stark Industries" className={inputClass} 
                  />
              </div>
            )}

            {(type === 'ADD_LEAD' || type === 'ADD_TASK' || type === 'ADD_PROJECT') && (
              <div className="space-y-1">
                  <label className={labelClass}>Link to Member / Contact</label>
                  <select 
                    value={formData.contactId}
                    onChange={(e) => setFormData({...formData, contactId: e.target.value})}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="">Choose established contact...</option>
                    {contacts.map(c => <option key={c.id} value={c.id}>{c.name} ({c.company})</option>)}
                  </select>
              </div>
            )}

            {(type === 'ADD_LEAD' || type === 'CREATE_PROPOSAL') && (
              <div className="space-y-1">
                <label className={labelClass}>Expected Valuation ($)</label>
                <input 
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                  type="number" placeholder="Enter transaction value..." className={inputClass} 
                />
              </div>
            )}
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <button type="button" onClick={onClose} className="w-full sm:w-1/3 px-6 py-4 text-xs font-black text-muted-foreground hover:bg-muted rounded-2xl transition-all uppercase tracking-widest">
                Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSaving}
              className="w-full sm:w-2/3 bg-primary text-primary-foreground font-black px-6 py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 active:scale-95 flex items-center justify-center uppercase tracking-widest text-xs"
            >
              {isSaving ? 'Processing...' : 'Save Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GlobalActionModal;