import React, { useState, useRef, useEffect } from 'react';
import Axios from 'axios';

const UserInput = ({ setCurrentRound, currentRound }) => {
  const [board, setBoard] = useState('');
  const inputEl = useRef(null);

  const handleKeyDown = (e) => {
    setBoard(e.currentTarget.value);
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
      console.log(value.data.includes('fMatch = true'));
    });
    setCurrentRound(currentRound + 1);
    setBoard('');
    inputEl.current.value = '';
  };
  return (
    <div>
      <div className="Game-board">
        {[...board.padEnd(5, ' ')].map((letter, index) => (
          <div className="user-letters">{letter}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          onInput={handleKeyDown}
          ref={inputEl}
          type="text"
          maxLength="5"
          className="user-input"
        />
      </form>
    </div>
  );
};
export default UserInput;
