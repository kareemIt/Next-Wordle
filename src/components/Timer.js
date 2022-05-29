import React, { useEffect } from 'react';

const Timer = ({ onTimeEnd, currentTime, onTimeDecrease, isPaused }) => {
  useEffect(() => {
    if (currentTime === 0) {
      onTimeEnd(currentTime);
    }
  }, [currentTime]);

  useEffect(() => {
    if (currentTime <= 0 || isPaused) return;

    const updateTime = setInterval(() => {
      onTimeDecrease(currentTime - 1);
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
