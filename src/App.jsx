import React, { useState, useCallback, useRef, useEffect } from 'react';
import FloatingHearts from './components/FloatingHearts';
import IntroSection from './components/IntroSection';
import LetterSection from './components/LetterSection';
import MemorySection from './components/MemorySection';
import ProposalSection from './components/ProposalSection';
import LyricsDisplay from './components/LyricsDisplay';
import './index.css';
import './App.css';

const SECTIONS = ['Intro', 'Letter', 'Memories', 'Proposal'];

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/like-my-father.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'auto';
    audioRef.current = audio;

    const tryPlay = () => {
      if (audio.paused) {
        audio.play().then(() => {
          setIsMusicPlaying(true);
        }).catch(() => {
          // Still blocked, will try again on next click
        });
      }
    };

    // Try autoplay immediately
    tryPlay();

    // Keep retrying on every click/touch until it works
    const onInteraction = () => {
      if (audio.paused) {
        tryPlay();
      } else {
        // Already playing, stop listening
        document.removeEventListener('click', onInteraction);
        document.removeEventListener('touchstart', onInteraction);
      }
    };

    document.addEventListener('click', onInteraction);
    document.addEventListener('touchstart', onInteraction);

    // Also sync state if audio ends up playing
    audio.addEventListener('playing', () => setIsMusicPlaying(true));
    audio.addEventListener('pause', () => setIsMusicPlaying(false));

    return () => {
      document.removeEventListener('click', onInteraction);
      document.removeEventListener('touchstart', onInteraction);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  const nextSection = useCallback(() => {
    setCurrentSection((prev) => Math.min(prev + 1, SECTIONS.length - 1));
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case 0: return <IntroSection onNext={nextSection} />;
      case 1: return <LetterSection onNext={nextSection} />;
      case 2: return <MemorySection onNext={nextSection} />;
      case 3: return <ProposalSection />;
      default: return <IntroSection onNext={nextSection} />;
    }
  };

  return (
    <div className="app">
      <FloatingHearts />

      <button
        className={`music-toggle ${isMusicPlaying ? 'playing' : ''}`}
        onClick={toggleMusic}
        aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
      >
        {isMusicPlaying ? '\uD83D\uDD0A' : '\uD83D\uDD07'}
      </button>

      <div className="nav-dots">
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            className={`nav-dot ${i === currentSection ? 'active' : ''}`}
            onClick={() => i <= currentSection && setCurrentSection(i)}
            aria-label={`Go to ${SECTIONS[i]}`}
          />
        ))}
      </div>

      <main className="app-main" key={currentSection}>
        {renderSection()}
      </main>

      <LyricsDisplay isPlaying={isMusicPlaying} />
    </div>
  );
}

export default App;
