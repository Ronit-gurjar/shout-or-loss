import { useState, useEffect, useRef } from 'react';

export const useAudioController = (isRacing, triggerHaptic, onShout) => {
  const [volume, setVolume] = useState(0);
  const audioContextRef = useRef(null);

  useEffect(() => {
    if (!isRacing) return;

    async function setupMicrophone() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        
        analyser.fftSize = 256;
        source.connect(analyser);
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateVolume = () => {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          const normalized = Math.min(average / 128, 1); 
          
          if (normalized > 0.1) {
            setVolume(normalized);
            onShout(normalized);

            // --- WEB-HAPTICS INTEGRATION ---
            // Trigger a haptic pulse if the shouting is intense
            if (normalized > 0.6) {
              triggerHaptic(); 
            }
          } else {
            setVolume(0);
          }
          
          if (audioContext.state !== 'closed') {
            requestAnimationFrame(updateVolume);
          }
        };

        updateVolume();
        audioContextRef.current = audioContext;
      } catch (err) {
        console.error("Mic access denied", err);
      }
    }

    setupMicrophone();
    return () => audioContextRef.current?.close();
  }, [isRacing, triggerHaptic, onShout]);

  return volume;
};