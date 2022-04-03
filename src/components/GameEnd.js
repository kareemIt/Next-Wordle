import React, { useState } from 'react';

const GameEnd = () => {
  const [modal, setModal] = useState(true);

  const onClick = () => {
    setModal(!modal);
  };

  return (
    <div className={modal ? 'modal' : 'modal-off'}>
      <div className="modal-content">
        <p>GameEnd</p>
        <p>words</p>
        <button className="close-button" onClick={onClick}>
          +
        </button>
      </div>
    </div>
  );
};
export default GameEnd;
