import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArchive, FaCalendarCheck } from 'react-icons/fa';

const API_URL = 'http://localhost:5000/api';

function PatientHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_URL}/history`);
        setHistory(res.data);
      } catch (err) { console.error('Error fetching history:', err); }
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <header className="section-header">
        <p>Medical Archives</p>
        <h1>Patient Visit History</h1>
      </header>

      <div className="queue-list">
        <div className="queue-item" style={{ background: '#f8fafc', fontWeight: 600, fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>
          <div>Status</div>
          <div>Patient Name</div>
          <div>Department</div>
          <div>Original Priority</div>
          <div>Completion Time</div>
        </div>
        
        {history.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            <FaArchive size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <p>No archived records found.</p>
          </div>
        ) : (
          history.map((record) => (
            <div key={record.history_id} className="queue-item">
              <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 700, fontSize: '0.75rem' }}>
                <FaCalendarCheck /> SERVED
              </div>
              <div style={{ fontWeight: 600 }}>{record.patient_name}</div>
              <div style={{ fontSize: '0.875rem' }}>{record.department_name}</div>
              <div>
                <span className="priority-tag" style={{ backgroundColor: `var(--priority-${record.severity})` }}>
                  Level {record.severity}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                {new Date(record.served_time).toLocaleDateString()} • {new Date(record.served_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PatientHistory;