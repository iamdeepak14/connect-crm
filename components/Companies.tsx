import React from 'react';
import { Contact, Deal, DealStage } from '../types';
import { MoreHorizontalIcon } from './icons/MoreHorizontalIcon';
import { PlusIcon } from './icons/PlusIcon';

interface CompaniesProps {
    onAction: (type: string) => void;
    contacts: Contact[];
    deals: Deal[];
}

const Companies: React.FC<CompaniesProps> = ({ onAction, contacts, deals }) => {
    const companiesData = contacts.reduce((acc, contact) => {
        if (!acc[contact.company]) {
            acc[contact.company] = {
                name: contact.company,
                contactsCount: 0,
                openDeals: 0,
                totalValue: 0,
                primaryContactAvatar: contact.avatarUrl
            };
        }
        acc[contact.company].contactsCount++;
        return acc;
    }, {} as Record<string, { name: string; contactsCount: number; openDeals: number; totalValue: number, primaryContactAvatar: string }>);

    deals.forEach(deal => {
        if (companiesData[deal.contact.company] && deal.stage !== DealStage.Won && deal.stage !== DealStage.Lost) {
            companiesData[deal.contact.company].openDeals++;
            companiesData[deal.contact.company].totalValue += deal.value;
        }
    });

    const companyList = Object.values(companiesData);

  return (
    <div className="space-y-10 animate-in slide-in-from-right-10 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black text-foreground tracking-tighter">Deals</h1>
          <p className="text-muted-foreground mt-1 font-medium">Enterprise volume tracking and valuation.</p>
        </div>
        <button 
            onClick={() => onAction('ADD_LEAD')}
            className="w-full sm:w-auto bg-primary text-primary-foreground font-black px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20 flex items-center justify-center active:scale-95 uppercase tracking-widest text-xs"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Deal
        </button>
      </div>

      {/* Mobile Grid */}
      <div className="grid grid-cols-1 gap-6 md:hidden pb-10">
        {companyList.map((company) => (
          <div key={company.name} className="bg-card p-8 rounded-[2.5rem] border border-border shadow-sm hover:shadow-xl transition-all">
             <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center font-black text-primary text-xl shadow-inner overflow-hidden">
                    {company.primaryContactAvatar ? (
                        <img src={company.primaryContactAvatar} alt="" className="w-full h-full object-cover" />
                    ) : company.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-foreground text-xl tracking-tight">{company.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em]">{company.contactsCount} Contacts</p>
                  </div>
                </div>
                <button className="text-muted-foreground p-2 hover:bg-muted rounded-xl transition-all">
                  <MoreHorizontalIcon className="w-5 h-5" />
                </button>
             </div>
             <div className="flex justify-between items-center pt-6 border-t border-border/50">
               <div className="space-y-1">
                  <p className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.3em]">Volume</p>
                  <p className="font-black text-lg">{company.openDeals} Open</p>
               </div>
               <div className="text-right space-y-1">
                  <p className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.3em]">Valuation</p>
                  <p className="font-black text-xl text-primary tracking-tighter">${company.totalValue.toLocaleString()}</p>
               </div>
             </div>
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-card rounded-[3rem] border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="p-8 font-black text-left text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Company / Deal</th>
                  <th className="p-8 font-black text-left text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Team Size</th>
                  <th className="p-8 font-black text-left text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Deal Flow</th>
                  <th className="p-8 font-black text-left text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Valuation</th>
                  <th className="p-8 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {companyList.map((company) => (
                  <tr key={company.name} className="hover:bg-primary/[0.02] transition-colors group">
                    <td className="p-8">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-2xl mr-5 bg-primary/5 border border-primary/10 flex items-center justify-center font-black text-primary text-lg transition-transform group-hover:scale-110 overflow-hidden">
                           {company.primaryContactAvatar ? (
                                <img src={company.primaryContactAvatar} alt="" className="w-full h-full object-cover" />
                            ) : company.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-black text-foreground text-lg tracking-tight group-hover:text-primary transition-colors block">{company.name}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Global Account</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-8 text-muted-foreground font-black uppercase tracking-widest text-[11px]">{company.contactsCount} Members</td>
                    <td className="p-8 font-black text-foreground text-base tracking-tight">{company.openDeals} active</td>
                    <td className="p-8 font-black text-primary text-xl tracking-tighter">${company.totalValue.toLocaleString()}</td>
                    <td className="p-8 text-right">
                      <button className="text-muted-foreground hover:text-foreground p-3 rounded-2xl hover:bg-muted transition-all active:scale-90">
                        <MoreHorizontalIcon className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default Companies;
