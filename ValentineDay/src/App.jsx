import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import audio from './assets/american-love.mp3'

// ==========================================
// CONFIGURATION: EDIT YOUR DATA HERE
// ==========================================

const CONFIG = {
  title: "A GALAXY FULL OF STARS BUT ONLY ONE OF YOU",
  subtitle: "Episode XIV: The Valentine Request",
  paragraphs: [
    "I couldn't find an appropriate way to begin, so i'll just start",
    "Since i met you as funny and messed up as it was, every interaction has been a wonderful experience.",
    "You are one of the most surprising and best thing that has happened to me since beginning school.",
    "You're everything i or any guy could ever hope for Beautiful, Smart, Curious, Inquisitive, Audaciuos,",
    "Ambitiuos, Open-Minded and yet Strong sense of self, Kind, Passionate, Funny, Opinionated",
    "I honestly have run out of adjectives to describe how i see you. Falling for you was,",
    "is, and will probably be the most confusing and unpredictable thing that has ever happened to me",
    "And yet it's obvious why",
    "(her name) saying Yes will make me the second happiest man in the world",
    "(cos saying yes to something else will make me the happiest)",
    "So after going roundabout the question is"
  ],
  backgroundImage: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80&w=2070",
  audioUrl: audio,
  whatsappUrl: "https://wa.me/(Your number)?text=So what's your answer!",
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