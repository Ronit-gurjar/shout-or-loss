import { useState } from 'react';
import MainMenu from './components/screens/MainMenu';
import JoinScreen from './components/screens/JoinScreen';
import LobbyScreen from './components/screens/LobbyScreen';
import RaceScreen from './components/screens/RaceScreen';
import WinnerScreen from './components/screens/WinnerScreen';

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
        <RaceScreen onNavigate={navigate} />
      )}

      {screen === 'winner' && (
        <WinnerScreen onNavigate={navigate} />
      )}
    </div>
  );
}