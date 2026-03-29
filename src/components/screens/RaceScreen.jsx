import { useState, useEffect } from 'react';
import { useAudioController } from '../../hooks/useAudioController';
import { useWebHaptics } from "web-haptics/react";

// Mock racers - in the future, this comes from Socket.io
const INITIAL_RACERS = [
  { id: 1, name: "YOU", color: "oklch(0.85 0.2 200)", progress: 0, avatar: null },
  { id: 2, name: "SPEED_DEMON", color: "oklch(0.7 0.3 340)", progress: 0, avatar: null },
  { id: 3, name: "NOISY_BOI", color: "oklch(0.9 0.2 90)", progress: 0, avatar: null },
];

export default function RaceScreen({ onNavigate }) {
  const [gameState, setGameState] = useState('countdown'); // 'countdown', 'racing', 'finished'
  const [countdown, setCountdown] = useState(5);
  const [racers, setRacers] = useState(INITIAL_RACERS);
  const { trigger } = useWebHaptics();

  // Voice Controller: Moves YOUR car when you shout
  const volume = useAudioController(gameState === 'racing', trigger, (v) => {
    setRacers(prev => prev.map(r => 
      r.id === 1 ? { ...r, progress: Math.min(r.progress + (v * 0.5), 100) } : r
    ));
  });

  // Countdown Logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameState('racing');
    }
  }, [countdown]);

  // Win Condition Check
  useEffect(() => {
    const winner = racers.find(r => r.progress >= 100);
    if (winner) {
      setGameState('finished');
      setTimeout(() => onNavigate('winner'), 1000);
    }
  }, [racers, onNavigate]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col justify-center">
      
      {/* 1. THE TRACK */}
      <div className="relative w-full h-[60vh] flex flex-col justify-around px-4 border-y-2 border-white/5 bg-slate-950/20">
        {racers.map((racer) => (
          <div key={racer.id} className="relative w-full h-12 border-b border-white/5 last:border-0">
            {/* The Car Avatar */}
            <div 
              className="absolute top-0 transition-all duration-100 flex flex-col items-center"
              style={{ left: `${racer.progress}%`, transform: 'translateX(-50%)' }}
            >
              <div className="text-[8px] font-black text-white mb-1 bg-black/50 px-1">
                {racer.name}
              </div>
              <div 
                className={`w-12 h-6 border-2 flex items-center justify-center ${racer.id === 1 && volume > 0.5 ? 'animate-vibrate' : ''}`}
                style={{ backgroundColor: racer.color, borderColor: 'white' }}
              >
                {racer.avatar ? (
                  <img src={racer.avatar} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-2 h-2 bg-black/20 rounded-full" />
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Finish Line */}
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-primary neon-glow-cyan opacity-50 border-l border-white" />
      </div>

      {/* 2. OVERLAYS */}
      
      {/* Fading Backdrop for Countdown */}
      {gameState === 'countdown' && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <h2 className="text-4xl font-black italic text-accent animate-pulse">SHHH...</h2>
          <div className="text-9xl font-black text-primary neon-glow-cyan">{countdown}</div>
          <p className="mt-4 text-[10px] tracking-[0.5em] opacity-50">RACE BEGINS SHORTLY</p>
        </div>
      )}

      {/* Shout Indicator */}
      {gameState === 'racing' && countdown === 0 && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-40">
           <h2 className="text-6xl font-black italic text-primary animate-bounce neon-glow-cyan">SHOUT!</h2>
        </div>
      )}

      {/* Progress Bar for Current Player (Bottom UI) */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-slate-950 border-t-2 border-primary/20">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-[10px] font-black mb-2">
            <span className="text-primary">YOUR ENGINE POWER</span>
            <span className="text-accent">{Math.round(volume * 100)}%</span>
          </div>
          <div className="h-4 w-full bg-white/5 overflow-hidden border border-white/10">
            <div 
              className="h-full bg-primary transition-all duration-75"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}