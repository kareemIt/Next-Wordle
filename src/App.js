import React, { useState, useEffect } from 'react';
import './style.css';
import Timer from './components/Timer';
import Instructions from './components/Instructions';
import GameEnd from './components/GameEnd';
import UserInput from './components/UserInput';

export default function App({ word }) {
  const [currentRound, setCurrentRound] = useState(1);
  const [endScreen, setEndScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(60);
  const [startScreen, setStartScreen] = useState(false);

  const randomizePosition = () => {
    word.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="container">
      <Instructions setStartScreen={setStartScreen} />
      {/* <GameEnd endScreen={endScreen} /> */}
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
        word={word}
      />
      <div className="Game-board">
        {[...word].map((letters) => (
          <div className="letter">{letters.toUpperCase()}</div>
        ))}
      </div>
      <button onClick={randomizePosition}>randomize position</button>
    </div>
  );
}
