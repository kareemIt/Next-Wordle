import React, { useState, useEffect } from 'react';

const LetterGenerator = () => {
  const [randomLetters, setRandomLetters] = useState([
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
  ]);

  const randomizePosition = () => {
    let random = randomLetters.sort(() => Math.random() - 0.5);
    setRandomLetters(random);
    console.log(random);
  };

  return (
    <div className="Game-board">
      {randomLetters.map((letters, index) => (
        <div className="letter">{letters}</div>
      ))}
      <button onClick={randomizePosition}>randomize position</button>
    </div>
  );
};
export default LetterGenerator;
