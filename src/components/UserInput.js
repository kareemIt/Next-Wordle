import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import { getMapWord } from '../utils/word';

const UserInput = ({
  currentWord,
  wordTracker,
  restart,
  onSubmit,
  board,
  updateBoard,
  correctness,
  updateCorrectness,
}) => {
  const inputEl = useRef(null);

  useEffect(() => {
    updateBoard('');
  }, [restart]);

  useEffect(() => {
    const updateTime = setInterval(function () {
      if (correctness != 0) updateCorrectness(0);
    }, 450);
    return () => {
      clearInterval(updateTime);
    };
  }, [correctness]);

  const handleKeyDown = (e) => {
    let input = e.currentTarget.value;
    let charInput = input[input.length - 1];
    if (e.nativeEvent.inputType == 'deleteContentBackward') {
      wordTracker.set(
        board[board.length - 1],
        wordTracker.get(board[board.length - 1]) + 1
      );
      updateBoard(input);
      return;
    }
    if (wordTracker.get(charInput) == 0) return;
    if (!currentWord.includes([...input][board.length].toLowerCase())) return;
    if (wordTracker.get(charInput) != 0) {
      wordTracker.set(charInput, wordTracker.get(charInput) - 1);
    }

    updateBoard(input);
  };

  useEffect(() => {
    const focus = (e) => {
      if (inputEl.current) {
        inputEl.current.focus();
      }
    };
    document.addEventListener('keydown', focus);
    return () => {
      document.removeEventListener('keydown', focus);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputEl.current.value.length < 5) return;

    onSubmit();
  };
  const getClassName = () => {
    if (correctness === 1) return 'user-letters-correct';
    if (correctness === -1) return 'user-letters-incorrect';
    return 'user-letters';
  };

  return (
    <div>
      <div className="Game-board">
        {[...board.padEnd(5, ' ')].map((letter, index) => (
          <div className={getClassName()} key={index}>
            {letter.toUpperCase()}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleKeyDown}
          ref={inputEl}
          value={board}
          type="text"
          maxLength="5"
          className="user-input"
        />
      </form>
    </div>
  );
};
export default UserInput;
