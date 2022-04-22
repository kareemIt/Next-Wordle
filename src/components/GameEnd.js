import React, { useState } from 'react';

const GameEnd = ({ endScreen, results, currentRound, setRestart }) => {
  const reStart = () => {
    setRestart(true);
  };

  return (
    <div className={endScreen ? 'modal' : 'modal-off'}>
      <div className="modal-game-end">
        <p>Game Over</p>
        <p>Round:{currentRound}</p>
        <p>Statisitcs:</p>
        <div className="results">
          {results.map((round, index) => (
            <div>{round}</div>
          ))}
        </div>
        <p>Time left till next run</p>
        <button onClick={reStart}>Restart</button>
      </div>
    </div>
  );
};
export default GameEnd;
