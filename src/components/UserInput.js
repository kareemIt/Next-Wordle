import React, { useState, useRef, useEffect, useMemo } from 'react';
import { getMapWord } from '../utils/word';

const UserInput = ({ currentWord, onValue, onSubmit, value }) => {
  const wordTracker = useMemo(() => getMapWord(currentWord), [currentWord]);
  const [correctness, setCorrectness] = useState(0);
  const [charInput, setcharInput] = useState('');

  useEffect(() => {
    const updateTime = setInterval(() => {
      if (correctness !== 0) setCorrectness(0);
    }, 450);

    return () => {
      clearInterval(updateTime);
    };
  }, [correctness]);

  const handleKeyDown = (e) => {
    //check if letter is in map then remove it, if u back space then add back 1 to
    //the maps if the input is empty return, update vlaue
    const input = e.currentTarget.value;
    setcharInput(input[input.length - 1]);
    console.log(wordTracker.get(input[input.length - 1]) == 0)
    if (e.nativeEvent.inputType == 'deleteContentBackward') {
      if (wordTracker.has(input[input.length - 1])) return;

      wordTracker.set(charInput, wordTracker.get(charInput) + 1);
      onValue(input);
      setcharInput(input[input.length - 1]);
      return;
    }
    console.log(wordTracker);
    // if no more chars, return early
    if (!wordTracker.has(input[input.length - 1])) return;
    if (wordTracker.get(input[input.length - 1]) == 0) {
      console.log(input);
      return;
    }

    wordTracker.set(charInput, wordTracker.get(charInput) - 1);
    console.log(input);
    onValue(input);
    setcharInput(input[input.length - 1]);
  };

  const inputEl = useRef(null);
  useEffect(() => {
    const focus = () => {
      if (inputEl.current) {
        inputEl.current.focus();
      }
    };
    document.addEventListener('keydown', focus);
    return () => {
      document.removeEventListener('keydown', focus);
    };
  }, []);

  const getClassName = () => {
    if (correctness === 1) return 'user-letters-correct';
    if (correctness === -1) return 'user-letters-incorrect';
    return 'user-letters';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length < 5) return;

    console.log(onSubmit);
    const submitted = onSubmit();
    console.log(submitted);
    submitted ? setCorrectness(1) : setCorrectness(-1);
  };

  return (
    <div>
      <div className="Game-board">
        {[...value.padEnd(5, ' ')].map((letter, index) => (
          <div className={getClassName()} key={index}>
            {letter.toUpperCase()}
          </div>
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
