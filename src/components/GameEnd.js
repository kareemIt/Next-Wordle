import React, { useState } from 'react';

const GameEnd = ({ endScreen, results, currentRound, setRestart }) => {
  const reStart = () => {
    setRestart(true);
  };

  return (
    <div className={endScreen ? 'modal' : 'modal-off'}>
      <div className="modal-game-end">
        <p>Game Over</p>
        <p>Round:{currentRound - 1}</p>
        <p>Statistics</p>
        <div className="results">
          {results.map((round, index) => (
            <div>{round}</div>
          ))}
        </div>
        <br />
        <button onClick={reStart} className="close-button">
          Restart
        </button>
      </div>
    </div>
  );
};
export default GameEnd;
