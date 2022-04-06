import React, { useState } from 'react';

const GameEnd = ({ endScreen }) => {
  const [modal, setModal] = useState(true);

  const onClick = () => {
    setModal(!modal);
  };

  return (
    <div className={endScreen ? 'modal' : 'modal-off'}>
      <div className="modal-content">
        <p>GameEnd</p>
        <p>Round </p>
        <p>current word</p>
        <p>Statisitcs:</p>
        <p>round,word,letters</p>
        <p>Time left till next run</p>
        <button className="close-button" onClick={onClick}>
          Share
        </button>
      </div>
    </div>
  );
};
export default GameEnd;
