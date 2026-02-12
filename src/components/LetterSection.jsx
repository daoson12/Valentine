import React from 'react';

const LetterSection = ({ onNext }) => {
  const paragraphs = [
    "Before I ever knew your name, I think God was already whispering yours into my story. The way you love Him so deeply only makes me fall for you harder every single day.",
    "You carry a light in you that isn't from this world \u2014 it's the kind of glow that makes everything around you feel safe, warm, and beautiful. I see God's gentleness every time you smile.",
    "I don't know what I did to deserve someone whose heart chases after God the way yours does, but I thank Him every night for placing you in my life.",
    "You are my answered prayer, my favorite blessing, and the most beautiful reminder that God's love is real \u2014 because I feel it every time I'm with you.",
  ];

  return (
    <div className="letter-section section-wrapper">
      <h2 className="letter-title">A Note for You</h2>

      <div className="letter-card glass-card">
        <div className="letter-text">
          {paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>

        <div className="letter-divider" />

        <div className="letter-signature">
          With all my heart &#128140;
        </div>
      </div>

      <div className="letter-btn">
        <button className="btn-valentine-outline" onClick={onNext}>
          There's more...
        </button>
      </div>
    </div>
  );
};

export default LetterSection;
