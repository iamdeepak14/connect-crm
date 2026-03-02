import React from 'react';
import { Deal, DealStage } from '../types';
import { TrendingUpIcon } from './icons/TrendingUpIcon';
import { DollarSignIcon } from './icons/DollarSignIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface LeadStatsProps {
    deals: Deal[];
}

const LeadStats: React.FC<LeadStatsProps> = ({ deals }) => {
    const totalPipeline = deals.reduce((sum, d) => sum + (d.stage !== DealStage.Lost ? d.value : 0), 0);
    const weightedForecast = deals.reduce((sum, d) => {
        if (d.stage === DealStage.Won) return sum + d.value;
        if (d.stage === DealStage.Lost) return sum;
        return sum + (d.value * (d.closeProbability / 100));
    }, 0);
    const activeLeadsCount = deals.filter(d => d.stage !== DealStage.Won && d.stage !== DealStage.Lost).length;

    const stats = [
        { 
            label: 'Total Pipeline', 
            value: `$${(totalPipeline / 1000).toFixed(1)}k`, 
            icon: <DollarSignIcon className="w-5 h-5 text-primary" />,
            sub: 'Total active value'
        },
        { 
            label: 'Weighted Forecast', 
            value: `$${(weightedForecast / 1000).toFixed(1)}k`, 
            icon: <TrendingUpIcon className="w-5 h-5 text-emerald-500" />,
            sub: 'Probability adjusted'
        },
        { 
            label: 'Active Deals', 
            value: activeLeadsCount.toString(), 
            icon: <CheckCircleIcon className="w-5 h-5 text-purple-600" />,
            sub: 'In-progress opportunities'
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
                <div key={i} className="bg-card p-4 rounded-xl border border-border flex items-center space-x-4 shadow-sm hover:border-primary/20 transition-all">
                    <div className="p-3 bg-secondary rounded-lg">
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
                        <p className="text-2xl font-extrabold text-foreground">{stat.value}</p>
                        <p className="text-[10px] text-muted-foreground font-medium">{stat.sub}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LeadStats;