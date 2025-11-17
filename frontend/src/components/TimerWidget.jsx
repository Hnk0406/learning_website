import React, { useState, useEffect, useRef } from 'react';

const TimerWidget = ({ mode }) => {
  const [timerTime, setTimerTime] = useState(25 * 60); // 25 minutes in seconds
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  
  // Refs for audio
  const endSoundRef = useRef(null);
  const bgmSoundRef = useRef(null);
  
  // Timer interval reference
  const timerIntervalRef = useRef(null);
  const stopwatchIntervalRef = useRef(null);

  // Timer countdown effect
  useEffect(() => {
    if (isTimerRunning && timerTime > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerTime(time => {
          if (time <= 1) {
            handleTimerEnd();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }

    return () => clearInterval(timerIntervalRef.current);
  }, [isTimerRunning, timerTime]);

  // Stopwatch effect
  useEffect(() => {
    if (isStopwatchRunning) {
      stopwatchIntervalRef.current = setInterval(() => {
        setStopwatchTime(time => time + 1);
      }, 1000);
    } else {
      clearInterval(stopwatchIntervalRef.current);
    }

    return () => clearInterval(stopwatchIntervalRef.current);
  }, [isStopwatchRunning]);

  const handleTimerEnd = () => {
    setIsTimerRunning(false);
    if (endSoundRef.current) {
      endSoundRef.current.play();
    }
    if (bgmSoundRef.current) {
      bgmSoundRef.current.pause();
      bgmSoundRef.current.currentTime = 0;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer functions
  const handleStartTimer = () => {
    setIsTimerRunning(true);
    if (bgmSoundRef.current) {
      bgmSoundRef.current.play();
    }
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
    if (bgmSoundRef.current) {
      bgmSoundRef.current.pause();
      bgmSoundRef.current.currentTime = 0;
    }
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerTime(25 * 60);
    if (bgmSoundRef.current) {
      bgmSoundRef.current.pause();
      bgmSoundRef.current.currentTime = 0;
    }
    if (endSoundRef.current) {
      endSoundRef.current.pause();
      endSoundRef.current.currentTime = 0;
    }
  };

  // Stopwatch functions
  const handleStartStopwatch = () => {
    setIsStopwatchRunning(true);
  };

  const handleStopStopwatch = () => {
    setIsStopwatchRunning(false);
  };

  const handleResetStopwatch = () => {
    setIsStopwatchRunning(false);
    setStopwatchTime(0);
  };

  // Reset when mode changes
  useEffect(() => {
    if (isTimerRunning) handleStopTimer();
    if (isStopwatchRunning) handleStopStopwatch();
  }, [mode]);

  return (
    <>
      {/* Hidden audio elements */}
      <audio ref={endSoundRef} id="end" preload="auto">
        <source src="/assets/sounds/end-sound.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={bgmSoundRef} id="bgm" preload="auto" loop>
        <source src="/assets/sounds/background-music.mp3" type="audio/mpeg" />
      </audio>

      <div
        style={{
          borderRadius: 20,
          background: 'rgba(15, 23, 42, 0.8)',
          padding: 32,
          boxShadow: 'var(--shadow-elevated)',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 8 }}>{mode}</div>
        
        {/* Dynamic Time Display */}
        <div style={{ fontSize: 48, letterSpacing: '0.08em', marginBottom: 16 }}>
          {mode === 'Timer' ? formatTime(timerTime) : formatTime(stopwatchTime)}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          {mode === 'Timer' ? (
            <>
              <button
                type="button"
                onClick={isTimerRunning ? handleStopTimer : handleStartTimer}
                style={{
                  padding: '10px 24px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: isTimerRunning ? '#ef4444' : '#22c55e',
                  color: '#0b1120',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {isTimerRunning ? 'STOP' : 'START'}
              </button>
              <button
                type="button"
                onClick={handleResetTimer}
                style={{
                  padding: '10px 24px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(148, 163, 184, 0.6)',
                  background: 'transparent',
                  color: '#e5e7eb',
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </>
          ) : mode === 'Stopwatch' ? (
            <>
              <button
                type="button"
                onClick={isStopwatchRunning ? handleStopStopwatch : handleStartStopwatch}
                style={{
                  padding: '10px 24px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: isStopwatchRunning ? '#ef4444' : '#22c55e',
                  color: '#0b1120',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {isStopwatchRunning ? 'STOP' : 'START'}
              </button>
              <button
                type="button"
                onClick={handleResetStopwatch}
                style={{
                  padding: '10px 24px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(148, 163, 184, 0.6)',
                  background: 'transparent',
                  color: '#e5e7eb',
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </>
          ) : (
            // Alarms mode (placeholder)
            <>
              <button
                type="button"
                style={{
                  padding: '10px 24px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: '#22c55e',
                  color: '#0b1120',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Set Alarm
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default TimerWidget;