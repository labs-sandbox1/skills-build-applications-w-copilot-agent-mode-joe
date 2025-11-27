import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">🏋️ OctoFit Tracker</Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">👥 Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">🤝 Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">🏃 Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">🏆 Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">💪 Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="home-container">
              <div className="container">
                <h1 className="home-title display-3">Welcome to OctoFit Tracker</h1>
                <p className="home-lead">Track your fitness activities, compete with teams, and achieve your goals!</p>
                <hr className="home-divider" />
                <p className="text-muted">Use the navigation menu above to explore different sections of the app.</p>
                <div className="mt-5 row text-center">
                  <div className="col-md-4 mb-3">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h3>👥</h3>
                        <h5 className="card-title">Users</h5>
                        <p className="card-text">Manage and view all users</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h3>🏃</h3>
                        <h5 className="card-title">Activities</h5>
                        <p className="card-text">Log and track activities</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h3>🏆</h3>
                        <h5 className="card-title">Leaderboard</h5>
                        <p className="card-text">View rankings and compete</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
