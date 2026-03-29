import { useState } from 'react';
import MainMenu from './components/screens/MainMenu';
import JoinScreen from './components/screens/JoinScreen';
import LobbyScreen from './components/screens/LobbyScreen'; // Import the Lobby

export default function App() {
  const [screen, setScreen] = useState('menu');
  const [trackId, setTrackId] = useState('');

  const navigate = (target) => setScreen(target);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans uppercase">
      {screen === 'menu' && <MainMenu onNavigate={navigate} />}
      
      {screen === 'join' && (
        <JoinScreen onNavigate={navigate} setTrackId={setTrackId} />
      )}

      {/* 3. The Lobby Screen */}
      {screen === 'lobby' && (
        <LobbyScreen onNavigate={navigate} trackId={trackId} />
      )}

      {/* 4. Race Screen (Placeholder) */}
      {screen === 'race' && (
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
          <div className="text-center">
            <h1 className="text-6xl font-black italic text-primary animate-bounce">SHHH...</h1>
            <p className="text-accent tracking-[0.5em] mt-4">RACE STARTING IN 5 SECONDS</p>
          </div>
        </div>
      )}
    </div>
  );
}