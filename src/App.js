import React, { useState, useEffect } from 'react';
import './style.css';
import Timer from './components/Timer';
import Instructions from './components/Instructions';
import GameEnd from './components/GameEnd';
import UserInput from './components/UserInput';
import { getRandomWord, getMapWord } from './utils/word';

export default function App() {
  const [currentRound, setCurrentRound] = useState(1);
  const [endScreen, setEndScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(30);
  const [startScreen, setStartScreen] = useState(false);
  const [results, setResults] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [nextRound, setNextRound] = useState(false);

  const randomizePosition = () => {
    currentWord.sort(() => Math.random() - 0.5);
  };
  useEffect(() => {
    setCurrentWord(getRandomWord());
    setNextRound(false);
  }, [nextRound]);
  console.log(getMapWord(currentWord));

  return (
    <div className="container">
      <Instructions setStartScreen={setStartScreen} />
      <GameEnd
        endScreen={endScreen}
        results={results}
        currentRound={currentRound}
      />
      <div className="title">
        <h1>GAME NAME</h1>
        <h1>Round {currentRound}</h1>
      </div>
      <Timer
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        setEndScreen={setEndScreen}
        startScreen={startScreen}
      />
      <UserInput
        setCurrentRound={setCurrentRound}
        currentRound={currentRound}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        currentWord={currentWord}
        setResults={setResults}
        setNextRound={setNextRound}
      />
      <div className="Game-board">
        {[...currentWord].map((letters) => (
          <div className="letter">{letters.toUpperCase()}</div>
        ))}
      </div>
      <button onClick={randomizePosition}>randomize position</button>
    </div>
  );
}
