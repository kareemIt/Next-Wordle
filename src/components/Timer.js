import React, { useEffect } from 'react';

const Timer = ({
  currentTime,
  setCurrentTime,
  setEndScreen,
  showStartScreen,
}) => {
  if (currentTime <= 0) {
    setEndScreen(true);
  }
  useEffect(() => {
    if (showStartScreen == false) return;

    const updateTime = setInterval(() => {
      setCurrentTime(currentTime - 1);
    }, 1000);
    return () => {
      clearInterval(updateTime);
    };
  }, [currentTime, showStartScreen]);

  return (
    <div>
      <div className="display-time">Time Left: {currentTime} Seconds</div>
    </div>
  );
};
export default Timer;
