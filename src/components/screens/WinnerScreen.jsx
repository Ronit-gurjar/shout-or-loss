import { Button } from "@/components/ui/button";

export default function WinnerScreen({ onNavigate, profile }) {
  // Mock results list - in the future, this will be live data
  const RESULTS = [
    { rank: 1, name: profile?.name || "YOU", color: profile?.color || "#22d3ee", photo: profile?.photo, time: "0:42.12" },
    { rank: 2, name: "SPEED_DEMON", color: "oklch(0.7 0.3 340)", time: "0:44.05" },
    { rank: 3, name: "NOISY_BOI", color: "oklch(0.9 0.2 90)", time: "0:48.90" },
    { rank: 4, name: "SILENT_JIM", color: "oklch(0.6 0.2 180)", time: "1:02.30" },
  ];

  const winner = RESULTS[0];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-6 uppercase overflow-y-auto">
      <h1 className="text-4xl font-black italic text-primary neon-glow-cyan my-8">RACE RESULTS</h1>

      {/* PODIUM SECTION */}
      <div className="flex items-end justify-center gap-2 mb-12 h-48">
        {/* 2nd Place */}
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-bold mb-1">{RESULTS[1].name}</span>
          <div className="w-24 h-24 bg-slate-900 border-2 border-white/10 flex items-center justify-center relative">
            <span className="text-4xl font-black italic opacity-20">2</span>
            <div className="absolute bottom-2 w-4 h-2" style={{ backgroundColor: RESULTS[1].color }} />
          </div>
        </div>

        {/* 1st Place - YOU */}
        <div className="flex flex-col items-center translate-y-[-20px]">
          <span className="text-[10px] font-black text-primary mb-1">{winner.name}</span>
          <div className="w-32 h-32 bg-slate-900 border-4 border-primary shadow-[0_0_30px_rgba(34,211,238,0.3)] flex items-center justify-center overflow-hidden relative">
            {winner.photo ? (
              <img src={winner.photo} className="w-full h-full object-cover" alt="Winner" />
            ) : (
              <span className="text-6xl font-black italic text-primary">1</span>
            )}
            <div className="absolute bottom-3 w-6 h-3 shadow-[0_0_10px_cyan]" style={{ backgroundColor: winner.color }} />
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-bold mb-1">{RESULTS[2].name}</span>
          <div className="w-20 h-20 bg-slate-900 border-2 border-white/10 flex items-center justify-center relative">
            <span className="text-3xl font-black italic opacity-20">3</span>
            <div className="absolute bottom-2 w-4 h-2" style={{ backgroundColor: RESULTS[2].color }} />
          </div>
        </div>
      </div>

      {/* DETAILED RESULTS TABLE */}
      <div className="w-full max-w-md bg-card/50 border border-white/10 p-4 mb-8">
        <div className="flex justify-between text-[10px] font-black opacity-50 mb-4 px-2">
          <span>RANK & PILOT</span>
          <span>FINISH TIME</span>
        </div>
        <div className="space-y-2">
          {RESULTS.map((res) => (
            <div key={res.rank} className="flex justify-between items-center p-3 bg-black/40 border border-white/5">
              <div className="flex items-center gap-4">
                <span className="text-xs font-black italic opacity-30">#{res.rank}</span>
                <div className="w-3 h-3" style={{ backgroundColor: res.color }} />
                <span className={`text-sm font-bold ${res.rank === 1 ? 'text-primary' : ''}`}>
                  {res.name}
                </span>
              </div>
              <span className="text-sm font-mono font-bold text-accent">{res.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="w-full max-w-md space-y-3 pb-8">
        <Button 
          onClick={() => onNavigate('lobby')}
          className="w-full h-16 bg-primary text-background font-black text-xl italic rounded-none"
        >
          PLAY AGAIN
        </Button>
        <Button 
          variant="ghost"
          onClick={() => onNavigate('menu')}
          className="w-full h-12 text-secondary font-black text-xs hover:bg-secondary/10 rounded-none"
        >
          EXIT TO MENU
        </Button>
      </div>
    </div>
  );
}