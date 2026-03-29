import { useState } from 'react';
import { useWebHaptics } from "web-haptics/react";
import { useAudioController } from './hooks/useAudioController';

export default function App() {
  const [isRacing, setIsRacing] = useState(false);
  const [myVolume, setMyVolume] = useState(0);
  
  // Initialize Web Haptics
  const { trigger } = useWebHaptics();

  // Pass the 'trigger' function into our voice controller
  useAudioController(isRacing, trigger, (v) => setMyVolume(v));

  return (
    <div className="min-h-screen bg-background text-foreground p-10 font-sans uppercase tracking-widest overflow-hidden flex flex-col items-center justify-center">
      
      <h1 className={`text-7xl font-black italic text-primary neon-glow-cyan mb-10 transition-transform ${myVolume > 0.5 ? 'animate-vibrate' : ''}`}>
        {isRacing ? "SHOUT!" : "SHOUT OR LOSS"}
      </h1>

      <button 
        onClick={() => setIsRacing(!isRacing)}
        className="px-12 py-6 bg-primary text-background font-black text-3xl mb-12 hover:scale-105 transition-transform neon-border-cyan"
      >
        {isRacing ? "STOP ENGINE" : "ENGAGE MIC"}
      </button>

      {/* Visual Feedback for the Haptic Rumble */}
      <div className="w-full max-w-md p-6 bg-card border-2 border-white/5 relative">
        <div className="flex justify-between mb-2 font-mono text-xs text-accent">
          <span>ENGINE OUTPUT</span>
          <span>{Math.round(myVolume * 100)}%</span>
        </div>
        
        <div className="h-8 w-full bg-slate-950 overflow-hidden border border-white/10">
          <div 
            className="h-full bg-primary transition-all duration-75 ease-out" 
            style={{ 
              width: `${myVolume * 100}%`,
              boxShadow: `0 0 ${myVolume * 30}px oklch(0.85 0.2 200)` 
            }} 
          />
        </div>
        {myVolume > 0.6 && (
          <p className="text-[10px] text-primary mt-2 animate-pulse text-center">HAPTIC RUMBLE ACTIVE</p>
        )}
      </div>
    </div>
  );
}