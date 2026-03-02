
import React from 'react';
import { AIAction } from '../types';
import { RocketIcon } from './icons/RocketIcon';

interface SmartActionsProps {
    actions: AIAction[];
    onActionClick: (action: AIAction) => void;
}

const SmartActions: React.FC<SmartActionsProps> = ({ actions, onActionClick }) => {
    return (
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
            {actions.map((action) => (
                <div 
                    key={action.id} 
                    className="flex-shrink-0 w-80 bg-primary/5 border border-primary/20 p-4 rounded-xl flex flex-col justify-between hover:bg-primary/10 transition-colors cursor-default"
                >
                    <div className="flex items-start space-x-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                            <RocketIcon className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-sm text-foreground/90 font-medium leading-tight">
                            {action.description}
                        </p>
                    </div>
                    <button 
                        onClick={() => onActionClick(action)}
                        className="mt-4 text-xs font-bold text-primary uppercase tracking-wider hover:underline text-left"
                    >
                        {action.actionLabel} →
                    </button>
                </div>
            ))}
        </div>
    );
};

export default SmartActions;
