import { Button } from "@/components/ui/button";

export default function MainMenu({ onNavigate }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-secondary/10 rounded-full blur-[120px]" />

      {/* Game Title */}
      <div className="text-center mb-8 z-10">
        <h1 className="text-6xl md:text-8xl font-black italic text-primary neon-glow-cyan leading-none uppercase tracking-tighter">
          SHOUT OR LOSE
        </h1>
        <p className="text-accent font-bold text-sm md:text-base mt-2 tracking-[0.3em]">
          ULTIMATE VOLUME RACING
        </p>
      </div>
      
      {/* Hero Image Placeholder (where you'll add your drawing) */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12 z-10 group">
        <div className="absolute inset-0 bg-primary/20 animate-pulse blur-2xl rounded-full group-hover:bg-primary/40 transition-all" />
        <div className="relative w-full h-full border-4 border-primary neon-border-cyan bg-card flex items-center justify-center overflow-hidden">
          {/* Once you have your image, replace this span with <img src="..." /> */}
          <span className="text-muted-foreground text-xs font-black opacity-40 uppercase text-center px-4">
            [ HERO CAR IMAGE HERE ]
          </span>
        </div>
      </div>

      {/* Menu Actions */}
      <div className="flex flex-col gap-5 w-full max-w-xs z-10">
        <Button 
          onClick={() => onNavigate('join')}
          className="h-16 text-2xl font-black italic bg-primary text-background hover:bg-cyan-300 neon-border-cyan rounded-none transition-all active:scale-95"
        >
          JOIN TRACK
        </Button>

        <Button 
          onClick={() => onNavigate('lobby')}
          className="h-16 text-2xl font-black italic bg-transparent border-2 border-primary text-primary hover:bg-primary/10 rounded-none transition-all active:scale-95"
        >
          CREATE TRACK
        </Button>

        <Button 
          onClick={() => onNavigate('profile')}
          variant="outline"
          className="h-14 text-lg font-black italic border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary rounded-none transition-all active:scale-95"
        >
          PILOT PROFILE
        </Button>
      </div>

      {/* Version Tag */}
      <div className="absolute bottom-4 right-4 text-[10px] text-muted-foreground font-mono opacity-30">
        V.0.4.1-BETA
      </div>
    </div>
  );
}