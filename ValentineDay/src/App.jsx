import React, { useState, useRef, useEffect } from 'react';
import './App.css';

// ==========================================
// CONFIGURATION: EDIT YOUR DATA HERE
// ==========================================
const CONFIG = {
  title: "A GALAXY FULL OF STARS BUT ONLY ONE OF YOU",
  subtitle: "Episode XIV: The Valentine's Request",
  paragraphs: [
    "It is a period of great affection.",
    "The heart of the sender has been captured by a presence so bright, it outshines a twin sun system.",
    "Every day spent together feels like a jump through hyperspace, full of excitement and wonder.",
    "There is no need for a Jedi mind trick to say what is true: you are the most incredible person in the galaxy.",
    "The force is strong with this connection, and it is time for the final question..."
  ],
  backgroundImage: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80&w=2070",
  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  whatsappUrl: "https://wa.me/09029311960?text=So what's your answer!",
  baseSpeed: 40, 
};

const ValentineApp = () => {
  const [view, setView] = useState('LOCKED'); 
  const [isFast, setIsFast] = useState(false);
  const audioRef = useRef(null);

  // Apply background to body to eliminate white space
  useEffect(() => {
    document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${CONFIG.backgroundImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.margin = "0";
    
    return () => {
      document.body.style.backgroundImage = '';
    };
  }, []);

  const startExperience = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
    setView('CRAWLING');
  };

  const currentSpeed = isFast ? CONFIG.baseSpeed / 2 : CONFIG.baseSpeed;

  return (
    <div 
      className="container" 
      onClick={() => view === 'CRAWLING' && setIsFast(!isFast)}
    >
      <audio ref={audioRef} src={CONFIG.audioUrl} loop />

      {/* 1. INTRO VIEW */}
      {view === 'LOCKED' && (
        <div className="overlay">
          <button className="startButton" onClick={startExperience}>
            <span style={{ fontSize: '2rem' }}>❤️</span>
            <p>Hey, Tap me Sha </p>
          </button>
        </div>
      )}

      {/* 2. THE STAR WARS CRAWL */}
      {view === 'CRAWLING' && (
        <div className="crawlContainer">
          <div className="speed-indicator">
            {isFast ? "Speed: 2x (Tap to slow)" : "Tap screen to speed up x2"}
          </div>

          <section 
            className="crawlContent" 
            onAnimationEnd={() => setView('SUCCESS')}
            style={{ animationDuration: `${currentSpeed}s` }} 
          >
            <div className="titleSection">
              <p className="subtitle">{CONFIG.subtitle}</p>
              <h1 className="main-title">{CONFIG.title}</h1>
            </div>
            
            {/* FIX: Ensure CONFIG.paragraphs is called and the variable 'para' is used */}
            {CONFIG.paragraphs.map((para, index) => (
              <p key={index} className="crawlText">
                {para}
              </p>
            ))}
          </section>
        </div>
      )}

      {/* 3. FINAL SUCCESS VIEW */}
      {view === 'SUCCESS' && (
        <div className="successView">
          <h2>Will you be my Valentine?</h2>
          <a href={CONFIG.whatsappUrl} target="_blank" rel="noreferrer" className="whatsappButton">
            Tap Here Next
          </a>
        </div>
      )}
    </div>
  );
};

export default ValentineApp;