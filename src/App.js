import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      {/* <nav>
        <ul>
          <li>
            <Link to="/">Landing Page</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/login" element={<Login />} /> {/* Change made here */}
        <Route path="/registration" element={<Registration />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="*" element={<h2>404 Not Found</h2>} /> {/* Fallback for unmatched routes */}
      </Routes>
    </Router>
  );
}

export default App;
