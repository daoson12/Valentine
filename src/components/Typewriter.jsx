import React, { useState, useEffect, useRef } from 'react';

const Typewriter = ({ text, speed = 40, className }) => {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed('');
    indexRef.current = 0;

    const interval = setInterval(() => {
      indexRef.current += 1;
      if (indexRef.current <= text.length) {
        setDisplayed(text.slice(0, indexRef.current));
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  const done = displayed.length === text.length;

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="typewriter-cursor" />}
    </span>
  );
};

export default Typewriter;
