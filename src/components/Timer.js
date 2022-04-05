import React, { useState, useEffect } from 'react';

const Timer = ({ currentTime, setCurrentTime, setEndScreen, startScreen }) => {
  if (currentTime <= 0) {
    setEndScreen(true);
  }
  console.log(startScreen);
  useEffect(() => {
    if (!startScreen) {
      return;
    }
    const updateTime = setInterval(function () {
      setCurrentTime(currentTime - 1);
    }, 1000);
    return () => {
      clearInterval(updateTime);
    };
  }, [currentTime, startScreen]);

  return (
    <div>
      <div className="display-time">Time Left: {currentTime} Seconds</div>
    </div>
  );
};
export default Timer;
