
import React from 'react';
import { Deal, LeadScore } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FireIcon } from './icons/FireIcon';

const LeadScoreIndicator: React.FC<{ score: LeadScore }> = ({ score }) => {
  const scoreStyles = {
    [LeadScore.Hot]: { icon: <FireIcon className="w-3 h-3" />, text: 'Hot', color: 'bg-red-500/10 text-red-600 border-red-200' },
    [LeadScore.Warm]: { icon: <FireIcon className="w-3 h-3" />, text: 'Warm', color: 'bg-amber-500/10 text-amber-600 border-amber-200' },
    [LeadScore.Cold]: { icon: <FireIcon className="w-3 h-3" />, text: 'Cold', color: 'bg-blue-500/10 text-blue-600 border-blue-200' },
  };
  const { icon, text, color } = scoreStyles[score];

  return (
    <div className={`flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider ${color}`}>
      {icon}
      <span className="ml-1">{text}</span>
    </div>
  );
};

interface KanbanCardProps {
  deal: Deal;
  isOverlay?: boolean;
  onDraftEmail?: (deal: Deal) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ deal, isOverlay, onDraftEmail }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    boxShadow: isOverlay ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' : 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-card p-4 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing mb-3">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">{deal.title}</h4>
        </div>
        <p className="text-xs text-muted-foreground font-medium">{deal.contact.company}</p>
      </div>

      <div className="flex justify-between items-end mb-4">
        <span className="text-base font-extrabold text-foreground tracking-tight">${deal.value.toLocaleString()}</span>
        <LeadScoreIndicator score={deal.aiLeadScore} />
      </div>
      
      <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground pt-3 border-t border-border/50">
        <div className="flex items-center">
            <img src={deal.contact.avatarUrl} alt={deal.contact.name} className="w-5 h-5 rounded-full mr-2 grayscale-[0.5]" />
            <span className="truncate max-w-[80px]">{deal.contact.name.split(' ')[0]}</span>
        </div>
        <div className="flex items-center space-x-1">
             <span className="bg-primary/5 text-primary px-1.5 py-0.5 rounded font-bold">{deal.closeProbability}% Prob</span>
        </div>
      </div>

      {onDraftEmail && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDraftEmail(deal);
          }}
          className="absolute top-2 right-2 p-1.5 bg-primary/10 text-primary opacity-0 group-hover:opacity-100 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          title="Draft AI Email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
        </button>
      )}
    </div>
  );
};

export default KanbanCard;
