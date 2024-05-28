import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Item from '../components/Item/Item';
import image from '../Assets/house1.jpg';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const user = localStorage.getItem('userID');

  useEffect(() => {
    // Fetch user properties when component mounts
    fetchUserProperties();
  }, []);

  const fetchUserProperties = async () => {
    try {
      // Fetch properties for the specific user
      const response = await axios.get(
        `http://localhost:5000/user/${user}/properties`
      );
      // Set the fetched properties in state
      setProperties(response.data);
      console.log(properties);
    } catch (error) {
      console.error('Error fetching user properties:', error);
    }
  };

  return (
    <div className='properties'>
      <div className='properties-products'>
        {properties?.map((item, i) => {
          return (
            <Link to={`/update/${item._id}`}>
              <Item
                key={i}
                id={item._id}
                image={image}
                name={`${item.area},  ${item.place}`}
                new_price={item.price}
                old_price={item.price + 100}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
