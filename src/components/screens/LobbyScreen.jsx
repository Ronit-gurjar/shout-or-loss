import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock data for now - we will replace this with Socket.io data later
const MOCK_PLAYERS = [
  { id: 1, name: "YOU", color: "oklch(0.85 0.2 200)", isReady: true, isHost: true },
  { id: 2, name: "SPEED_DEMON", color: "oklch(0.7 0.3 340)", isReady: true, isHost: false },
  { id: 3, name: "NOISY_BOI", color: "oklch(0.9 0.2 90)", isReady: false, isHost: false },
];

export default function LobbyScreen({ onNavigate, trackId }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-6 bg-background relative overflow-hidden">
      
      {/* Header Section */}
      <div className="w-full max-w-md text-center mt-8">
        <h2 className="text-sm font-bold tracking-[0.4em] text-accent mb-1">TRACK ESTABLISHED</h2>
        <h1 className="text-5xl font-black italic text-primary neon-glow-cyan">
          #{trackId || "0000"}
        </h1>
      </div>

      {/* Players List Card */}
      <Card className="w-full max-w-md flex-1 my-8 bg-card/50 border-2 border-primary/20 rounded-none overflow-hidden flex flex-col">
        <div className="p-4 bg-primary/10 flex justify-between items-center">
          <span className="text-[10px] font-black tracking-widest">RACERS IN LOBBY</span>
          <span className="text-[10px] font-black bg-primary text-background px-2 py-0.5">
            {MOCK_PLAYERS.length}/8
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {MOCK_PLAYERS.map((player) => (
            <div 
              key={player.id} 
              className="flex items-center justify-between p-3 bg-slate-950/50 border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-none border-2 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                  style={{ backgroundColor: player.color, borderColor: player.color }}
                />
                <span className={`font-bold text-sm ${player.id === 1 ? 'text-primary' : 'text-white'}`}>
                  {player.name} {player.isHost && <span className="text-[8px] text-accent ml-1">[HOST]</span>}
                </span>
              </div>
              
              <div className="flex items-center">
                {player.isReady ? (
                  <span className="text-[10px] font-black text-primary animate-pulse tracking-tighter">READY</span>
                ) : (
                  <span className="text-[10px] font-black text-muted-foreground opacity-50 italic">WAITING...</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-slate-950 text-center">
          <p className="text-[9px] text-muted-foreground leading-relaxed">
            SHARE THE TRACK ID WITH FRIENDS TO INVITE THEM TO THE RACE.
          </p>
        </div>
      </Card>

      {/* Bottom Action Bar */}
      <div className="w-full max-w-md flex gap-4 mb-4">
        <Button 
          variant="outline"
          onClick={() => onNavigate('menu')}
          className="flex-1 h-16 border-secondary text-secondary hover:bg-secondary/10 font-black rounded-none"
        >
          ABANDON
        </Button>
        <Button 
          onClick={() => onNavigate('race')}
          className="flex-2 h-16 bg-primary text-background hover:bg-cyan-300 font-black text-xl italic rounded-none shadow-[0_0_20px_oklch(0.85_0.2_200/0.3)]"
        >
          START RACE
        </Button>
      </div>
    </div>
  );
}