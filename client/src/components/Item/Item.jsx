import React from 'react';
import './Item.css';

const Item = ({ id, image, name, new_price, old_price }) => {
  return (
    <div className='item'>
      <img width={370} height={200} src={image} alt='' />

      <p>{name}</p>
      <div className='item-prices'>
        <div className='item-price-new'>${new_price}</div>
        <div className='item-price-old'>${old_price}</div>
      </div>
    </div>
  );
};

export default Item;
