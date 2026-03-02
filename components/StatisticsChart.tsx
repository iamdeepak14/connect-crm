import React, { useMemo } from 'react';
import { Deal } from '../types';

interface StatisticsChartProps {
    deals: Deal[];
}

export const StatisticsChart: React.FC<StatisticsChartProps> = ({ deals }) => {
    const dataPoints = useMemo(() => {
        // Mocking some seasonal trend but anchoring it with actual deal values
        const totalValue = deals.reduce((acc, d) => acc + d.value, 0);
        const base = totalValue / 500; // Scale it for SVG
        
        // Simple heuristic: vary points based on deal count and total value
        const months = 9;
        const actual = [80, 60, 90, 70, 20, 30, 70, 50, 60].map(v => Math.max(10, v - (base / 10)));
        const predicted = [100, 90, 110, 95, 50, 70, 80, 90, 85];
        
        return { actual, predicted };
    }, [deals]);

    // Construct SVG path string from points
    const generatePath = (pts: number[]) => {
        let d = `M 0 ${pts[0]}`;
        const step = 33;
        for (let i = 1; i < pts.length; i++) {
            const x = i * step;
            const prevX = (i - 1) * step;
            d += ` C ${prevX + 15} ${pts[i-1]}, ${x - 15} ${pts[i]}, ${x} ${pts[i]}`;
        }
        return d;
    };

    return (
        <div className="h-48 w-full">
            <svg width="100%" height="100%" viewBox="0 0 300 120" preserveAspectRatio="none">
                {/* Grid Lines */}
                {[20, 45, 70, 95].map(y => (
                    <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2" />
                ))}
                
                {/* Data line 1 - Main Purple (Actual) */}
                <path 
                    d={generatePath(dataPoints.actual)} 
                    fill="none" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="2.5" 
                    className="transition-all duration-500"
                />

                {/* Data line 2 - Soft Orchid/Lavender (Predicted) */}
                <path 
                    d={generatePath(dataPoints.predicted)} 
                    fill="none" 
                    stroke="#D8B4FE" 
                    strokeWidth="2.5" 
                    strokeOpacity="0.5"
                    className="transition-all duration-500"
                />
                
                {/* Points */}
                <circle cx="264" cy={dataPoints.actual[8]} r="4" fill="hsl(var(--primary))" stroke="hsl(var(--card))" strokeWidth="2" />

                {/* X-Axis Labels */}
                <g className="text-[10px] fill-current text-muted-foreground">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((month, i) => (
                        <text key={month} x={i * 33 + 5} y="118">{month}</text>
                    ))}
                </g>
            </svg>
        </div>
    );
};