import React, { useState } from 'react';
import { SyncLogo } from './icons/SyncLogo';

interface AuthProps {
  onSignIn: (user: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSignIn({ name: 'Alex Rivera', email, avatarUrl: 'https://i.pravatar.cc/150?u=alex' });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-black/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-black/5 rounded-full blur-[120px]"></div>
      
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div className="bg-white border border-black/10 shadow-2xl rounded-2xl p-8 md:p-12">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-2xl shadow-black/20 mb-6">
              <SyncLogo className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black text-black tracking-tighter uppercase italic">connect</h1>
            <p className="text-muted-foreground mt-2 font-medium">Authorised Access Only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Identity</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@access.com" 
                className="w-full bg-secondary border border-black/5 rounded-lg px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all placeholder:text-muted-foreground/40"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Passkey</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-secondary border border-black/5 rounded-lg px-5 py-4 text-sm font-medium focus:ring-4 focus:ring-black/5 focus:border-black outline-none transition-all placeholder:text-muted-foreground/40"
              />
            </div>

            <button 
              disabled={isLoading}
              type="submit" 
              className="w-full bg-black text-white font-black py-4 rounded-lg shadow-xl shadow-black/20 hover:bg-black/90 transition-all active:scale-95 flex items-center justify-center uppercase tracking-widest text-xs"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Unlock Dashboard'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground font-medium">
              System Protected &bull; <button className="text-black font-bold hover:underline">Request Key</button>
            </p>
          </div>
        </div>
        
        <p className="text-center text-[10px] text-muted-foreground/60 uppercase tracking-widest mt-8 font-black">
          Connect CRM &copy; 2024 &bull; Minimal Intelligence
        </p>
      </div>
    </div>
  );
};

export default Auth;