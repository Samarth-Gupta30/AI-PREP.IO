import React, { useState, useEffect } from 'react';
import Button from './Button';

export default function PomodoroTimer() {
  // 1. Initialize your timer state with your calculated 1500 seconds
  const [timeLeft, setTimeLeft] = useState(1500);
  // 2. Track whether the timer clock is running or paused
  const [isActive, setIsActive] = useState(false);


// 1. ADD THIS EFFECT BLOCK FOR THE CLOCK TICKING ENGINE
  useEffect(() => {
    let intervalId = null;

    // Only start counting down if the user clicked "Start" (isActive is true)
    if (isActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // If the timer reaches 00:00, stop the clock and alert the candidate
      setIsActive(false);
      alert("🏆 Focus session complete! Time to take a short break.");
      setTimeLeft(1500); // Automatically reset to 25 mins
    }

    // 2. THE CLEANUP FUNCTION (CRITICAL FOR BACKEND BRAINS!)
    // This runs automatically whenever the user clicks Pause, Reset, or exits the page
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, timeLeft]); // Re-runs this effect loop only when these states change




  // Math translation layers
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="w-full p-6 rounded-2xl border bg-white dark:bg-[#151622] border-purple-100 dark:border-[#26283c] text-center shadow-xl shadow-purple-500/5">
      <p className="text-xs font-black tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-2">
        Focus Session Engine
      </p>
      
      {/* Readable Clock Face */}
      <h2 className="text-5xl font-black font-mono tracking-tight text-gray-900 dark:text-white mb-4">
        {minutes}:{seconds}
      </h2>

      {/* Control Buttons */}
      <div className="flex justify-center gap-3">
        <Button 
          variant={isActive ? "secondary" : "primary"}
          onClick={() => setIsActive(!isActive)}
          className="text-xs font-bold uppercase tracking-wider py-2 px-4"
        >
          {isActive ? '⏸️ Pause' : '▶️ Start'}
        </Button>
        
        <Button 
          variant="danger"
          onClick={() => {
            // 3. YOUR TASK: Write the reset logic inside this click click event
            // Hint: Set isActive back to false, and restore timeLeft back to 1500
            setIsActive(false);
            setTimeLeft(1500);
          }}
          className="text-xs font-bold uppercase tracking-wider py-2 px-4"
        >
          🔄 Reset
        </Button>
      </div>
    </div>
  );
}
