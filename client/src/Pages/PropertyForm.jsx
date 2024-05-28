import React, { useState } from 'react';
import axios from 'axios';

const PropertyForm = ({ history }) => {
  const userID = localStorage.getItem('userID');
  const [property, setProperty] = useState({
    place: '',
    area: '',
    nearby: '',
    noOfBedrooms: '',
    price: '',
    owner: userID,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/property/', property);
      alert('Property added successfully!');
      window.location.href = '/dashboard';
      //   history.push('/dashboard'); // Redirect to the dashboard after successful submission
    } catch (error) {
      console.error('Error adding property:', error);
      alert('Failed to add property. Please try again.');
    }
  };

  return (
    <div className='property-form-container'>
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label>Place:</label>
          <input
            type='text'
            name='place'
            value={property.place}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label>Area:</label>
          <input
            type='text'
            name='area'
            value={property.area}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label>Nearby:</label>
          <input
            type='text'
            name='nearby'
            value={property.nearby}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label>No. of Bedrooms:</label>
          <input
            type='number'
            name='noOfBedrooms'
            value={property.noOfBedrooms}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label>Price:</label>
          <input
            type='number'
            name='price'
            value={property.price}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>

        <button type='submit' style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};

// CSS styles
const formStyle = {
  maxWidth: '400px',
  margin: 'auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  backgroundColor: '#f9f9f9',
};

const formGroupStyle = {
  marginBottom: '15px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: '#4CAF50',
  color: 'white',
  fontSize: '16px',
};

export default PropertyForm;
