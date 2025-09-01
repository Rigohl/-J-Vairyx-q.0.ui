import React, { useState, useEffect } from 'react';

const HolographicHead = ({ isListening = false, isSpeaking = false, isThinking = false }) => {
  const [eyeAnimation, setEyeAnimation] = useState('normal');
  const [glowIntensity, setGlowIntensity] = useState(0.5);

  useEffect(() => {
    if (isSpeaking) {
      setEyeAnimation('speaking');
    } else if (isThinking) {
      setEyeAnimation('thinking');
    } else if (isListening) {
      setEyeAnimation('listening');
    } else {
      setEyeAnimation('normal');
    }
  }, [isSpeaking, isThinking, isListening]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => {
        const base = isSpeaking ? 0.8 : isThinking ? 0.6 : 0.4;
        return base + Math.sin(Date.now() * 0.005) * 0.2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isSpeaking, isThinking]);

  return (
    <div className="holographic-head-container">
      {/* Main Holographic Robot Head */}
      <div 
        className="holographic-head"
        style={{
          '--glow-intensity': glowIntensity,
          '--eye-animation': eyeAnimation
        }}
      >
        {/* Robot Head Outline */}
        <div className="robot-head-outline">
          {/* Top section with antenna/sensors */}
          <div className="head-top-section">
            <div className="antenna left-antenna"></div>
            <div className="antenna right-antenna"></div>
            <div className="sensor-array">
              <div className="sensor"></div>
              <div className="sensor"></div>
              <div className="sensor"></div>
            </div>
          </div>
          
          {/* Main head area */}
          <div className="head-main">
            {/* Eyes */}
            <div className="eyes-container">
              <div className={`robot-eye left-eye ${eyeAnimation}`}>
                <div className="eye-outer-ring"></div>
                <div className="eye-inner-ring"></div>
                <div className="eye-core"></div>
                <div className="eye-glow"></div>
              </div>
              <div className={`robot-eye right-eye ${eyeAnimation}`}>
                <div className="eye-outer-ring"></div>
                <div className="eye-inner-ring"></div>
                <div className="eye-core"></div>
                <div className="eye-glow"></div>
              </div>
            </div>
            
            {/* Central processing indicator */}
            <div className="central-processor">
              <div className="processor-core"></div>
              <div className="processor-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
              </div>
            </div>
            
            {/* Voice/Communication Array */}
            <div className="voice-comm-array">
              <div className={`comm-indicator ${isSpeaking ? 'speaking' : ''}`}>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
                <div className="wave-line"></div>
              </div>
            </div>
          </div>
          
          {/* Head bottom with status indicators */}
          <div className="head-bottom-section">
            <div className="status-lights">
              <div className={`status-light ${isThinking ? 'active thinking' : ''}`}></div>
              <div className={`status-light ${isSpeaking ? 'active speaking' : ''}`}></div>
              <div className={`status-light ${isListening ? 'active listening' : ''}`}></div>
            </div>
          </div>
        </div>
        
        {/* Holographic Effects */}
        <div className="holographic-overlay">
          <div className="holo-grid"></div>
          <div className="holo-scanlines">
            <div className="scanline"></div>
            <div className="scanline"></div>
          </div>
          <div className="holo-particles">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`particle p-${i}`}></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Status Display */}
      <div className="ai-status-display">
        <div className={`status-indicator ${isThinking ? 'thinking' : isSpeaking ? 'speaking' : isListening ? 'listening' : 'idle'}`}>
          <div className="status-dot"></div>
          <span className="status-text">
            {isThinking ? 'PROCESANDO...' : 
             isSpeaking ? 'TRANSMITIENDO...' : 
             isListening ? 'RECEPTIVO...' : 
             'J-VAIRYX IA'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HolographicHead;