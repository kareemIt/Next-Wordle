import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [currentTime, setCurrentTime] = useState(60);

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
      <div>Time Left: {currentTime} Seconds</div>
    </div>
  );
};
export default Timer;
