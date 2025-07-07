import React from 'react';
import { useLocation } from 'react-router-dom';

const JourneyLog = () => {
  const [logs, setLogs] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/journey_log')
      .then(res => res.json())
      .then(data => setLogs(data.reverse()));
  }, []);

  return (
    <div>
      <h1>🧭 Axis Journey Log</h1>
      <ul>
        {logs.map((entry, i) => (
          <li key={i}>
            <strong>{entry.timestamp}</strong>: {entry.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

const usePageTracker = () => {
  const location = useLocation();

  React.useEffect(() => {
fetch('/api/log_journey', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: `👣 Visited ${location.pathname}` }),
    });
  }, [location]);

  return null;
};

export { JourneyLog, usePageTracker as UsePageTracker };
