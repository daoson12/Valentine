import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import Typewriter from './Typewriter';

const NO_BUTTON_TEXTS = [
  'No',
  'Are you sure?',
  'Really??',
  'Think again!',
  "You can't catch me!",
  'Hehe nice try!',
  'Nope, not happening!',
  'Almost! ...not really',
  'Give up yet? Pick Yes!',
  "Fine, I'll just stay here... SIKE!",
];

const MOBILE_NO_TEXTS = [
  'No',
  'Are you sure?',
  'Really??',
  'Think again!',
  "I'm shrinking...",
  'Getting smaller!',
  'Can you still see me?',
  "I'm disappearing...",
  'Just pick Yes already!',
  '...',
];

const TEASE_MESSAGES = [
  'Go ahead, pick wisely...',
  'Hmm interesting choice...',
  "That button doesn't want you either!",
  "It's running from you lol",
  'Maybe just click Yes? Just a thought...',
  "You're really committed huh",
  'The No button is faster than you',
  'This could go on forever you know...',
  'I admire the persistence though',
  'Okay okay, the answer is clearly Yes',
];

const MOBILE_TEASE = [
  'Go ahead, pick wisely...',
  'Hmm interesting choice...',
  "It's getting smaller you know...",
  'Soon it will be gone!',
  'Maybe just tap Yes?',
  "You're really trying huh",
  'The button is basically gone',
  'Can you even tap that anymore?',
  'I admire the persistence though',
  'Okay okay, the answer is clearly Yes',
];

const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

const ProposalSection = () => {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState(null);
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const noBtnRef = useRef(null);

  useEffect(() => {
    setIsMobile(isTouchDevice());
  }, []);

  // Desktop: button flies away on hover
  const handleNoDesktop = useCallback(() => {
    const btnW = noBtnRef.current ? noBtnRef.current.offsetWidth : 150;
    const btnH = noBtnRef.current ? noBtnRef.current.offsetHeight : 52;

    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    const margin = 24;
    const maxX = vw - btnW - margin;
    const maxY = vh - btnH - margin;

    const x = Math.floor(Math.random() * (maxX - margin)) + margin;
    const y = Math.floor(Math.random() * (maxY - margin)) + margin;

    setNoPos({ top: y, left: x });
    setNoCount((prev) => prev + 1);
    setYesScale((prev) => Math.min(prev + 0.08, 1.8));
  }, []);

  // Mobile: button shrinks on tap
  const handleNoMobile = useCallback((e) => {
    e.preventDefault();
    setNoCount((prev) => prev + 1);
    setYesScale((prev) => Math.min(prev + 0.12, 2));
  }, []);

  const handleYesClick = () => {
    setAccepted(true);

    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff4081', '#c2185b', '#f06292', '#fce4ec', '#ffd54f', '#ffffff'],
    });

    const end = Date.now() + 3000;
    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4081', '#c2185b', '#ffd54f'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff4081', '#f06292', '#ffffff'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const noTexts = isMobile ? MOBILE_NO_TEXTS : NO_BUTTON_TEXTS;
  const teaseTexts = isMobile ? MOBILE_TEASE : TEASE_MESSAGES;
  const noText = noTexts[Math.min(noCount, noTexts.length - 1)];
  const teaseText = teaseTexts[Math.min(noCount, teaseTexts.length - 1)];

  // Mobile: shrink the No button with each tap (down to 0.2 then hidden)
  const noShrink = isMobile ? Math.max(1 - noCount * 0.1, 0) : 1;

  // Desktop: portal the No button to body after first hover
  const desktopNoButton = (
    <button
      ref={noBtnRef}
      className="btn-no"
      onMouseEnter={handleNoDesktop}
      onClick={handleNoDesktop}
      style={
        noPos
          ? {
              position: 'fixed',
              top: `${noPos.top}px`,
              left: `${noPos.left}px`,
              zIndex: 200,
              margin: 0,
            }
          : {
              position: 'relative',
            }
      }
    >
      {noText} {'\uD83D\uDE48'}
    </button>
  );

  // Mobile: No button stays in place but shrinks
  const mobileNoButton = noShrink > 0 ? (
    <button
      ref={noBtnRef}
      className="btn-no"
      onTouchStart={handleNoMobile}
      onClick={handleNoMobile}
      style={{
        transform: `scale(${noShrink})`,
        opacity: Math.max(noShrink, 0.15),
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        pointerEvents: noShrink <= 0.15 ? 'none' : 'auto',
      }}
    >
      {noText} {'\uD83D\uDE48'}
    </button>
  ) : null;

  if (accepted) {
    return (
      <div className="celebration-section section-wrapper">
        <div className="celebration-hearts">
          <span>{'\uD83D\uDC97'}</span>
          <span>{'\u2728'}</span>
          <span>{'\uD83D\uDC96'}</span>
          <span>{'\u2728'}</span>
          <span>{'\uD83D\uDC97'}</span>
        </div>

        <h1 className="celebration-title">Yay!</h1>

        <p className="celebration-message">
          You just made me the happiest person alive
        </p>

        <div className="celebration-big-heart" />

        <p className="celebration-bottom-text">
          Forever & always, you and me {'\uD83D\uDC9C'}
        </p>
      </div>
    );
  }

  return (
    <div className="proposal-section section-wrapper">
      <div className="proposal-heart-top">{'\uD83D\uDC96'}</div>

      <h2 className="proposal-title">Will you be my Valentine?</h2>

      <p className="proposal-subtitle" key={noCount}>
        <Typewriter text={teaseText} speed={35} />
      </p>

      <div className="proposal-buttons">
        <button
          className="btn-yes"
          onClick={handleYesClick}
          style={{ transform: `scale(${yesScale})` }}
        >
          Yes {'\uD83D\uDC96'}
        </button>

        {isMobile
          ? mobileNoButton
          : (noPos ? createPortal(desktopNoButton, document.body) : desktopNoButton)
        }
      </div>
    </div>
  );
};

export default ProposalSection;
