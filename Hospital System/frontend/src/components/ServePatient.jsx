import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserMd, FaChevronRight, FaHospitalUser, FaClock } from 'react-icons/fa';

const API_URL = 'http://localhost:5000/api';

function ServePatient() {
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('');
  const [nextPatient, setNextPatient] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await axios.get(`${API_URL}/departments`);
      setDepartments(res.data);
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchNextPatient = async () => {
      const url = selectedDept ? `${API_URL}/queue?department_id=${selectedDept}` : `${API_URL}/queue`;
      const res = await axios.get(url);
      setNextPatient(res.data.length > 0 ? res.data[0] : null);
    };
    fetchNextPatient();
  }, [selectedDept, message]);

  const handleServe = async () => {
    try {
      const payload = selectedDept ? { department_id: selectedDept } : {};
      const res = await axios.post(`${API_URL}/serve`, payload);
      setMessage(res.data.message);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error: Failed to update patient status.');
    }
  };

  return (
    <div>
      <header className="section-header">
        <p>Clinical Dispatch</p>
        <h1>Patient Call System</h1>
      </header>

      <div className="form-box" style={{ maxWidth: '100%', padding: '1.25rem 2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Active Department:</label>
        <select 
          className="input-field" 
          style={{ width: 'auto', marginTop: 0 }}
          value={selectedDept} 
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="">Global Dispatch (All)</option>
          {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
        <div className="form-box" style={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px', textAlign: 'center' }}>
          {nextPatient ? (
            <div>
              <div style={{ background: '#eff6ff', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#2563eb' }}>
                <FaHospitalUser size={40} />
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{nextPatient.patient_name}</h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                {nextPatient.age} Year Old • {nextPatient.gender} • {nextPatient.department_name}
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span className="priority-tag" style={{ backgroundColor: `var(--priority-${nextPatient.severity})`, padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
                  Triage Level {nextPatient.severity}
                </span>
              </div>
              <button onClick={handleServe} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
                <FaUserMd /> Complete & Call Next <FaChevronRight />
              </button>
            </div>
          ) : (
            <div style={{ color: '#94a3b8' }}>
              <FaClock size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
              <p>No patients currently awaiting dispatch in this sector.</p>
            </div>
          )}
        </div>

        <div className="stat-card" style={{ background: '#f8fafc', height: 'fit-content' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#475569', marginBottom: '1rem', textTransform: 'uppercase' }}>Dispatch Status</h3>
          {message && <div style={{ color: '#166534', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>✓ {message}</div>}
          <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Calling the patient will automatically move their record to the medical archives and clear the current triage slot.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServePatient;