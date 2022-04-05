import React, { useState, useEffect } from 'react';


const LetterGenerator = () => {
  const randomizePosition = () => {
    const copyArray = [...randomUserLetters];
    setRandomUserLetters(copyArray.sort(() => Math.random() - 0.5));
  };

  return (
    <div>
      <div className="Game-board">
        {randomUserLetters.map((letters, index) => (
          <div className="letter">{letters.toUpperCase()}</div>
        ))}
      </div>
      <button onClick={randomizePosition}>randomize position</button>
    </div>
  );
};
export default LetterGenerator;
