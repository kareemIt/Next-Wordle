import React, { useState } from 'react';

const Instructions = ({ setStartScreen }) => {
  const [modal, setModal] = useState(true);

  const onClick = () => {
    setStartScreen(true);
    setModal(!modal);
  };

  return (
    <div className={modal ? 'modal' : 'modal-off'}>
      <div className="modal-content">
        <p>Instructions:</p>
        <p>Guess the word before you run out of time.</p>
        <p>
          There will be 8 randomly generatored letters that you have to use to
          form a five letter-word.
        </p>
        <p>
          There is a randomize posisiton button right below the 8 randomly
          generated letters to help you move the letters around.
        </p>
        <p>
          Each guess must be a valid five-letter word. Hit the enter button to
          submit.
        </p>
        <p>
          After each guess, if you put a valid five-letter word then you will
          gain 10 seconds on the timer, if you put in a word that isn't real
          then you will lose 5 seconds.
        </p>
        <p>A new Game will be available each day!</p>
        <button className="close-button" onClick={onClick}>
          Start
        </button>
      </div>
    </div>
  );
};
export default Instructions;
