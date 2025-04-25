import React, { useState, useEffect, useCallback } from 'react';
import { Clock } from 'lucide-react';
import { STRINGS } from '../strings';

interface TimerProps {
  duration: number; // in seconds
  onComplete: () => void;
  key?: string | number; // For forcing re-render
}

const Timer: React.FC<TimerProps> = ({ duration, onComplete, key }) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  // Calculate percentage for progress bar
  const percentageLeft = (timeLeft / duration) * 100;
  
  // Reset and start timer
  const resetTimer = useCallback(() => {
    setTimeLeft(duration);
  }, [duration]);
  
  // Toggle pause state
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  // Reset timer when duration changes
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  // Timer effect
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return duration;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [duration, isPaused, onComplete]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto" key={key}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center text-yellow-300">
          <Clock className="w-5 h-5 mr-2" />
            <span className="font-mono text-lg">{STRINGS.timer.timeLeftLabel}</span>
            {/* <span className="font-mono text-lg">"trololololo"</span> */}
        </div>
        <button
          onClick={togglePause}
          className="text-sm px-3 py-1 rounded-full bg-yellow-800 text-yellow-200 hover:bg-yellow-700 transition-colors"
        >
          {isPaused ? STRINGS.timer.resumeButton : STRINGS.timer.pauseButton}
          {/* {isPaused ? "R" : "P"} */}
        </button>
      </div>
      
      <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 to-yellow-500 transition-all duration-1000 ease-linear"
          style={{ width: `${percentageLeft}%` }}
        />
      </div>
      
      <div className="mt-2 text-right">
        <span className="font-mono text-xl text-yellow-200">{formatTime(timeLeft)}</span>
      </div>
    </div>
  );
};

export default Timer;