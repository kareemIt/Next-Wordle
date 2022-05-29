import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './style.css';
import Timer from './components/Timer';
import Instructions from './components/Instructions';
import GameEnd from './components/GameEnd';
import UserInput from './components/UserInput';
import { getRandomWord, getMapWord } from './utils/word';

export default function App() {
  const [currentRound, setCurrentRound] = useState(1);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(false);

  const [currentTime, setCurrentTime] = useState(60);
  const [results, setResults] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [nextRound, setNextRound] = useState(false);

  const randomizePosition = () => {
    currentWord.sort(() => Math.random() - 0.5);
  };

  const restartGame = () => {
    setCurrentRound(1);
    setShowEndScreen(false);
    setCurrentTime(60);
    setResults([]);
    setCurrentWord(getRandomWord());
    setNextRound(false);
  };

  useEffect(() => {
    setCurrentWord(getRandomWord());
    setNextRound(false);
  }, [nextRound]);

  const handleNewValue = (value) => {
    setUserInput(value);
  };

  const handleFinishReading = () => {
    setShowStartScreen(true);
  };

  const handleSubmit = () => {
    fetch(
      'https://www.wordreference.com/es/translation.asp?tranword=' + userInput
    )
      .then((res) => res.text())
      .then((text) => {
        const validWord = text.includes('dMatch = true');
        if (validWord) {
          setCurrentRound(currentRound + 1);
          setCurrentTime(currentTime + 10);
          setResults([
            ...results,
            'Round:' +
              currentRound +
              ',Word:' +
              userInput +
              ',Letters:' +
              currentWord,
          ]);
          setUserInput('');
          setNextRound(true);
        }
        if (!validWord) {
          setCurrentTime(currentTime - 5);
          setUserInput('');
        }
      });
  };

  const handleTimerOver = () => {
    setShowEndScreen(true);
  };
  const handleTimeDecrease = (newTime) => {
    setCurrentTime(newTime);
  };

  return (
    <div className="container">
      {/* {!showStartScreen && (
        <Instructions onFinishReading={handleFinishReading} />
      )} */}

      {showEndScreen && (
        <GameEnd
          results={results}
          currentRound={currentRound}
          restartFunc={restartGame}
        />
      )}

      <div className="title">
        <h1>Worddom</h1>
        <h1>Round {currentRound}</h1>
      </div>

      <Timer
        currentTime={currentTime}
        onTimeEnd={handleTimerOver}
        onTimeDecrease={handleTimeDecrease}
        isPaused={showStartScreen}
      />

      <UserInput
        currentWord={currentWord}
        onValue={handleNewValue}
        onSubmit={handleSubmit}
        value={userInput}
      />

      <div className="Game-board">
        {[...currentWord].map((letters, index) => (
          <div className="letter" key={index}>
            {letters.toUpperCase()}
          </div>
        ))}
      </div>

      <button onClick={randomizePosition}>randomize position</button>
    </div>
  );
}
