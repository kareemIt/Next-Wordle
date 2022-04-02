import React, { useState } from 'react';

const UserInput = () => {
  const [board, setBoard] = useState(['a', 'b', 'c', 'd', 'e', 'f']);
  return (
    <div className="Game-board">
      {board.map((letter, index) => (
        <div className="letter">{letter}</div>
      ))}
    </div>
  );
};
export default UserInput;
