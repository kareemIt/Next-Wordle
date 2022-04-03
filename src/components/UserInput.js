import React, { useState } from 'react';

const UserInput = () => {
  const [board, setBoard] = useState(['a', 'b', 'c', 'd', 'e', 'f']);
  return (
    <div>
      <div className="Game-board">
        {board.map((letter, index) => (
          <div className="letter">{letter}</div>
        ))}
      </div>
    </div>
  );
};
export default UserInput;
