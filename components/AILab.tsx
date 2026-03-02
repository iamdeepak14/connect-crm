import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Deal, Task } from '../types';

interface AILabProps {
    deals: Deal[];
    tasks: Task[];
    onAction: (type: string) => void;
}

const AILab: React.FC<AILabProps> = ({ deals, tasks, onAction }) => {
    const [prompt, setPrompt] = useState('');
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const runAnalysis = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setAnalysis(null);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Preparing contextual data payload for API
            const contextPayload = {
              dealCount: deals.length,
              totalValue: deals.reduce((a, b) => a + b.value, 0),
              pendingTasks: tasks.filter(t => !t.isCompleted).length,
              topDeal: deals.length > 0 ? deals.reduce((max, d) => d.closeProbability > max.closeProbability ? d : max, deals[0]) : null
            };

            const systemInstruction = `
                You are a senior Business Intelligence agent for Connect CRM.
                CRM DATA CONTEXT:
                - Active Deals: ${contextPayload.dealCount} (Value: $${contextPayload.totalValue})
                - Pending Tasks: ${contextPayload.pendingTasks}
                ${contextPayload.topDeal ? `- Highest Probability: ${contextPayload.topDeal.title} (${contextPayload.topDeal.closeProbability}%)` : ''}

                Analyze the user's specific request using this data. Be strategic, objective, and provide actionable bullet points.
            `;

            const response = await ai.models.generateContent({
                model: 'gemini-3-pro-preview', // Upgraded for complex reasoning
                contents: prompt,
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.7
                }
            });

            setAnalysis(response.text || "Report generated but empty.");
        } catch (err) {
            console.error("Gemini API Error:", err);
            setAnalysis("Unable to reach intelligence server. Please check your network or API permissions.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-foreground tracking-tight flex items-center uppercase italic">
                        AI Lab
                        <span className="ml-4 px-2 py-1 bg-black text-white text-[9px] rounded font-black tracking-widest">PRO</span>
                    </h1>
                    <p className="text-muted-foreground mt-1 font-medium">Enterprise intelligence and predictive modeling.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-white rounded-3xl border border-black/10 p-10 shadow-sm relative overflow-hidden">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                        <h2 className="text-2xl font-black text-foreground mb-6 tracking-tight uppercase">Operational Query</h2>
                        <div className="relative">
                            <textarea 
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Example: Analyze my Q4 deal velocity and suggest which leads to prioritize today based on value..."
                                className="w-full h-48 bg-secondary border border-black/5 rounded-2xl p-8 text-sm md:text-base font-medium focus:ring-4 focus:ring-black/5 focus:border-black outline-none resize-none transition-all leading-relaxed"
                            />
                            <button 
                                onClick={runAnalysis}
                                disabled={loading}
                                className="absolute bottom-6 right-6 bg-black text-white font-black px-8 py-3.5 rounded-xl hover:bg-black/90 transition-all shadow-xl shadow-black/20 active:scale-95 text-xs flex items-center uppercase tracking-widest"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path></svg>
                                        Execute Analysis
                                    </>
                                )}
                            </button>
                        </div>
                        
                        {analysis && (
                            <div className="mt-10 p-8 bg-black text-white rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500 shadow-2xl">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center font-black text-xs">AI</div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">BI Strategy Report</h4>
                                </div>
                                <div className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap font-medium">
                                    {analysis}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-secondary p-8 rounded-3xl border border-black/10 text-black">
                        <h3 className="text-lg font-black mb-4 uppercase tracking-tight">Active Context</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-black/5 pb-2">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Deals</span>
                                <span className="text-sm font-black">{deals.length}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-black/5 pb-2">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Pipeline</span>
                                <span className="text-sm font-black">${deals.reduce((a,b)=>a+b.value,0).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-black/5 pb-2">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Backlog</span>
                                <span className="text-sm font-black">{tasks.filter(t=>!t.isCompleted).length}</span>
                            </div>
                        </div>
                        <p className="text-[9px] font-bold text-muted-foreground mt-8 leading-relaxed italic">
                            All analyses use Gemini Pro for predictive scoring and qualitative assessment.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AILab;