import React from 'react';

const IntroSection = ({ onNext }) => {
  return (
    <div className="intro-section section-wrapper">
      <div className="intro-sparkle">
        &#10024; &#10024; &#10024;
      </div>

      <h1 className="intro-title">
        Hey You
      </h1>

      <p className="intro-subtitle">
        I made something small... just for you.
      </p>

      <div className="intro-btn">
        <button className="btn-valentine" onClick={onNext}>
          Open it &#10084;&#65039;
        </button>
      </div>

      <div className="intro-heart-decoration">
        <span>&#128151;</span>
        <span>&#128150;</span>
        <span>&#128151;</span>
      </div>
    </div>
  );
};

export default IntroSection;
