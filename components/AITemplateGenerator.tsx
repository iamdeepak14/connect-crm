import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface AITemplateGeneratorProps {
  onSave: (data: any) => void;
  onClose: () => void;
}

const AITemplateGenerator: React.FC<AITemplateGeneratorProps> = ({ onSave, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{title: string, subject: string, body: string} | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemPrompt = `
        You are a world-class professional copywriter for a high-end CRM called Connect.
        The user needs an email template for: ${prompt}
        
        Generate a professional, persuasive, and modern email template.
        Return strictly in this format:
        TITLE: [Name of the template]
        SUBJECT: [The email subject line]
        BODY: [The full email body, use [Name] and [Company] as placeholders]
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: systemPrompt,
      });

      const text = response.text || "";
      const title = text.match(/TITLE:\s*(.*)/)?.[1] || "AI Template";
      const subject = text.match(/SUBJECT:\s*(.*)/)?.[1] || "Following up";
      const body = text.split("BODY:")[1]?.trim() || "Message body could not be parsed.";

      setResult({ title, subject, body });
    } catch (err) {
      console.error(err);
      alert("AI Generation failed. Check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[110] p-4">
      <div className="bg-card w-full max-w-2xl rounded-[3.5rem] shadow-[0_32px_128px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="p-10 border-b border-border bg-primary/5 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-black text-foreground tracking-tighter">AI Template Author</h2>
            <p className="text-xs text-muted-foreground font-bold mt-1 uppercase tracking-widest">Powered by Gemini Intelligence</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="p-10 space-y-8 max-h-[75vh] overflow-y-auto scrollbar-thin">
          {!result ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">What should this template achieve?</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A polite but firm reminder for an overdue payment of $5000..."
                  className="w-full h-40 bg-background border border-border/60 rounded-3xl p-6 text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all placeholder:text-muted-foreground/40 leading-relaxed resize-none"
                />
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="w-full bg-primary text-white font-black py-5 rounded-2xl shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center uppercase tracking-widest text-xs"
              >
                {isGenerating ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  'Generate High-Converting Draft'
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
              <div className="bg-muted/40 p-8 rounded-[2.5rem] border border-border/50 space-y-4">
                <div>
                   <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Subject Line</p>
                   <p className="text-lg font-black text-foreground">{result.subject}</p>
                </div>
                <div>
                   <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Email Content</p>
                   <p className="text-sm font-medium text-foreground/80 leading-relaxed italic whitespace-pre-wrap">{result.body}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setResult(null)} className="flex-1 py-4 text-xs font-black text-muted-foreground uppercase tracking-widest hover:bg-muted rounded-2xl transition-all">Start Over</button>
                <button 
                  onClick={() => onSave({...result, category: 'Sales'})}
                  className="flex-[2] bg-emerald-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95 uppercase tracking-widest text-xs"
                >
                  Save to Workspace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AITemplateGenerator;