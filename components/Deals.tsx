import React, { useState, useMemo } from 'react';
import { DealStage, Deal, AIAction } from '../types';
import KanbanBoard from './KanbanBoard';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import KanbanCard from './KanbanCard';
import LeadStats from './LeadStats';
import SmartActions from './SmartActions';
import AIEmailDrafter from './AIEmailDrafter';
import { aiActions } from '../data/dummyData';
import { PlusIcon } from './icons/PlusIcon';

interface DealsProps {
    deals: Deal[];
    setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
    onAction: (type: string) => void;
}

const Deals: React.FC<DealsProps> = ({ deals, setDeals, onAction }) => {
  const [activeDeal, setActiveDeal] = useState<Deal | null>(null);
  const [draftingDeal, setDraftingDeal] = useState<Deal | null>(null);

  const dealsByStage = useMemo(() => deals.reduce((acc, deal) => {
    if (!acc[deal.stage]) {
      acc[deal.stage] = [];
    }
    acc[deal.stage].push(deal);
    return acc;
  }, {} as Record<DealStage, Deal[]>), [deals]);

  const stages: DealStage[] = [
    DealStage.Prospect,
    DealStage.Proposal,
    DealStage.Negotiation,
    DealStage.Won,
    DealStage.Lost,
  ];
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const deal = deals.find(d => d.id === active.id);
    if (deal) setActiveDeal(deal);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveDeal(null);

    if (over) {
        const activeId = active.id as string;
        const overId = over.id as DealStage;

        if (Object.values(DealStage).includes(overId as DealStage)) {
            setDeals(prevDeals => prevDeals.map(deal =>
                deal.id === activeId ? { ...deal, stage: overId as DealStage } : deal
            ));
        }
    }
  }

  const handleActionClick = (action: AIAction) => {
    if (action.actionLabel === 'Draft Email') {
      setDraftingDeal(deals[0]);
    } else {
      onAction('AI_INSIGHT');
    }
  };

  return (
    <div className="h-full flex flex-col space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">Sales Pipeline</h1>
          <p className="text-muted-foreground mt-1">Manage leads and track deal progress with AI-powered forecasting.</p>
        </div>
        <button 
          onClick={() => onAction('ADD_LEAD')}
          className="w-full sm:w-auto bg-primary text-primary-foreground font-black px-6 py-3.5 rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center active:scale-95"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Lead
        </button>
      </div>

      <LeadStats deals={deals} />
      
      <div className="space-y-4">
        <h2 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">AI Intelligence</h2>
        <SmartActions actions={aiActions} onActionClick={handleActionClick} />
      </div>

      <div className="flex-1 min-h-[500px]">
        <DndContext 
            sensors={sensors} 
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveDeal(null)}
        >
          <KanbanBoard stages={stages} dealsByStage={dealsByStage} onDraftEmail={(deal) => setDraftingDeal(deal)} />
          <DragOverlay>
            {activeDeal ? <KanbanCard deal={activeDeal} isOverlay /> : null}
          </DragOverlay>
        </DndContext>
      </div>

      {draftingDeal && (
        <AIEmailDrafter 
          deal={draftingDeal} 
          onClose={() => setDraftingDeal(null)} 
        />
      )}
    </div>
  );
};

export default Deals;