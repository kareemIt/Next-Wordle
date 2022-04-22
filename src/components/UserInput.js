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
}) => {
  const [board, setBoard] = useState('');
  const [copyArray, setCopyArray] = useState([]);
  const inputEl = useRef(null);
  const [value, setValue] = useState('');

  const handleKeyDown = (e) => {
    let input = e.currentTarget.value;
    let charInput = input[input.length - 1];
    if (e.nativeEvent.inputType == 'deleteContentBackward') {
      if (wordTracker.has(value[value.length - 1])) {
        wordTracker.set(
          value[value.length - 1],
          wordTracker.get(value[value.length - 1]) + 1
        );
      }
      let substring = input.substring(0, input.length);
      setBoard(substring);
      setValue(substring);
      return;
    }
    if (wordTracker.get(charInput) == 0) {
      return;
    }
    if (wordTracker.has(charInput) && wordTracker.get(charInput) != 0) {
      wordTracker.set(charInput, wordTracker.get(charInput) - 1);
    }
    if (
      !currentWord.includes([...input][board.length].toLowerCase()) ||
      !wordTracker.has(charInput)
    ) {
      return;
    }
    setBoard(input);
    setValue(input);
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
        setCopyArray([
          ...copyArray,
          'Round:' +
            currentRound +
            ',Word:' +
            board +
            ',Letters:' +
            currentWord,
        ]);
        console.log(copyArray);
        setResults(copyArray);
        setValue('');
        setNextRound(true);
      } else {
        setCurrentTime(currentTime - 5);
        setValue('');
        setWordTracker(getMapWord(currentWord));
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
