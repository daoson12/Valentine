import React, { useEffect, useState } from 'react';

const HEART_EMOJIS = ['💗', '💖', '💕', '❤️', '💘', '🩷', '✨', '🌸'];

const FloatingHearts = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Spawn initial batch
    const initial = Array.from({ length: 8 }, () => createParticle());
    setParticles(initial);

    const interval = setInterval(() => {
      setParticles((prev) => {
        const newParticle = createParticle();
        return [...prev, newParticle].slice(-25);
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  function createParticle() {
    const emoji = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
    const size = 0.7 + Math.random() * 1.3;
    const duration = 12 + Math.random() * 10;
    const delay = Math.random() * 4;
    const opacity = 0.3 + Math.random() * 0.5;

    return {
      id: Math.random().toString(36).substr(2, 9),
      emoji,
      left: Math.random() * 100,
      size,
      duration,
      delay,
      opacity,
    };
  }

  return (
    <div className="floating-hearts">
      {particles.map((p) => (
        <div
          key={p.id}
          className="heart-particle"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}rem`,
            opacity: p.opacity,
            animation: `floatUpSway ${p.duration}s ${p.delay}s linear infinite`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
