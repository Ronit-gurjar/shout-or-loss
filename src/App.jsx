import { useState } from 'react';
import MainMenu from './components/screens/MainMenu';

export default function App() {
  const [screen, setScreen] = useState('menu');

  const navigate = (target) => {
    // Add a small haptic tap when navigating if you like!
    setScreen(target);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans uppercase">
      {screen === 'menu' && <MainMenu onNavigate={navigate} />}
      
      {/* Other screens will be added here one by one */}
      {screen === 'join' && <div className="p-20 text-center text-primary">Join Screen Coming Next...</div>}
    </div>
  );
}