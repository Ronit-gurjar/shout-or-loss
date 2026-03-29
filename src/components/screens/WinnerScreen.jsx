import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock data for the results
const MOCK_RESULTS = [
  { id: 1, name: "YOU", color: "oklch(0.85 0.2 200)", time: "0:42.12", rank: 1 },
  { id: 2, name: "SPEED_DEMON", color: "oklch(0.7 0.3 340)", time: "0:44.05", rank: 2 },
  { id: 3, name: "NOISY_BOI", color: "oklch(0.9 0.2 90)", time: "0:48.90", rank: 3 },
  { id: 4, name: "SILENT_JIM", color: "oklch(0.6 0.1 200)", time: "1:02.30", rank: 4 },
];

export default function WinnerScreen({ onNavigate }) {
  const topThree = MOCK_RESULTS.filter(r => r.rank <= 3).sort((a, b) => {
    // Custom sort for pedestal: 2nd, 1st, 3rd
    const order = { 2: 0, 1: 1, 3: 2 };
    return order[a.rank] - order[b.rank];
  });

  const others = MOCK_RESULTS.filter(r => r.rank > 3);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6 overflow-y-auto">
      <h1 className="text-5xl font-black italic text-accent neon-glow-cyan my-8 animate-bounce">
        RACE RESULTS
      </h1>

      {/* 1. THE PEDESTAL */}
      <div className="flex items-end justify-center gap-2 mb-12 h-64 w-full max-w-md">
        {topThree.map((racer) => (
          <div key={racer.id} className="flex flex-col items-center flex-1">
            <div className="text-[10px] font-black mb-2 text-white truncate w-full text-center">
              {racer.name}
            </div>
            {/* The Pedestal Block */}
            <div 
              className={`w-full border-t-4 border-x-2 border-white/20 flex flex-col items-center justify-start pt-4 transition-all
                ${racer.rank === 1 ? 'h-48 bg-primary/20 border-primary' : 
                  racer.rank === 2 ? 'h-36 bg-slate-800 border-slate-400' : 'h-28 bg-orange-900/20 border-orange-700'}
              `}
            >
              <span className="text-4xl font-black italic opacity-50">{racer.rank}</span>
              <div 
                className="w-8 h-4 mt-2 border border-white" 
                style={{ backgroundColor: racer.color }} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* 2. THE LEADERBOARD */}
      <Card className="w-full max-w-md bg-card/50 border-2 border-white/5 rounded-none mb-10">
        <div className="p-3 bg-white/5 text-[10px] font-black tracking-widest flex justify-between">
          <span>RANK & PILOT</span>
          <span>FINISH TIME</span>
        </div>
        <div className="divide-y divide-white/5">
          {MOCK_RESULTS.map((racer) => (
            <div key={racer.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <span className="font-mono italic text-muted-foreground">#{racer.rank}</span>
                <div className="w-3 h-3" style={{ backgroundColor: racer.color }} />
                <span className="font-black text-sm">{racer.name}</span>
              </div>
              <span className="font-mono text-accent text-sm font-bold">{racer.time}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. ACTIONS */}
      <div className="flex flex-col gap-4 w-full max-w-xs mt-auto">
        <Button 
          onClick={() => onNavigate('lobby')}
          className="h-16 bg-primary text-background font-black text-xl italic hover:bg-cyan-300 rounded-none shadow-[0_0_15px_oklch(0.85_0.2_200/0.3)]"
        >
          PLAY AGAIN
        </Button>
        <Button 
          variant="outline"
          onClick={() => onNavigate('menu')}
          className="h-14 border-secondary text-secondary hover:bg-secondary/10 font-black rounded-none"
        >
          EXIT TO MENU
        </Button>
      </div>
    </div>
  );
}