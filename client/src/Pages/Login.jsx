import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CSS/LoginSignup.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        email,
        pass: password, // change pass to password to match the API
      });
      document.cookie = `access_token=${response.data.token}; path=/`;
      // Store name and id in local storage
      localStorage.setItem('userName', response.data.user.firstname);
      localStorage.setItem('userID', response.data.user._id);
      localStorage.setItem('token', response.data.token);

      // Redirect to properties page
      window.location.href = '/properties';

      // Alert for successful login
      alert('Login successful!');
      console.log('User logged in:', response.data);
    } catch (err) {
      // Alert for login error
      alert('Login failed. Please check your credentials.');
      console.error('Error logging in:', err);
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Login</h1>
        <form onSubmit={onSubmit} className='loginsignup-fields'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
          />
          <button type='submit'>Login</button>
        </form>
        <p className='loginsignup-login'>
          Don't have an account? <Link to='/signup'>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
