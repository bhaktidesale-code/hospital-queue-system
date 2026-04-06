import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserPlus, FaCheckCircle } from 'react-icons/fa';

const API_URL = 'http://localhost:5000/api';

function RegisterPatient() {
  const [formData, setFormData] = useState({ name: '', age: '', gender: 'Male', department_id: '', severity: '1' });
  const [departments, setDepartments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      const res = await axios.get(`${API_URL}/departments`);
      setDepartments(res.data);
      if (res.data.length > 0) setFormData(p => ({ ...p, department_id: res.data[0].id }));
    };
    fetchDepartments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/register`, formData);
      setMessage('Patient successfully synchronized with database.');
      setFormData({ name: '', age: '', gender: 'Male', department_id: departments[0]?.id, severity: '1' });
      setTimeout(() => setMessage(''), 4000);
    } catch (err) { setMessage('Error: Connection to database failed.'); }
  };

  return (
    <div>
      <header className="section-header">
        <p>Intake Management</p>
        <h1>New Patient Entry</h1>
      </header>

      <div className="form-box">
        {message && (
          <div style={{ padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', background: message.includes('Error') ? '#fef2f2' : '#f0fdf4', color: message.includes('Error') ? '#991b1b' : '#166534', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaCheckCircle /> {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Full Legal Name</label>
            <input className="input-field" type="text" placeholder="e.g. Johnathan Smith" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Age</label>
              <input className="input-field" type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} required />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Gender</label>
              <select className="input-field" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Department</label>
              <select className="input-field" value={formData.department_id} onChange={(e) => setFormData({...formData, department_id: e.target.value})}>
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.875rem' }}>Triage Priority Level</label>
              <select className="input-field" value={formData.severity} onChange={(e) => setFormData({...formData, severity: e.target.value})}>
                <option value="1">Level 1 - Routine</option>
                <option value="2">Level 2 - Minor</option>
                <option value="3">Level 3 - Urgent</option>
                <option value="4">Level 4 - High Priority</option>
                <option value="5">Level 5 - Critical</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            <FaUserPlus /> Authorize Registration
          </button>
        </form>
      </div>
    </div>
  );
}
export default RegisterPatient;