
import React from 'react';
import { DealStage, Deal } from '../types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  stages: DealStage[];
  dealsByStage: Record<DealStage, Deal[]>;
  onDraftEmail?: (deal: Deal) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ stages, dealsByStage, onDraftEmail }) => {
  return (
    <div className="flex space-x-4 overflow-x-auto pb-4 h-full scrollbar-thin">
      {stages.map(stage => (
        <KanbanColumn
          key={stage}
          stage={stage}
          deals={dealsByStage[stage] || []}
          onDraftEmail={onDraftEmail}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
