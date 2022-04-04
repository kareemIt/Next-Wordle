import React, { useState, useEffect } from 'react';
import './style.css';
import Timer from './components/Timer';
import Instructions from './components/Instructions';
import GameEnd from './components/GameEnd';
import LetterGenerator from './components/LetterGenerator';
import UserInput from './components/UserInput';
import { WordBank } from './WordBank.js';

export default function App() {
  const words = WordBank;
  const [currentWord, setCurrentWord] = useState('');
  const [currentRound, setCurrentRound] = useState(1);
  const [endScreen, setEndScreen] = useState(false);

  useEffect(() => {
    const random = Math.floor(Math.random() * words.length);
    setCurrentWord(words[random]);
  }, []);
  return (
    <div className="container">
      {/* <Instructions /> */}
      {/* <GameEnd endScreen={endScreen} /> */}
      <div className="title">
        <h1>GAME NAME</h1>
        <h1>Round {currentRound}</h1>
      </div>
      <Timer setEndScreen={setEndScreen} />
      <UserInput
        setCurrentRound={setCurrentRound}
        currentRound={currentRound}
      />
      <LetterGenerator currentWord={currentWord} />
    </div>
  );
}
