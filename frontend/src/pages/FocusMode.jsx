import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import TimerWidget from '../components/TimerWidget.jsx';

export default function FocusMode() {
  const [mode, setMode] = useState('Timer');
  const [stats, setStats] = useState({
    todayFocusTime: 0, // in seconds
    completedPomodoros: 0,
    longestStreak: 0, // in seconds
    currentSessionTime: 0 // in seconds
  });

  const [sessionHistory, setSessionHistory] = useState([]);

  // Load stats from localStorage on component mount
  useEffect(() => {
    const savedStats = localStorage.getItem('focusModeStats');
    const savedHistory = localStorage.getItem('sessionHistory');
    
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
    if (savedHistory) {
      setSessionHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('focusModeStats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  // Function to update stats when timer completes
  const handleSessionComplete = (sessionData) => {
    const newStats = {
      ...stats,
      todayFocusTime: stats.todayFocusTime + sessionData.duration,
      completedPomodoros: stats.completedPomodoros + (sessionData.type === 'pomodoro' ? 1 : 0),
      longestStreak: Math.max(stats.longestStreak, sessionData.duration)
    };

    setStats(newStats);

    // Add to session history
    const newSession = {
      id: Date.now(),
      type: sessionData.type,
      duration: sessionData.duration,
      completedAt: new Date().toISOString(),
      mode: mode
    };
    
    setSessionHistory(prev => [newSession, ...prev.slice(0, 49)]); // Keep last 50 sessions
  };

  // Function to reset daily stats (could be called at midnight)
  const resetDailyStats = () => {
    setStats(prev => ({
      ...prev,
      todayFocusTime: 0,
      completedPomodoros: 0
    }));
  };

  // Calculate today's sessions from history
  const getTodaySessions = () => {
    const today = new Date().toDateString();
    return sessionHistory.filter(session => 
      new Date(session.completedAt).toDateString() === today
    );
  };

  // Format seconds to hours and minutes
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Calculate current streak (consecutive focused days)
  const calculateCurrentStreak = () => {
    if (sessionHistory.length === 0) return 0;
    
    const dates = [...new Set(sessionHistory.map(s => 
      new Date(s.completedAt).toDateString()
    ))].sort().reverse();
    
    let streak = 0;
    let currentDate = new Date();
    
    for (let i = 0; i < dates.length; i++) {
      const sessionDate = new Date(dates[i]);
      const diffTime = currentDate - sessionDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const todaySessions = getTodaySessions();
  const currentStreak = calculateCurrentStreak();

  return (
    <div>
      <Navbar />
      <main
        style={{
          minHeight: 'calc(100vh - var(--nav-height))',
          background: 'var(--gradient-focus-dark)',
          padding: '24px 16px 40px'
        }}
      >
        <div className="screen-max-width" style={{ color: '#ffffff' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <h1 style={{ margin: 0, fontSize: 18 }}>Focus Mode</h1>
              <p style={{ margin: '4px 0 0', fontSize: 12, opacity: 0.8 }}>
                Stay focused and track with timer and stopwatch.
              </p>
            </div>
            <div
              style={{
                display: 'inline-flex',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(15, 23, 42, 0.6)',
                padding: 4
              }}
            >
              {['Timer', 'Stopwatch'].map((label) => {
                const isActive = mode === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleModeChange(label)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-pill)',
                      border: 'none',
                      background: isActive ? '#ffffff' : 'transparent',
                      color: isActive ? '#111827' : '#e5e7eb',
                      fontSize: 12,
                      cursor: 'pointer'
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </header>

          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.2fr)',
              gap: 24,
              alignItems: 'stretch'
            }}
          >
            {/* Timer Widget Component with session complete callback */}
            <TimerWidget 
              mode={mode} 
              onSessionComplete={handleSessionComplete}
            />

            <div
              style={{
                borderRadius: 20,
                background: 'rgba(15, 23, 42, 0.8)',
                padding: 24,
                boxShadow: 'var(--shadow-elevated)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 14 }}>Session Stats</h2>
                <button
                  onClick={resetDailyStats}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: 10,
                    cursor: 'pointer'
                  }}
                >
                  Reset Day
                </button>
              </div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 12 }}>
                <li style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Today focus time:</span>
                  <span style={{ fontWeight: 500 }}>{formatTime(stats.todayFocusTime)}</span>
                </li>
                <li style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Completed pomodoros:</span>
                  <span style={{ fontWeight: 500 }}>{stats.completedPomodoros}</span>
                </li>
                <li style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Longest streak:</span>
                  <span style={{ fontWeight: 500 }}>{formatTime(stats.longestStreak)}</span>
                </li>
                <li style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Current streak:</span>
                  <span style={{ fontWeight: 500 }}>{currentStreak} days</span>
                </li>
                <li style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Today sessions:</span>
                  <span style={{ fontWeight: 500 }}>{todaySessions.length}</span>
                </li>
              </ul>

              {/* Recent Sessions */}
              {todaySessions.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <h3 style={{ margin: '16px 0 8px', fontSize: 12, opacity: 0.8 }}>Recent Sessions</h3>
                  <div style={{ maxHeight: 120, overflowY: 'auto' }}>
                    {todaySessions.slice(0, 5).map(session => (
                      <div 
                        key={session.id} 
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: 10,
                          padding: '4px 0',
                          borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}
                      >
                        <span>{session.type}</span>
                        <span>{formatTime(session.duration)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}