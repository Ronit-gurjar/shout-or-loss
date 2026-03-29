import { useState, useEffect } from 'react';
import { useAudioController } from '../../hooks/useAudioController';
import { useWebHaptics } from "web-haptics/react";

const INITIAL_RACERS = [
  { id: 1, name: "YOU", color: "oklch(0.85 0.2 200)", progress: 0 },
  { id: 2, name: "SPEED_DEMON", color: "oklch(0.7 0.3 340)", progress: 0 },
  { id: 3, name: "NOISY_BOI", color: "oklch(0.9 0.2 90)", progress: 0 },
];

export default function RaceScreen({ onNavigate }) {
  const [gameState, setGameState] = useState('countdown'); 
  const [countdown, setCountdown] = useState(5);
  const [racers, setRacers] = useState(INITIAL_RACERS);
  const { trigger } = useWebHaptics();

  const volume = useAudioController(gameState === 'racing', trigger, (v) => {
    setRacers(prev => prev.map(r => 
      r.id === 1 ? { ...r, progress: Math.min(r.progress + (v * 0.8), 100) } : r
    ));
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setGameState('racing');
    }
  }, [countdown]);

  useEffect(() => {
    const winner = racers.find(r => r.progress >= 100);
    if (winner) {
      setGameState('finished');
      setTimeout(() => onNavigate('winner'), 1000);
    }
  }, [racers, onNavigate]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* TRACK CONTAINER 
          Mobile: Vertical (flex-row for lanes, lanes are tall)
          Desktop: Horizontal (flex-col for lanes, lanes are wide)
      */}
      <div className="relative w-full h-[70vh] md:h-[60vh] flex flex-row md:flex-col justify-around border-2 border-white/5 bg-slate-950/20">
        
        {racers.map((racer) => (
          <div key={racer.id} className="relative flex-1 border-r md:border-r-0 md:border-b border-white/5 last:border-0">
            
            {/* THE CAR 
                Mobile: Positioned via 'bottom'
                Desktop: Positioned via 'left'
            */}
            <div 
              className="absolute transition-all duration-100 flex flex-col items-center z-10"
              style={{ 
                bottom: window.innerWidth < 768 ? `${racer.progress}%` : '50%',
                left: window.innerWidth >= 768 ? `${racer.progress}%` : '50%',
                transform: window.innerWidth >= 768 ? 'translate(-50%, -50%)' : 'translateX(-50%)'
              }}
            >
              <p className="text-[8px] font-black text-white bg-black/50 px-1 mb-1 whitespace-nowrap">
                {racer.name}
              </p>
              
              {/* Car Body: Rotates based on orientation */}
              <div 
                className={`border-2 shadow-lg transition-transform ${racer.id === 1 && volume > 0.5 ? 'animate-vibrate' : ''}
                  w-6 h-10 md:w-12 md:h-6`} // Tall on mobile, wide on desktop
                style={{ backgroundColor: racer.color, borderColor: 'white' }} 
              />
            </div>
          </div>
        ))}

        {/* FINISH LINE 
            Mobile: At the top
            Desktop: At the right
        */}
        <div className="absolute top-0 right-0 h-1 w-full md:h-full md:w-1 bg-primary neon-glow-cyan shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20" />
      </div>

      {/* Countdown Overlay */}
      {gameState === 'countdown' && (
        <div className="absolute inset-0 bg-background/90 backdrop-blur-md z-50 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-black italic text-accent animate-pulse mb-4">SHHH...</h2>
          <div className="text-9xl font-black text-primary neon-glow-cyan">{countdown}</div>
        </div>
      )}

      {/* Engine Meter */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-black/80 backdrop-blur-md border-t border-primary/20">
        <div className="max-w-md mx-auto space-y-2">
          <div className="flex justify-between text-[10px] font-black">
            <span className="text-primary">ENGINE OUTPUT</span>
            <span className="text-accent">{Math.round(volume * 100)}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 border border-white/10 overflow-hidden">
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