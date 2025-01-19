// import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import JobTrackerApp from './JobTrackerApp'
// import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css';

function App() {
  // Check if user is logged in by looking for a token in localStorage
  const isLoggedIn = localStorage.getItem('token') != null
  return (
    <div className="App">
      <Router>
        {/* Navigation Bar */}
        <nav className="navbar">
  <Link to="/" className={`nav-link ${window.location.pathname === '/' ? 'active' : ''}`}>Home</Link>
  {isLoggedIn ? (
          <>
            <Link to="/job-tracker" className={`nav-link ${window.location.pathname === '/job-tracker' ? 'active' : ''}`}>Dashboard</Link>
            <button
              className="nav-link logout-button"
              onClick={() => {
                if (window.confirm("Are you sure you want to log out?")) {
                  localStorage.removeItem('token');
                window.location.href = '/';
                }
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={`nav-link ${window.location.pathname === '/login' ? 'active' : ''}`}>Login</Link>
            <Link to="/register" className={`nav-link ${window.location.pathname === '/register' ? 'active' : ''}`}>Register</Link>
          </>
        )}
      </nav>
      <JobTrackerApp/>
        <Routes>
          <Route path='/'
          element={<div className="home">
              <p>Plese log in or register to start tracking your jobs.</p>
            </div>
          }
        />
          {isLoggedIn && <Route path='/job-tracker' element={<JobTrackerApp/>} />}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
