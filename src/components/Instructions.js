import React from 'react';

const Instructions = ({ onFinishReading }) => (
  <div className="modal">
    <div className="modal-content">
      <p>Instructions:</p>
      <p>Guess the word before you run out of time.</p>
      <ul>
        <li>
          There will be 8 randomly generated letters that you have to use to
          form a five letter-word.
        </li>
        <li>
          There is a randomize position button will change the position of the
          words
        </li>
        <li>
          Each guess must be a valid five-letter word. Hit the enter button to
          submit.
        </li>
        <li>
          After each guess, if you put a valid five-letter word then you will
          gain 10 seconds on the timer
        </li>
        <li>
          If you put in a word that isn't real then you will lose 5 seconds.
        </li>
      </ul>
      <button className="close-button" onClick={onFinishReading}>
        Start
      </button>
    </div>
  </div>
);

export default Instructions;
