import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Camera, Check, Pencil, LogOut, ArrowLeft } from "lucide-react";

export default function ProfileScreen({ onNavigate }) {
  // Identity State
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState("VIRTUAL_SHOUTER");
  const [tempName, setTempName] = useState(userName);
  const [profilePic, setProfilePic] = useState(null);

  // Settings State
  const [haptics, setHaptics] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [carColor, setCarColor] = useState("#22d3ee");

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const saveName = () => {
    setUserName(tempName);
    setIsEditingName(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 font-sans uppercase tracking-widest overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center mb-10">
        <Button variant="ghost" onClick={() => onNavigate('menu')} className="p-0 mr-4">
          <ArrowLeft className="w-6 h-6 text-primary" />
        </Button>
        <h1 className="text-xl font-black italic text-primary">PILOT_PROFILE</h1>
      </div>

      {/* TOP SECTION: IDENTITY */}
      <div className="flex items-center gap-6 mb-12 bg-slate-950/40 p-4 border border-white/5">
        {/* Profile Photo / Add Photo */}
        <div className="relative w-24 h-24 shrink-0 bg-card border-2 border-primary/30 overflow-hidden group">
          {profilePic ? (
            <img src={profilePic} className="w-full h-full object-cover" alt="Profile" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[8px] text-center p-2 opacity-50">
              <Camera className="w-6 h-6 mb-1" />
              ADD PHOTO
            </div>
          )}
          <input 
            type="file" accept="image/*" capture="user" 
            onChange={handlePhotoUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        {/* Click-to-Edit Name */}
        <div className="flex-1">
          <label className="text-[9px] font-black opacity-40 block mb-1">CALLSIGN</label>
          <div className="flex items-center gap-2">
            {isEditingName ? (
              <>
                <input 
                  autoFocus
                  className="bg-transparent border-b-2 border-primary text-lg font-black text-white outline-none w-full"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                />
                <Button size="icon" onClick={saveName} className="h-8 w-8 bg-primary text-background rounded-none">
                  <Check className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <div 
                className="group flex items-center gap-3 cursor-pointer"
                onClick={() => { setTempName(userName); setIsEditingName(true); }}
              >
                <span className="text-xl font-black italic text-white truncate max-w-45">
                  {userName}
                </span>
                <Pencil className="w-4 h-4 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: SETTINGS */}
      <div className="space-y-8 flex-1">
        <h2 className="text-[10px] font-black text-accent tracking-[0.4em]">SYSTEM_CALIBRATION</h2>
        
        <div className="space-y-6 bg-card/30 p-6 border border-white/5">
          {/* Haptics & Sounds */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-black">HAPTIC_FEEDBACK</span>
            <Switch checked={haptics} onCheckedChange={setHaptics} />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-black">ENGINE_AUDIO</span>
            <Switch checked={sounds} onCheckedChange={setSounds} />
          </div>

          {/* Car Color Picker */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black">CAR_LIVERY</span>
              <input 
                type="color" 
                value={carColor}
                onChange={(e) => setCarColor(e.target.value)}
                className="w-10 h-10 bg-transparent border-none cursor-pointer"
              />
            </div>
            <p className="text-[9px] opacity-40 leading-tight">
              THIS COLOR WILL BE VISIBLE TO ALL RACERS ON THE TRACK.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="mt-auto pt-6">
        <Button 
          variant="outline" 
          className="w-full h-14 border-secondary text-secondary font-black rounded-none hover:bg-secondary/10"
          onClick={() => alert("Logging out...")}
        >
          <LogOut className="mr-2 w-4 h-4" /> LOG_OUT
        </Button>
        <p className="text-[8px] text-center mt-4 opacity-20 italic">SHOUT_OR_LOSS // V.0.4.1-BETA</p>
      </div>
    </div>
  );
}