## JSX placeholder for dashboard

import React from 'react';

const Dashboard = () => (
  <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
    <h1>System Dashboard</h1>
    <ul>
      <li>Tenants: 14</li>
      <li>Payments: 92%</li>
      <li>Alerts: 3 pending</li>
    </ul>
  </div>
);

export default Dashboard;
