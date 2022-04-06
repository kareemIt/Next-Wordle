import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';
import { getRandomWord } from '../utils/word';

const UserInput = ({
  setCurrentRound,
  currentRound,
  currentTime,
  setCurrentTime,
  word,
  setResults,
}) => {
  const [board, setBoard] = useState('');
  const copyArry = [];
  const inputEl = useRef(null);
  const [value, setValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.nativeEvent.inputType == 'deleteContentBackward') {
      setBoard(
        e.currentTarget.value.substring(
          e.currentTarget.value[board.length] - 1,
          e.currentTarget.value[board.length]
        )
      );
      setValue(
        e.currentTarget.value.substring(
          e.currentTarget.value[board.length] - 1,
          e.currentTarget.value[board.length]
        )
      );
    }
    if (!word.includes([...e.currentTarget.value][board.length])) {
      // setValue(e.currentTarget.value);
      return;
    }
    setValue(e.currentTarget.value);
    setBoard(e.currentTarget.value);
    setBoard(inputEl.current.value);
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
    if (inputEl.current.value.length < 5) {
      return;
    }
    const data = Axios.get(
      'https://www.wordreference.com/es/translation.asp?tranword=' + board
    );
    data.then((value) => {
      const validWord = value.data.includes('dMatch = true');
      if (validWord) {
        setCurrentRound(currentRound + 1);
        setCurrentTime(currentTime + 10);
        copyArry.push(
          'Round:' + currentRound + ',word:' + board + ',letters:' + word
        );
        console.log(copyArry);
        setResults(copyArry);
      } else {
        setCurrentTime(currentTime - 5);
      }
      setBoard('');
      inputEl.current.value = '';
    });
  };
  return (
    <div>
      <div className="Game-board">
        {[...board.padEnd(5, ' ')].map((letter, index) => (
          <div className="user-letters">{letter.toUpperCase()}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleKeyDown}
          ref={inputEl}
          value={value}
          type="text"
          maxLength="5"
          className="user-input"
        />
      </form>
    </div>
  );
};
export default UserInput;
