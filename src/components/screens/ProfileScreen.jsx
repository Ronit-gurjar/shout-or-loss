import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Camera, Check, Pencil, LogOut, ArrowLeft, Save } from "lucide-react";

export default function ProfileScreen({ onNavigate, profile, setProfile }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(profile.name);

  useEffect(() => {
    setTempName(profile.name);
  }, [profile.name]);

  const saveName = () => {
    if (tempName.trim() === "") return;
    // This updates the parent state, which triggers the useEffect in App.jsx to save to localStorage
    setProfile(prev => ({ ...prev, name: tempName }));
    setIsEditingName(false);
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setProfile(prev => ({ ...prev, photo: base64Data }));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- LOG OUT / RESET LOGIC ---
  const handleLogOut = () => {
    if (window.confirm("ERASE PILOT DATA? THIS CANNOT BE UNDONE.")) {
      localStorage.removeItem('pilot_profile');
      // Reset state to defaults
      setProfile({
        name: "NEW_PILOT",
        color: "#22d3ee",
        photo: null,
        haptics: true,
        sounds: true
      });
      onNavigate('menu');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 font-sans uppercase tracking-widest overflow-hidden">
      
      {/* IDENTITY HEADER */}
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={() => onNavigate('menu')} className="p-0 mr-4 hover:bg-transparent">
          <ArrowLeft className="w-6 h-6 text-primary" />
        </Button>
        <h1 className="text-xl font-black italic text-primary">PILOT_PROFILE</h1>
      </div>

      <div className="flex items-center gap-6 mb-10 bg-slate-950/40 p-4 border border-white/5">
        <div className="relative w-24 h-24 bg-card border-2 border-primary/30 shrink-0">
          {profile.photo ? (
            <img src={profile.photo} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[8px] opacity-40">
              <Camera className="w-6 h-6 mb-1" /> PHOTO
            </div>
          )}
          <input type="file" accept="image/*" capture="user" onChange={handlePhoto} className="absolute inset-0 opacity-0 cursor-pointer" />
        </div>

        <div className="flex-1">
          <p className="text-[9px] font-black opacity-40 mb-1">CALLSIGN</p>
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <>
                <input 
                  autoFocus className="bg-transparent border-b-2 border-primary text-lg font-black outline-none w-full"
                  value={tempName} onChange={(e) => setTempName(e.target.value.toUpperCase())}
                />
                <Button size="icon" onClick={saveName} className="h-8 w-8 bg-primary text-background"><Check size={16}/></Button>
              </>
            ) : (
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsEditingName(true)}>
                <span className="text-xl font-black italic">{profile.name}</span>
                <Pencil size={14} className="text-primary opacity-50" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SETTINGS */}
      <div className="space-y-6 flex-1">
        <div className="bg-card/30 p-6 space-y-6 border border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black">HAPTICS</span>
            <Switch checked={profile.haptics} onCheckedChange={(v) => setProfile(p => ({...p, haptics: v}))} />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-black">SOUNDS</span>
            <Switch checked={profile.sounds} onCheckedChange={(v) => setProfile(p => ({...p, sounds: v}))} />
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-white/5">
            <span className="text-xs font-black">CAR COLOR</span>
            <input type="color" value={profile.color} onChange={(e) => setProfile(p => ({...p, color: e.target.value}))} className="w-10 h-10 bg-transparent border-none" />
          </div>
        </div>
      </div>

      {/* LOG OUT BUTTON */}
      <Button 
        variant="outline" 
        onClick={handleLogOut}
        className="border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground font-black px-4 h-10 rounded-none transition-all"
      >
        <LogOut className="w-4 h-4 mr-2" />
        LOG OUT
      </Button>

      <Button onClick={() => onNavigate('menu')} className="w-full h-16 bg-primary text-background font-black rounded-none mt-auto">
        <Save className="mr-2" /> CONFIRM & EXIT
      </Button>
    </div>
  );
}