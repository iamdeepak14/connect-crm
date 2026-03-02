
import React from 'react';
import { DealStage, Deal } from '../types';
import KanbanCard from './KanbanCard';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface KanbanColumnProps {
  stage: DealStage;
  deals: Deal[];
  onDraftEmail?: (deal: Deal) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ stage, deals, onDraftEmail }) => {
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const dealIds = deals.map(d => d.id);

  const { setNodeRef, isOver } = useDroppable({
    id: stage,
  });

  return (
    <div 
      ref={setNodeRef}
      className={`flex-shrink-0 w-80 bg-card/60 backdrop-blur-sm rounded-xl border flex flex-col transition-all duration-200 ${isOver ? 'border-primary ring-2 ring-primary/20 scale-[1.01]' : 'border-border'}`}
    >
      <div className="p-4 border-b border-border bg-card/40 rounded-t-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-foreground tracking-tight">{stage}</h3>
          <span className="text-xs font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{deals.length}</span>
        </div>
        <p className="text-sm font-semibold text-primary mt-1">${totalValue.toLocaleString()}</p>
      </div>
      <SortableContext items={dealIds} strategy={verticalListSortingStrategy}>
        <div className={`p-3 space-y-3 overflow-y-auto bg-background/30 flex-1 transition-colors ${isOver ? 'bg-primary/5' : ''}`} style={{ maxHeight: 'calc(100vh - 420px)' }}>
          {deals.map(deal => (
            <KanbanCard key={deal.id} deal={deal} onDraftEmail={onDraftEmail} />
          ))}
          {deals.length === 0 && (
             <div className="h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground text-xs italic">
                Drop here
             </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default KanbanColumn;
