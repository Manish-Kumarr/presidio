import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../Assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');

  // Function to handle logout
  const handleLogout = () => {
    // Clear userID and userName from local storage
    localStorage.removeItem('userID');
    localStorage.removeItem('userName');
    // Redirect to home page
    window.location.href = '/';
  };

  // Check if userID is present in local storage
  const userID = localStorage.getItem('userID');
  const isLoggedIn = userID !== null;

  return (
    <div className='navbar'>
      <div className='navbar-logo'>
        <Link to='/'>
          <img width={100} src={logo} alt='logo' />
        </Link>
      </div>
      <ul className='nav-menu'>
        <li>
          <Link to='/'>For Tenants</Link>
        </li>
        <li>
          <Link to='/'>For Buyers</Link>
        </li>
        <li>
          <Link to='/'>For Owner</Link>
        </li>
      </ul>
      <div className='nav-login-cart'>
        {/* Check if user is logged in */}
        {isLoggedIn ? (
          // If user is logged in, display Dashboard
          <>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/addproperty'>Add Property</Link>
          </>
        ) : (
          // If user is not logged in, display login button
          <Link to='/login'>
            <button>Login</button>
          </Link>
        )}
        {/* If user is logged in, display logout button */}
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
};

export default Navbar;
