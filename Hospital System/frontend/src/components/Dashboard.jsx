import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaUserClock, FaCheckCircle, FaChartBar } from 'react-icons/fa';

const API_URL = 'http://localhost:5000/api';

function Dashboard() {
  const [stats, setStats] = useState({ totalPatients: 0, waitingPatients: 0, servedPatients: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/dashboard`);
        setStats(response.data);
      } catch (error) { console.error('Error:', error); }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <header className="section-header">
        <p>System Overview</p>
        <h1>Hospital Command Center</h1>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total Registrations</div>
          <div className="stat-value">{stats.totalPatients}</div>
          <div style={{ color: '#64748b', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
            <FaUsers /> Cumulative Patient Flow
          </div>
        </div>
        
        <div className="stat-card" style={{ borderLeft: '4px solid #ef4444' }}>
          <div className="stat-label">Active Queue</div>
          <div className="stat-value" style={{ color: '#ef4444' }}>{stats.waitingPatients}</div>
          <div style={{ color: '#64748b', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
            <FaUserClock /> Currently Waiting
          </div>
        </div>

        <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
          <div className="stat-label">Successfully Served</div>
          <div className="stat-value" style={{ color: '#10b981' }}>{stats.servedPatients}</div>
          <div style={{ color: '#64748b', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
            <FaCheckCircle /> Completed Visits
          </div>
        </div>
      </div>

      <div className="form-box" style={{ maxWidth: '100%', padding: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaChartBar color="#2563eb" /> System Status
        </h3>
        <p style={{ color: '#64748b' }}>The queue management system is operational. All departments are currently synchronized with the central database.</p>
      </div>
    </div>
  );
}

export default Dashboard;