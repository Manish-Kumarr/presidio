import React, { useEffect, useState } from 'react';
import './Popular.css';
import image from '../../Assets/house1.jpg';
import Item from '../Item/Item';
import axios from 'axios';

const Popular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/property')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='popular'>
      <h1>HIGHLY POPULAR</h1>
      <hr />
      <div className='popular-item'>
        {products.slice(0, 3).map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              image={image}
              name={`${item.area},  ${item.place}`}
              new_price={item.price}
              old_price={item.price + 100}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
