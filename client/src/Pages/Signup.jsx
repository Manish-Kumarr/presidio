import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
  });

  const { firstname, lastname, email, password, phone } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/user/signup',
        formData
      );
      // Display alert on successful registration
      alert('User registered successfully. Please login to continue.');
      // Redirect to login page
      window.location.href = '/login';
      console.log('User registered:', response.data);
    } catch (err) {
      // Display alert on error
      alert('Error registering user. Please try again.');
      console.error('Error registering user:', err.response.data);
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Sign Up</h1>
        <form onSubmit={onSubmit} className='loginsignup-fields'>
          <input
            type='text'
            placeholder='First Name'
            name='firstname'
            value={firstname}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='Last Name'
            name='lastname'
            value={lastname}
            onChange={onChange}
          />
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
          <input
            type='text'
            placeholder='Phone'
            name='phone'
            value={phone}
            onChange={onChange}
          />
          <button type='submit'>Continue</button>
        </form>
        <Link to='/login'>
          <p className='loginsignup-login'>
            Already have an account? <span>Login</span>
          </p>
        </Link>
        <div className='loginsignup-agree'>
          <input type='checkbox' name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
