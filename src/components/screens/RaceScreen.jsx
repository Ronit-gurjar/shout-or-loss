import { useState, useEffect, useRef } from 'react';
import { useAudioController } from '../../hooks/useAudioController';
import { useWebHaptics } from "web-haptics/react";

export default function RaceScreen({ onNavigate, settings }) {
  const [gameState, setGameState] = useState('countdown'); 
  const [countdown, setCountdown] = useState(3);
  const { trigger } = useWebHaptics();

  // Initialize racers with the settings from your Pilot Profile
  const [racers, setRacers] = useState([
    { 
      id: 1, 
      name: settings?.name || "YOU", 
      color: settings?.color || "#22d3ee", 
      progress: 0 
    },
    { id: 2, name: "SPEED_DEMON", color: "oklch(0.7 0.3 340)", progress: 0 },
    { id: 3, name: "NOISY_BOI", color: "oklch(0.9 0.2 90)", progress: 0 },
  ]);

  // Ref to track state for the audio callback
  const stateRef = useRef('countdown');
  useEffect(() => { stateRef.current = gameState; }, [gameState]);

  // MATCHING YOUR HOOK: (isRacing, triggerHaptic, onShout)
  const volume = useAudioController(
    gameState === 'racing', // isRacing
    trigger,                // triggerHaptic
    (v) => {                // onShout
      if (stateRef.current !== 'racing') return;

      setRacers(prev => prev.map(r => 
        r.id === 1 
          ? { ...r, progress: Math.min(r.progress + (v * 2.5), 100) } 
          : r
      ));
    }
  );

  // Countdown Logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameState('racing');
    }
  }, [countdown]);

  // Win Condition
  useEffect(() => {
    const player = racers.find(r => r.id === 1);
    if (player && player.progress >= 100 && gameState === 'racing') {
      setGameState('finished');
      setTimeout(() => onNavigate('winner'), 800);
    }
  }, [racers, onNavigate, gameState]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4 uppercase font-sans">
      
      {gameState === 'racing' && (
        <div className="absolute top-10 z-30">
          <h2 className="text-6xl font-black italic text-primary animate-pulse neon-glow-cyan">SHOUT!</h2>
        </div>
      )}

      {/* Responsive Track: Flex-row on mobile, Flex-col on desktop */}
      <div className="relative w-full h-[70vh] md:h-[60vh] flex flex-row md:flex-col border-2 border-white/10 bg-slate-950/40">
        {racers.map((racer) => (
          <div key={racer.id} className="relative flex-1 border-r md:border-r-0 md:border-b border-white/5 last:border-0">
            <div 
              className="absolute transition-all duration-100 ease-out z-10 flex flex-col items-center
                         bottom-(--p-v) left-[50%] -translate-x-1/2
                         md:bottom-auto md:top-1/2 md:left-(--p-h) md:-translate-y-1/2"
              style={{ 
                '--p-v': `${racer.progress}%`,
                '--p-h': `${racer.progress}%`
              }}
            >
              <p className="text-[8px] font-black text-white bg-black/80 px-1 mb-1">{racer.name}</p>
              <div 
                className={`border border-white/50 shadow-lg w-6 h-10 md:w-16 md:h-8 ${racer.id === 1 && volume > 0.4 ? 'animate-vibrate' : ''}`} 
                style={{ backgroundColor: racer.color }} 
              />
            </div>
          </div>
        ))}
        <div className="absolute top-0 right-0 z-20 bg-primary h-1 w-full md:h-full md:w-1" />
      </div>

      {gameState === 'countdown' && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center">
          <div className="text-9xl font-black text-primary neon-glow-cyan">{countdown}</div>
        </div>
      )}

      {/* HUD Meter */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-black/90 border-t border-white/10">
        <div className="max-w-xs mx-auto">
          <div className="flex justify-between text-[10px] font-black text-primary mb-1">
            <span>ENGINE_OUTPUT</span>
            <span>{Math.round(volume * 100)}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
            <div className="h-full bg-primary transition-all duration-75" style={{ width: `${volume * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}