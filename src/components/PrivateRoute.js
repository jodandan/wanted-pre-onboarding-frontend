import React, { useState, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  return <Route {...rest} element={authenticated ? <Component /> : null} />;
}

export default PrivateRoute;
