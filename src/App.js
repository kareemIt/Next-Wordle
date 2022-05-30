import React, { useState, useEffect } from 'react';
import './style.css';
import Axios from 'axios';
import Timer from './components/Timer';
import Instructions from './components/Instructions';
import GameEnd from './components/GameEnd';
import UserInput from './components/UserInput';
import { getRandomWord, getMapWord } from './utils/word';

export default function App() {
  const [currentWord, setCurrentWord] = useState('');
  const [currentRound, setCurrentRound] = useState(1);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(60);
  const [showStartScreen, setShowStartScreen] = useState(false);
  const [results, setResults] = useState([]);
  const [nextRound, setNextRound] = useState(false);
  const [wordTracker, setWordTracker] = useState();
  const [showRestart, setShowRestart] = useState(false);
  const [board, setBoard] = useState('');
  const [correctness, setCorrectness] = useState(0);

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
    setWordTracker();
    setShowRestart(false);
    setBoard('');
  };
  const handleFinishReading = () => {
    setShowStartScreen(true);
  };

  useEffect(() => {
    setCurrentWord(getRandomWord());
    setNextRound(false);
  }, [nextRound]);

  useEffect(() => {
    setWordTracker(getMapWord(currentWord));
  }, [currentWord]);

  const updateBoard = (value) => {
    setBoard(value);
  };
  const updateCorrectness = (value) => {
    setCorrectness(value);
  };

  const handleSubmit = () => {
    const data = Axios.get(
      'https://www.wordreference.com/es/translation.asp?tranword=' + board
    );
    data.then((value) => {
      const validWord = value.data.includes('dMatch = true');
      if (validWord) {
        setCurrentRound(currentRound + 1);
        setCurrentTime(currentTime + 10);
        setResults([
          ...results,
          'Round:' +
            currentRound +
            ',Word:' +
            board +
            ',Letters:' +
            currentWord,
        ]);
        setNextRound(true);
        setCorrectness(1);
      }
      if (!validWord) {
        setCurrentTime(currentTime - 5);
        setCorrectness(-1);
        setWordTracker(getMapWord(currentWord));
      }
      setBoard('');
    });
  };
  return (
    <div className="container">
      {!showStartScreen && (
        <Instructions onFinishReading={handleFinishReading} />
      )}

      <GameEnd
        endScreen={showEndScreen}
        results={results}
        currentRound={currentRound}
        restartFunc={restartGame}
      />

      <div className="title">
        <h1>Worddom</h1>
        <h1>Round {currentRound}</h1>
      </div>

      <Timer
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        setEndScreen={setShowEndScreen}
        showStartScreen={showStartScreen}
      />

      <UserInput
        currentWord={currentWord}
        wordTracker={wordTracker}
        restart={showRestart}
        onSubmit={handleSubmit}
        board={board}
        updateBoard={updateBoard}
        correctness={correctness}
        updateCorrectness={updateCorrectness}
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
