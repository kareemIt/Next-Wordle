import React, { useState, useEffect } from 'react';
import { Alphabet } from '../WordBank';

const LetterGenerator = (currentWord) => {
  const [randomUserLetters, setRandomUserLetters] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  useEffect(() => {
    const copyArray = [...currentWord.currentWord].sort(
      () => Math.random() - 0.5
    );
    const shuffleAlphabet = Alphabet.sort(() => 0.5 - Math.random());
    const selectedShuffle = shuffleAlphabet.slice(0, 3);
    const combiningArrs = [...copyArray, ...selectedShuffle];
    const finalArr = combiningArrs.sort(() => Math.random() - 0.5);
    setRandomUserLetters(finalArr);
  }, [currentWord]);

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
