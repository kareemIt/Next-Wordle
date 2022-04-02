import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(60);

  useEffect(() => {
    let updatedTime = setInterval(function () {
      let updatingTime = currentTime - 1;
      setCurrentTime(updatingTime);
    }, 1000);
  });

  return (
    <div>
      <div>Time Left: {currentTime}</div>
    </div>
  );
};
export default Timer;
