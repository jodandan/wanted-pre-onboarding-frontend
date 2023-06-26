import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Todo from './components/Todo';

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Signup />} />
         <Route path="/signin" element={<Signin />} />
         <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
}

export default App;
