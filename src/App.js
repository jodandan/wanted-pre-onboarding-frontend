import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Todo from './components/Todo';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route
          path="/signin"
          element={<Signin onLogin={handleLogin} />}
        />
        <Route
          path="/todo"
          element={
            token ? <Todo onLogout={handleLogout} /> : <Navigate to="/signin" />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
