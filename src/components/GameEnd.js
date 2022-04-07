import React, { useState } from 'react';

const GameEnd = ({ endScreen, results }) => {
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
        {results.map((row, index) => {
          <div>
            <p>{row}</p>
          </div>;
        })}
        <p>Time left till next run</p>
        <button onClick={onClick}>Share</button>
      </div>
    </div>
  );
};
export default GameEnd;
