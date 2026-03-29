import { useState } from 'react';
import MainMenu from './components/screens/MainMenu';
import JoinScreen from './components/screens/JoinScreen';
import LobbyScreen from './components/screens/LobbyScreen';
import RaceScreen from './components/screens/RaceScreen';
import WinnerScreen from './components/screens/WinnerScreen';
import ProfileScreen from './components/screens/ProfileScreen';

export default function App() {
  const [screen, setScreen] = useState('menu');
  const [trackId, setTrackId] = useState('');

  // PERSISTENT PROFILE STATE
  const [profile, setProfile] = useState({
    name: "VIRTUAL_SHOUTER",
    color: "#22d3ee", // Default Cyan
    haptics: true,
    sounds: true,
    photo: null
  });

  const navigate = (target) => setScreen(target);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans uppercase">
      {screen === 'menu' && <MainMenu onNavigate={navigate} />}
      
      {screen === 'profile' && (
        <ProfileScreen 
          onNavigate={navigate} 
          profile={profile} 
          setProfile={setProfile} 
        />
      )}

      {screen === 'join' && (
        <JoinScreen 
          onNavigate={navigate} 
          setTrackId={setTrackId} />
      )}

      {screen === 'lobby' && (
        <LobbyScreen 
          onNavigate={navigate} 
          trackId={trackId} 
          userColor={profile.color}
          userName={profile.name}
        />
      )}

      {screen === 'race' && (
        <RaceScreen 
          onNavigate={navigate} 
          settings={profile} 
        />
      )}

      {screen === 'winner' && (
        <WinnerScreen onNavigate={navigate} userProfile={profile} />
      )}
    </div>
  );
}