import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import { getMapWord } from '../utils/word';

const UserInput = ({
  setCurrentRound,
  currentRound,
  currentTime,
  setCurrentTime,
  currentWord,
  setResults,
  setNextRound,
  wordTracker,
  setWordTracker,
  results,
  restart,
}) => {
  const [board, setBoard] = useState('');
  const inputEl = useRef(null);
  const [correctness, setCorrectness] = useState(0);

  useEffect(() => {
    setBoard('');
  }, [restart]);

  useEffect(() => {
    const updateTime = setInterval(function () {
      if (correctness != 0) setCorrectness(0);
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
      setBoard(input);
      return;
    }
    if (wordTracker.get(charInput) == 0) return;
    if (!currentWord.includes([...input][board.length].toLowerCase())) return;
    if (wordTracker.get(charInput) != 0) {
      wordTracker.set(charInput, wordTracker.get(charInput) - 1);
    }

    setBoard(input);
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
      inputEl.current.value = '';
    });
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
