import React, { useState, useEffect } from 'react';

function TimeTracker() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [canPause, setCanPause] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  useEffect(() => {
    const updateCurrentDate = () => {
      const now = new Date();
      const options = { weekday: 'long', month: 'long', day: 'numeric' };
      const formattedDate = now.toLocaleDateString(undefined, options);
      setCurrentDate(formattedDate);
    };

    updateCurrentDate();
    const interval = setInterval(updateCurrentDate, 60000); // Update current date every minute

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    setTimeout(() => {
      setCanPause(true);
    }, 15000);
  };

  const handlePause = () => {
    if (canPause) {
      setIsRunning(false);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timeInSeconds % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  };

  return (
    <div className="time-tracker-container">
      <div className="date-container">
        <h2>{currentDate}</h2>
      </div>
      <div className="time-display">{formatTime(time)}</div>
      <div className="button-container">
        {!isRunning ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button disabled={!canPause} onClick={handlePause}>
            Pause
          </button>
        )}
      </div>
    </div>
  );
}

export default TimeTracker;
