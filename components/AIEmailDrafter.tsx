import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Deal } from '../types';

interface AIEmailDrafterProps {
  deal: Deal;
  onClose: () => void;
}

const AIEmailDrafter: React.FC<AIEmailDrafterProps> = ({ deal, onClose }) => {
  const [draft, setDraft] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateDraft = async () => {
      setLoading(true);
      setError(null);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
          Draft a professional and friendly follow-up email to ${deal.contact.name} from ${deal.contact.company}.
          The deal is for a "${deal.title}" valued at $${deal.value.toLocaleString()}.
          Current status: ${deal.stage}.
          AI predicted close probability: ${deal.closeProbability}%.
          Keep it concise, supportive, and focus on moving to the next stage.
          Provide ONLY the email content.
        `;
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
        });

        if (response.text) {
          setDraft(response.text);
        } else {
          setError("Failed to generate draft text.");
        }
      } catch (err: any) {
        console.error(err);
        setError("Error communicating with AI. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    generateDraft();
  }, [deal]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden border border-border flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        <div className="p-6 md:p-8 border-b border-border flex justify-between items-center bg-primary/5">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-foreground tracking-tight">AI Email Drafter</h2>
            <p className="text-sm text-muted-foreground font-bold mt-1">{deal.contact.name} • {deal.title}</p>
          </div>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-foreground hover:bg-white rounded-xl transition-all">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="p-6 md:p-8 flex-1 overflow-y-auto scrollbar-thin">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-6">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <div className="text-center">
                <p className="text-lg font-black text-foreground">Gemini is drafting...</p>
                <p className="text-sm text-muted-foreground mt-1">Analyzing deal context and crafting your message</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 text-destructive p-6 rounded-2xl text-center border border-destructive/20">
              <p className="font-bold">{error}</p>
              <button 
                onClick={onClose}
                className="mt-6 font-black uppercase text-xs tracking-widest bg-destructive text-white px-6 py-3 rounded-xl hover:bg-destructive/90 shadow-lg shadow-destructive/20 transition-all"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-muted/40 p-5 rounded-2xl border border-border/60">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-3">Subject Suggestion</p>
                <p className="text-sm font-black text-foreground leading-tight">Following up on our {deal.title} proposal</p>
              </div>
              <div className="relative group">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] absolute -top-2 left-4 bg-card px-2">Email Body</p>
                <textarea 
                  className="w-full h-80 bg-background border border-border rounded-2xl p-6 text-sm md:text-base focus:ring-4 focus:ring-primary/10 focus:border-primary focus:outline-none resize-none font-sans leading-relaxed transition-all"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>

        {!loading && !error && (
          <div className="p-6 md:p-8 bg-muted/20 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
            <button 
                onClick={() => { /* Real implementation would re-run useEffect */ }}
                className="text-sm font-black text-primary hover:text-primary/70 transition-all uppercase tracking-widest"
            >
                Regenerate Draft
            </button>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
              <button onClick={onClose} className="w-full sm:w-auto px-6 py-3 text-sm font-black text-muted-foreground hover:bg-muted rounded-xl transition-all">Cancel</button>
              <button 
                className="w-full sm:w-auto bg-primary text-primary-foreground font-black px-8 py-3.5 rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95 text-sm"
                onClick={() => {
                  navigator.clipboard.writeText(draft);
                  alert("Copied to clipboard!");
                  onClose();
                }}
              >
                Copy & Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIEmailDrafter;