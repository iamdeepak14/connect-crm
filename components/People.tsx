
import React from 'react';
import { Contact } from '../types';
import { MoreHorizontalIcon } from './icons/MoreHorizontalIcon';
import { PlusIcon } from './icons/PlusIcon';

interface PeopleProps {
    onAction: (type: string) => void;
    // Added contacts prop
    contacts: Contact[];
}

const People: React.FC<PeopleProps> = ({ onAction, contacts }) => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">People</h1>
          <p className="text-muted-foreground mt-1">Manage your contacts and connections.</p>
        </div>
        <button 
            onClick={() => onAction('ADD_CONTACT')}
            className="w-full sm:w-auto bg-primary text-primary-foreground font-black px-6 py-3.5 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center active:scale-95"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Contact
        </button>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {contacts.map((contact) => (
          <div key={contact.id} className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center justify-between group">
            <div className="flex items-center space-x-4">
              <img src={contact.avatarUrl} alt={contact.name} className="w-12 h-12 rounded-2xl ring-4 ring-primary/5 object-cover" />
              <div>
                <p className="font-black text-foreground">{contact.name}</p>
                <p className="text-xs text-muted-foreground font-bold">{contact.company}</p>
                <p className="text-xs text-primary font-black mt-1 uppercase tracking-wider">{contact.email}</p>
              </div>
            </div>
            <button className="text-muted-foreground p-2 hover:bg-muted rounded-xl transition-colors">
              <MoreHorizontalIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-card rounded-[2rem] border border-border overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/30">
            <tr>
              <th className="p-5 font-black text-left text-muted-foreground uppercase tracking-widest text-[10px]">Name</th>
              <th className="p-5 font-black text-left text-muted-foreground uppercase tracking-widest text-[10px]">Email</th>
              <th className="p-5 font-black text-left text-muted-foreground uppercase tracking-widest text-[10px]">Phone</th>
              <th className="p-5 font-black text-left text-muted-foreground uppercase tracking-widest text-[10px]">Company</th>
              <th className="p-5 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-muted/20 transition-colors group">
                <td className="p-5">
                  <div className="flex items-center">
                    <img src={contact.avatarUrl} alt={contact.name} className="w-9 h-9 rounded-xl mr-4 ring-4 ring-primary/5 object-cover" />
                    <span className="font-black text-foreground group-hover:text-primary transition-colors">{contact.name}</span>
                  </div>
                </td>
                <td className="p-5 text-muted-foreground font-bold">{contact.email}</td>
                <td className="p-5 text-muted-foreground font-bold">{contact.phone}</td>
                <td className="p-5">
                   <span className="bg-secondary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-foreground/80 border border-border">
                     {contact.company}
                   </span>
                </td>
                <td className="p-5 text-right">
                  <button className="text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-muted transition-all">
                    <MoreHorizontalIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default People;
