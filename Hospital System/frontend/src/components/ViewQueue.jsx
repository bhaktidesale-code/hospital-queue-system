import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function ViewQueue() {
  const [queue, setQueue] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await axios.get(`${API_URL}/departments`);
      setDepartments(res.data);
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchQueue = async () => {
      const url = selectedDept ? `${API_URL}/queue?department_id=${selectedDept}` : `${API_URL}/queue`;
      const res = await axios.get(url);
      setQueue(res.data);
    };
    fetchQueue();
  }, [selectedDept]);

  return (
    <div>
      <header className="section-header">
        <p>Live Monitoring</p>
        <h1>Patient Intake Queue</h1>
      </header>

      <div className="form-box" style={{ maxWidth: '100%', padding: '1.25rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Filter by Department:</label>
        <select 
          className="input-field" 
          style={{ width: 'auto', marginTop: 0 }}
          value={selectedDept} 
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
        </select>
      </div>

      <div className="queue-list">
        <div className="queue-item" style={{ background: '#f8fafc', fontWeight: 600, fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>
          <div>Rank</div>
          <div>Patient Details</div>
          <div>Department</div>
          <div>Priority</div>
          <div>Arrival</div>
        </div>
        
        {queue.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>No patients currently in queue.</div>
        ) : (
          queue.map((p, idx) => (
            <div key={p.queue_id} className="queue-item">
              <div style={{ fontWeight: 700, color: '#2563eb' }}>#{idx + 1}</div>
              <div>
                <div style={{ fontWeight: 600 }}>{p.patient_name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.age}y • {p.gender}</div>
              </div>
              <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{p.department_name}</div>
              <div>
                <span className="priority-tag" style={{ backgroundColor: `var(--priority-${p.severity})` }}>
                  Level {p.severity}
                </span>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                {new Date(p.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewQueue;