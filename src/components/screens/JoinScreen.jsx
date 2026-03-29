import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CALIBRATION_WORDS = ["RED", "BLUE", "YELLOW", "GREEN", "ORANGE", "PURPLE", "CYAN", "MAGENTA"];

export default function JoinScreen({ onNavigate, setTrackId }) {
  const [step, setStep] = useState('input'); // 'input', 'loading', 'calibrate', 'error', 'busy'
  const [inputValue, setInputValue] = useState('');
  const [randomWord, setRandomWord] = useState('');

  useEffect(() => {
    // Pick a random color for the voice calibration word
    setRandomWord(CALIBRATION_WORDS[Math.floor(Math.random() * CALIBRATION_WORDS.length)]);
  }, []);

  const handleJoin = () => {
    if (!inputValue) return;
    
    setStep('loading');
    
    // MOCK API CALL: Replace this with your actual socket logic later
    setTimeout(() => {
      if (inputValue === "START") {
        setStep('busy'); // Race already in progress
      } else if (inputValue === "ERROR") {
        setStep('error'); // Track not found
      } else {
        setTrackId(inputValue);
        setStep('calibrate'); // Move to voice calibration
      }
    }, 1500);
  };

  // --- RENDERING STATES ---

  if (step === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-6" />
        <h2 className="text-2xl font-black italic text-primary animate-pulse tracking-widest">
          SEARCHING FOR TRACK...
        </h2>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-primary/5 rounded-full blur-[120px]" />

      <Card className="w-full max-w-md p-8 bg-card border-2 border-primary/30 rounded-none shadow-[0_0_30px_rgba(34,211,238,0.1)] z-10">
        
        {step === 'calibrate' ? (
          /* VOICE CALIBRATION STEP */
          <div className="flex flex-col items-center space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-black italic text-primary mb-2">VOICE CHECK</h2>
              <p className="text-muted-foreground text-[10px] tracking-widest font-bold uppercase">
                Measure your engine power
              </p>
            </div>

            <div className="w-full bg-slate-950 p-6 border border-white/10 text-center">
              <p className="text-[10px] text-accent font-bold mb-4">SAY THIS WORD LOUDLY:</p>
              <div className="text-6xl font-black text-white neon-glow-cyan animate-pulse">
                {randomWord}
              </div>
            </div>

            <Button 
              onClick={() => onNavigate('lobby')}
              className="w-full h-16 bg-primary text-background font-black text-xl hover:bg-cyan-300 rounded-none"
            >
              I'M READY!
            </Button>
          </div>
        ) : (
          /* TRACK ID INPUT STEP */
          <div className="flex flex-col space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-black italic text-primary mb-2 tracking-tighter">ENTER TRACK</h2>
              <p className="text-muted-foreground text-[10px] tracking-widest font-bold uppercase">
                Input the 4-digit code
              </p>
            </div>

            <div className="space-y-4">
              <Input 
                placeholder="TRACK-ID"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value.toUpperCase())}
                className="h-16 bg-background border-2 border-primary/20 text-center text-3xl font-black tracking-[0.5em] rounded-none focus-visible:ring-primary/50"
              />
              
              {step === 'error' && (
                <div className="bg-destructive/10 border border-destructive/50 p-3 text-center">
                  <p className="text-destructive text-[10px] font-black italic uppercase">
                    Track not found. Check the ID and try again!
                  </p>
                </div>
              )}

              {step === 'busy' && (
                <div className="bg-accent/10 border border-accent/50 p-3 text-center">
                  <p className="text-accent text-[10px] font-black italic uppercase">
                    Race already started. Please wait or try another.
                  </p>
                </div>
              )}
            </div>

            <Button 
              onClick={handleJoin}
              disabled={!inputValue}
              className="h-16 bg-primary text-background font-black text-xl hover:bg-cyan-300 rounded-none transition-all active:scale-95"
            >
              FIND TRACK
            </Button>

            <button 
              onClick={() => onNavigate('menu')}
              className="text-muted-foreground text-[10px] font-bold uppercase hover:text-primary transition-colors tracking-widest"
            >
              &lt; Return to Base
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}