import React from 'react';
import './style.css';
import Timer from './components/Timer';
import Instructions from './components/Instructions';
import GameEnd from './components/GameEnd';
import LetterGenerator from './components/LetterGenerator';
import UserInput from './components/UserInput';

export default function App() {
  return (
    <div>
      <Instructions />
      <GameEnd />
      <h1>GAME NAME</h1>
      <h1>Round</h1>
      <Timer />
      <UserInput />
      <LetterGenerator />
    </div>
  );
}
