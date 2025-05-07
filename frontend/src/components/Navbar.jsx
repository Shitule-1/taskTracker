import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '10px', textDecoration: 'none' }}>Home</Link>
      {isLoggedIn ? (
        <button onClick={handleLogout} style={{ padding: '5px 10px' }}>Logout</button>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '10px', textDecoration: 'none' }}>
            <button style={{ padding: '5px 10px' }}>Login</button>
          </Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '5px 10px' }}>Register</button>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
