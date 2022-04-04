import React, { useState, useEffect } from 'react';

const Timer = ({ setEndScreen }) => {
  const [currentTime, setCurrentTime] = useState(60);

  if (currentTime == 0) {
    setEndScreen(true);
  }
  useEffect(() => {
    const updateTime = setInterval(function () {
      setCurrentTime(currentTime - 1);
    }, 1000);
    return () => {
      clearInterval(updateTime);
    };
  }, [currentTime]);

  return (
    <div>
      <div className="display-time">Time Left: {currentTime} Seconds</div>
    </div>
  );
};
export default Timer;
