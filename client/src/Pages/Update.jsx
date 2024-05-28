import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Update.css';

const Update = ({ match, history }) => {
  const propertyId = window.location.pathname.split('/')[2];
  const userId = localStorage.getItem('userID');
  const [property, setProperty] = useState({
    place: '',
    area: '',
    nearby: '',
    noOfBedrooms: 0,
    price: 0,
    owner: '',
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/property/${propertyId}`
      );
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleUpdate = async () => {
    console.log(property);
    try {
      await axios.put(
        `http://localhost:5000/property/${property._id}`,
        property
      );
      alert('Property updated successfully!');
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Failed to update property. Please try again.');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/property/${property._id}`);
      alert('Property deleted successfully!');
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property. Please try again.');
    }
  };

  return (
    <div className='container'>
      <h2>Property Details</h2>
      <form>
        <div>
          <label>Place:</label>
          <input
            type='text'
            name='place'
            value={property.place}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Area:</label>
          <input
            type='text'
            name='area'
            value={property.area}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Nearby:</label>
          <input
            type='text'
            name='nearby'
            value={property.nearby}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label>No. of Bedrooms:</label>
          <input
            type='number'
            name='noOfBedrooms'
            value={property.noOfBedrooms}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type='number'
            name='price'
            value={property.price}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div className='button-group'>
          <button
            type='button'
            onClick={handleUpdate}
            style={{
              background: 'green',
              width: '40%',
              padding: '10px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '16px',
              marginRight: '20px',
            }}
          >
            Update
          </button>
          <button
            type='button'
            onClick={handleDelete}
            style={{
              background: 'red',
              width: '40%',
              padding: '10px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '16px',
            }}
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

// CSS styles
const inputStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {};

export default Update;
