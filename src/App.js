import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Signup />} />
         <Route path="/signin" element={<Signin />} />
        {/* 다른 경로에 대한 라우트도 추가할 수 있습니다 */}
      </Routes>
    </Router>
  );
}

export default App;
