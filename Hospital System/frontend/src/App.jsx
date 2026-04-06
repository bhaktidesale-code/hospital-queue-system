import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import RegisterPatient from './components/RegisterPatient';
import ViewQueue from './components/ViewQueue';
import ServePatient from './components/ServePatient';
import PatientHistory from './components/PatientHistory';
import { FaChartPie, FaPlusSquare, FaStream, FaUserMd, FaHistory, FaHospitalSymbol } from 'react-icons/fa';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <FaHospitalSymbol size={28} color="#3b82f6" />
            <span>MedQueue Pro</span>
          </div>

          <nav>
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FaChartPie /> Dashboard
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FaPlusSquare /> Registration
            </NavLink>
            <NavLink to="/queue" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FaStream /> Patient Queue
            </NavLink>
            <NavLink to="/serve" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FaUserMd /> Serve Patient
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
              <FaHistory /> Medical History
            </NavLink>
          </nav>

          <div style={{ marginTop: 'auto', padding: '1rem', fontSize: '0.75rem', color: '#64748b', borderTop: '1px solid #1e293b' }}>
            v2.4.0 • Enterprise Edition
          </div>
        </aside>

        <main className="main-wrapper">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<RegisterPatient />} />
            <Route path="/queue" element={<ViewQueue />} />
            <Route path="/serve" element={<ServePatient />} />
            <Route path="/history" element={<PatientHistory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;