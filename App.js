import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Todo from './components/Todo';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
        {token ? (
          <Route path="/todo" element={<Todo />} />
        ) : (
          <Route path="/todo" element={<Signin/>} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
