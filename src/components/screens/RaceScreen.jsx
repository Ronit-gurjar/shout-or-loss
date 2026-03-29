import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock data for the results
const MOCK_RESULTS = [
  { id: 1, name: "YOU", color: "oklch(0.85 0.2 200)", time: "0:42.12", rank: 1 },
  { id: 2, name: "SPEED_DEMON", color: "oklch(0.7 0.3 340)", time: "0:44.05", rank: 2 },
  { id: 3, name: "NOISY_BOI", color: "oklch(0.9 0.2 90)", time: "0:48.90", rank: 3 },
  { id: 4, name: "SILENT_JIM", color: "oklch(0.6 0.1 200)", time: "1:02.30", rank: 4 },
  // Adding more mock racers to test the scrolling behavior
  { id: 5, name: "ARCADE_ACE", color: "oklch(0.8 0.1 120)", time: "1:05.15", rank: 5 },
  { id: 6, name: "STATIC_CLING", color: "oklch(0.7 0.2 300)", time: "1:08.50", rank: 6 },
  { id: 7, name: "VOLUME_VIPER", color: "oklch(0.95 0.3 60)", time: "1:10.20", rank: 7 },
];

export default function WinnerScreen({ onNavigate }) {
  const topThree = MOCK_RESULTS.filter(r => r.rank <= 3).sort((a, b) => {
    // Custom sort for pedestal: 2nd, 1st, 3rd
    const order = { 2: 0, 1: 1, 3: 2 };
    return order[a.rank] - order[b.rank];
  });

  return (
    // MAIN CONTENT CONTAINER: Uses flex and screen height
    <div className="flex flex-col h-screen bg-background relative overflow-hidden font-sans uppercase tracking-widest">
      
      {/* SCROLLABLE CONTENT AREA: All results live here */}
      <div className="flex-1 overflow-y-auto px-6 pt-10 pb-28 md:pb-10">
        
        {/* Race Results Title */}
        <h1 className="text-4xl md:text-5xl font-black italic text-accent neon-glow-cyan text-center mb-10 animate-pulse">
          RACE RESULTS
        </h1>

        {/* 1. THE PEDESTAL */}
        <div className="flex items-end justify-center gap-2 mb-12 h-64 w-full max-w-sm mx-auto">
          {topThree.map((racer) => (
            <div key={racer.id} className="flex flex-col items-center flex-1">
              <div className="text-[9px] font-black mb-1 text-white truncate w-full text-center tracking-tighter">
                {racer.name}
              </div>
              {/* The Pedestal Block with varying heights */}
              <div 
                className={`w-full border-t-4 border-x-2 border-white/10 flex flex-col items-center pt-3 
                  transition-all duration-300 ease-out
                  ${racer.rank === 1 ? 'h-44 bg-primary/20 border-primary shadow-[0_0_20px_rgba(34,211,238,0.3)]' : 
                    racer.rank === 2 ? 'h-32 bg-slate-800 border-slate-500' : 
                                      'h-24 bg-orange-900/10 border-orange-800' }
                `}
              >
                <span className="text-3xl font-black italic text-white/50">{racer.rank}</span>
                <div className="w-6 h-3 mt-2 border border-white" style={{ backgroundColor: racer.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* 2. THE LEADERBOARD */}
        <Card className="w-full max-w-sm mx-auto bg-card/40 border border-white/5 rounded-none mb-4 shadow-xl">
          <div className="px-3 py-2 bg-slate-950 text-[9px] font-black tracking-[0.2em] flex justify-between border-b border-white/5">
            <span>RANK / PILOT</span>
            <span>FINISH TIME</span>
          </div>
          <div className="divide-y divide-white/5 max-h-[40vh] overflow-y-auto">
            {MOCK_RESULTS.map((racer) => (
              <div key={racer.id} className="flex items-center justify-between p-3.5 gap-2">
                <div className="flex items-center gap-3.5">
                  <span className="font-mono text-[11px] font-bold italic text-muted-foreground">#{racer.rank}</span>
                  <div className="w-3.5 h-3.5 shrink-0" style={{ backgroundColor: racer.color }} />
                  <span className={`font-black text-xs ${racer.id === 1 ? 'text-primary' : 'text-white'}`}>
                    {racer.name}
                  </span>
                </div>
                <span className="font-mono text-accent text-xs font-bold tracking-tighter whitespace-nowrap">
                  {racer.time}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* STICKY FOOTER: Always anchors actions to the bottom on mobile */}
      <div className="absolute bottom-0 left-0 w-full p-6 pb-8 bg-black/80 backdrop-blur-md border-t border-primary/20 
                    md:relative md:bg-transparent md:border-none md:p-0 md:w-auto md:mx-auto md:mb-10 z-50">
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-xs md:max-w-md mx-auto">
          
          <Button 
            onClick={() => onNavigate('lobby')}
            className="flex-1 h-14 md:h-16 bg-primary text-background font-black text-lg md:text-xl italic 
                       hover:bg-cyan-300 transition-all rounded-none 
                       shadow-[0_0_15px_rgba(34,211,238,0.3)] active:scale-95"
          >
            PLAY AGAIN
          </Button>

          <Button 
            variant="outline"
            onClick={() => onNavigate('menu')}
            className="h-12 md:h-14 shrink-0 md:flex-1 border-secondary text-secondary 
                       hover:bg-secondary/10 hover:text-secondary 
                       font-black text-sm md:text-base rounded-none active:scale-95"
          >
            EXIT TO MENU
          </Button>
        </div>
      </div>
    </div>
  );
}