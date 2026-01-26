import { useState, useEffect, useRef } from 'react';
import './App.css';

// ============================================
// CONFIGURATION LAYER (User-Editable Section)
// ============================================
// Edit these values to customize your Valentine's Day experience
const CONFIG = {
  // Main title text displayed in the intro screen
  TITLE_TEXT: '❤️ Happy Valentine\'s Day ❤️',

  // Array of paragraphs for the crawling text animation
  // Each element will be displayed with line breaks between them
  CRAWL_PARAGRAPHS: [
    'In a galaxy far, far away...',
    'There lived a heart full of love and wonder.',
    'A love that transcends time and space.',
    'Happy Valentine\'s Day to my special someone!',
    'You are my favorite adventure.',
    'Forever and always... 💕',
  ],

  // Background image URL - Change this to your image
  // Tip: Use a full HTTPS URL or place an image in /public folder
  // Example: '/valentine-bg.jpg' or 'https://your-image-url.com/image.jpg'
  BACKGROUND_IMAGE_URL: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&h=800&fit=crop',

  // Audio URL - Background music for the experience
  // Tip: Place an audio file in /public folder or use an HTTPS URL
  // Example: '/love-song.mp3' or 'https://your-audio-url.com/music.mp3'
  AUDIO_URL: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',

  // WhatsApp URL - User will be redirected here after the animation
  // Replace PHONE_NUMBER with the actual phone number (include country code, no + symbol)
  // Format: https://wa.me/PHONE_NUMBER?text=MESSAGE
  WHATSAPP_URL: 'https://wa.me/1234567890?text=Happy%20Valentines%20Day!',

  // Speed of the crawling text animation (in seconds)
  // Lower values = faster animation
  CRAWL_SPEED: 20,
};

function App() {
  // State management for the three views
  const [appState, setAppState] = useState('LOCKED'); // LOCKED | CRAWLING | SUCCESS
  const audioRef = useRef(null);
  const textContainerRef = useRef(null);

  // Initialize audio and transition to CRAWLING state
  const handleStartExperience = () => {
    setAppState('CRAWLING');

    // Play audio if available
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log('Audio playback failed:', error);
      });
    }
  };

  // Handle animation end - transition to SUCCESS state
  const handleAnimationEnd = () => {
    setAppState('SUCCESS');
  };

  // Stop audio when leaving the page
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <div className="app-container" style={{ backgroundImage: `url(${CONFIG.BACKGROUND_IMAGE_URL})` }}>
      {/* Hidden audio element - initialized on user interaction */}
      <audio ref={audioRef} src={CONFIG.AUDIO_URL} loop />

      {/* VIEW 1: LOCKED STATE - Intro Screen with "Tap to Open" Button */}
      {appState === 'LOCKED' && (
        <div className="overlay-screen">
          <div className="intro-content">
            <h1 className="intro-title">{CONFIG.TITLE_TEXT}</h1>
            <button
              className="tap-button"
              onClick={handleStartExperience}
              aria-label="Tap to open the Valentine's Day experience"
            >
              ✨ Tap to Open ✨
            </button>
            <p className="intro-subtitle">Prepare for something special...</p>
          </div>
        </div>
      )}

      {/* VIEW 2: CRAWLING STATE - 3D Star Wars-style Text Animation */}
      {appState === 'CRAWLING' && (
        <div className="crawl-container">
          {/* Perspective container for 3D effect */}
          <div className="perspective-wrapper">
            <div
              className="crawl-text"
              ref={textContainerRef}
              onAnimationEnd={handleAnimationEnd}
              style={{ animationDuration: `${CONFIG.CRAWL_SPEED}s` }}
            >
              {/* Render crawl paragraphs */}
              {CONFIG.CRAWL_PARAGRAPHS.map((paragraph, index) => (
                <div key={index} className="crawl-paragraph">
                  {paragraph}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: SUCCESS STATE - Call-to-Action Screen with WhatsApp Link */}
      {appState === 'SUCCESS' && (
        <div className="overlay-screen">
          <div className="success-content">
            <h1 className="success-title">💖 The End 💖</h1>
            <p className="success-message">
              Thank you for experiencing this special message.
            </p>
            <a
              href={CONFIG.WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-button"
              aria-label="Send a message on WhatsApp"
            >
              💬 Send on WhatsApp
            </a>
            <button
              className="replay-button"
              onClick={() => {
                setAppState('LOCKED');
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                }
              }}
            >
              🔄 Watch Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
