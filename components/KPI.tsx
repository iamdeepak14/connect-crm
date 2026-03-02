import React from 'react';

interface KPIProps {
  title: string;
  value: string;
  lastMonthValue: number;
  percentageChange: number;
}

const ProgressCircle: React.FC<{ percentage: number }> = ({ percentage }) => {
    const radius = 35;
    const stroke = 6;
    const normalizedRadius = radius - stroke * 1.5;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (Math.abs(percentage) / 100) * circumference;

    const isPositive = percentage >= 0;
    const color = '#000000';

    return (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
            <svg height="100%" width="100%" viewBox="0 0 80 80" className="-rotate-90">
                <circle
                    stroke="rgba(0, 0, 0, 0.05)"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx="40"
                    cy="40"
                />
                <circle
                    stroke={color}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx="40"
                    cy="40"
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs sm:text-sm font-black" style={{color: color}}>
                    {isPositive ? '+' : ''}{percentage}%
                </span>
            </div>
        </div>
    );
};


const KPI: React.FC<KPIProps> = ({ title, value, lastMonthValue, percentageChange }) => {
  return (
    <div className="bg-card p-8 rounded-2xl border border-border shadow-sm group hover:border-black transition-all duration-300">
        <div className="flex justify-between items-center">
            <div className="space-y-1">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{title}</p>
                <p className="text-4xl sm:text-5xl font-black text-foreground tracking-tighter group-hover:text-black transition-colors">{value}</p>
                <div className="flex items-center space-x-2 pt-1">
                    <span className="text-[11px] font-bold text-muted-foreground">LY: {lastMonthValue}</span>
                    <span className="text-[11px] font-black text-black bg-black/5 px-1.5 py-0.5 rounded-md">STATUS OK</span>
                </div>
            </div>
            <ProgressCircle percentage={percentageChange} />
        </div>
    </div>
  );
};

export default KPI;