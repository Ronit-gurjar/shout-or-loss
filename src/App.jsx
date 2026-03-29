import { useState } from 'react';
import MainMenu from './components/screens/MainMenu';
import JoinScreen from './components/screens/JoinScreen'; // Import the new screen

export default function App() {
  const [screen, setScreen] = useState('menu');
  const [trackId, setTrackId] = useState('');

  const navigate = (target) => {
    setScreen(target);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans uppercase">
      {/* 1. Main Menu Screen */}
      {screen === 'menu' && (
        <MainMenu onNavigate={navigate} />
      )}
      
      {/* 2. Join Screen (with Calibration logic) */}
      {screen === 'join' && (
        <JoinScreen 
          onNavigate={navigate} 
          setTrackId={setTrackId} 
        />
      )}

      {/* Placeholder for the next screen we build */}
      {screen === 'lobby' && (
        <div className="flex items-center justify-center min-h-screen">
          <h1 className="text-primary animate-pulse font-black italic text-4xl">
            Lobby for Track: {trackId} Coming Soon...
          </h1>
        </div>
      )}
    </div>
  );
}