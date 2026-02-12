import React, { useState, useEffect } from 'react';

const memories = [
  { emoji: '\uD83C\uDF57', label: 'Our SFC date' },
  { emoji: '\uD83C\uDFDD\uFE0F', label: 'Peace Island' },
  { emoji: '\uD83D\uDC92', label: 'Wedding together' },
  { emoji: '\u2728', label: 'Evangelism together' },
  { emoji: '\uD83C\uDF66', label: 'Ice cream date' },
  { emoji: '\uD83E\uDDFA', label: 'Picnic with her family' },
  { emoji: '\uD83D\uDECB\uFE0F', label: 'Sleepover vibes' },
  { emoji: '\uD83D\uDC87\u200D\u2640\uFE0F', label: 'Loosing her hair' },
];

const MemorySection = ({ onNext }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      let vday = new Date(now.getFullYear(), 1, 14);
      if (vday < now) vday.setFullYear(vday.getFullYear() + 1);

      const diff = vday - now;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="memory-section section-wrapper">
      <h2 className="memory-title">Us Since Day 1</h2>

      <div className="memory-grid">
        {memories.map((mem, i) => (
          <div key={i} className="memory-card glass-card">
            <div className="memory-card-image">
              {mem.emoji}
            </div>
            <p className="memory-card-label">{mem.label}</p>
          </div>
        ))}
      </div>

      <div className="countdown-wrapper">
        <p className="countdown-label">Valentine's Day Countdown</p>
        <div className="countdown-timer">
          <div className="countdown-unit glass-card">
            <span className="countdown-number">{timeLeft.days}</span>
            <span className="countdown-unit-label">Days</span>
          </div>
          <div className="countdown-unit glass-card">
            <span className="countdown-number">{timeLeft.hours}</span>
            <span className="countdown-unit-label">Hours</span>
          </div>
          <div className="countdown-unit glass-card">
            <span className="countdown-number">{timeLeft.minutes}</span>
            <span className="countdown-unit-label">Min</span>
          </div>
          <div className="countdown-unit glass-card">
            <span className="countdown-number">{timeLeft.seconds}</span>
            <span className="countdown-unit-label">Sec</span>
          </div>
        </div>
      </div>

      <div className="memory-btn">
        <button className="btn-valentine" onClick={onNext}>
          Go to the best part...
        </button>
      </div>
    </div>
  );
};

export default MemorySection;
