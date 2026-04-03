import { useState, useEffect } from 'react';
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
  const [profile, setProfile] = useState(() => {
    // Load the whole object at once
    const saved = localStorage.getItem('pilot_profile');
    return saved ? JSON.parse(saved) : {
      name: "NEW_PILOT",
      color: "#22d3ee",
      photo: null,
      haptics: true,
      sounds: true
    };
  });

  const handleUpdateProfile = (newData) => {
    setProfile(newData);
    localStorage.setItem('pilot_profile', JSON.stringify(newData));
  };

  // CRITICAL: This effect runs every time 'profile' changes
  // It saves the name, color, and photo as one single object
  useEffect(() => {
    localStorage.setItem('pilot_profile', JSON.stringify(profile));
  }, [profile]);

  const navigate = (target) => setScreen(target);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans uppercase">
      {screen === 'menu' && <MainMenu onNavigate={navigate} />}
      
      {screen === 'profile' && (
        <ProfileScreen 
          onNavigate={navigate} 
          profile={profile} 
          setProfile={setProfile}
          onUpdate={handleUpdateProfile}
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