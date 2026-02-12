import React, { useState, useEffect, useRef } from 'react';

const LYRICS = [
  "I wanna come home to roses",
  "And dirty little notes on Post-its",
  "And when my hair starts turning grey",
  "He'll say I'm like a fine wine, better with age",
  "I guess I learned it from my parents",
  "That true love starts with friendship",
  "A kiss on the forehead, a date night",
  "Fake an apology after a fight",
  "",
  "I need a man who's patient and kind",
  "Gets out of the car and holds the door",
  "I wanna slow dance in the living room like",
  "We're eighteen at senior prom and grow",
  "Old with someone who makes me feel young",
  "I need a man who loves me like",
  "My father loves my mom",
  "LONG_PAUSE",
  "I want a road trip in the summers",
  "I wanna make fun of each other",
  "I wanna rock out to Billy Joel",
  "And flip our kids off when they call us old",
  "He'll accidentally burn our dinner",
  "And let me be the Scrabble winner",
  'And when my body changes shapes',
  'He\'ll say, "Oh my God, you look hot today"',
  "",
  "I need a man who's patient and kind",
  "Gets out of the car and holds the door",
  "I wanna slow dance in the living room like",
  "We're eighteen at senior prom and grow",
  "Old with someone who makes me feel young",
  "I need a man who loves me like",
  "My father loves my mom",
  "",
  "And if he lives up to my father",
  "Maybe he can teach our daughter",
  "What it takes to love a queen",
  "She should know she's royalty",
  "",
  "I need a man who's patient and kind",
  "Gets out of the car and holds the door",
  "I wanna slow dance in the living room like",
  "We're eighteen at senior prom and grow",
  "Old with someone who makes me feel young",
  "I need a man who loves me like",
  "My father loves my mom",
  "I need a man who loves me like",
  "My father loves my mom",
];

const INTRO_DELAY = 19000; // 19 seconds instrumental intro

const LyricsDisplay = ({ isPlaying }) => {
  const [started, setStarted] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [prevLine, setPrevLine] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) {
      clearInterval(intervalRef.current);
      setStarted(false);
      setLineIndex(0);
      setCharIndex(0);
      setDisplayedText('');
      setPrevLine('');
      return;
    }

    // Wait 19 seconds for the instrumental intro
    const delayTimer = setTimeout(() => {
      setStarted(true);
    }, INTRO_DELAY);

    return () => clearTimeout(delayTimer);
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying || !started) return;
    if (lineIndex >= LYRICS.length) return;

    const currentLine = LYRICS[lineIndex];

    // Long pause (e.g. instrumental break between chorus and next verse)
    if (currentLine === 'LONG_PAUSE') {
      const timeout = setTimeout(() => {
        setPrevLine('');
        setDisplayedText('');
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 20000);
      return () => clearTimeout(timeout);
    }

    // Empty lines = short pause between verse sections
    if (currentLine === '') {
      const timeout = setTimeout(() => {
        setPrevLine('');
        setDisplayedText('');
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 700);
      return () => clearTimeout(timeout);
    }

    if (charIndex <= currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(currentLine.slice(0, charIndex));
        setCharIndex((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    }

    // Line finished typing — pause then next line
    const timeout = setTimeout(() => {
      setPrevLine(currentLine);
      setDisplayedText('');
      setLineIndex((prev) => prev + 1);
      setCharIndex(0);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [isPlaying, started, lineIndex, charIndex]);

  if (!isPlaying || !started) return null;
  if (lineIndex >= LYRICS.length) return null;

  const currentLine = LYRICS[lineIndex];
  if (currentLine === 'LONG_PAUSE' || currentLine === '') return null;
  const isTyping = charIndex <= currentLine.length;

  return (
    <div className="lyrics-display">
      {prevLine && (
        <div className="lyrics-prev">{prevLine}</div>
      )}
      <div className="lyrics-current">
        {displayedText}
        {isTyping && <span className="lyrics-cursor" />}
      </div>
    </div>
  );
};

export default LyricsDisplay;
