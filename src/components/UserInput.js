import React, { useState, useRef, useEffect } from 'react';

const UserInput = () => {
  const [board, setBoard] = useState(['1', '2', '3', '4', '5', '6']);
  let inputEl;

  const handleKeyDown = (e) => {
    inputEl = { ...e.target.value };
    const arr = inputEl.map((letter) => letter);
    console.log(inputEl);
  };

  useEffect(() => {
    const focus = (e) => inputEl && inputEl.current.focus();
    document.addEventListener('keydown', focus);
    return () => {
      document.removeEventListener('keydown', focus);
    };
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (inputEl.current.value.length < 5) {
  //     return;
  //   }
  //   inputEl.current.value = '';
  //   onEnter();
  // };
  return (
    <div>
      <div className="Game-board">
        {board.map((letter, index) => (
          <div className="user-letters">{letter}</div>
        ))}
      </div>
      <form>
        <input
          onInput={handleKeyDown}
          type="text"
          maxLength="5"
          className="user-input"
        />
      </form>
    </div>
  );
};
export default UserInput;
