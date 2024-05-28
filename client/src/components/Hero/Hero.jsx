import React, { useEffect, useState } from 'react';
import './Hero.css';
import hand_icon from '../../Assets/hand_icon.png';
import arrow from '../../Assets/arrow.png';
import hero_image from '../../Assets/rent_house.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero-left'>
        <h2>NEW ARRIVAL</h2>
        <div>
          <div className='hero-hand-icon'>
            <p>new</p>
            <img src={hand_icon} alt='' />
          </div>
          <p>flats everyday</p>
          <p>for everyone</p>
        </div>
        <Link to='/properties'>
          <div className='hero-latest-btn'>
            <div>Latest flats</div>
            <img src={arrow} alt='' />
          </div>
        </Link>
      </div>
      <div className='hero-right'>
        <img width={600} src={hero_image} alt='' />
      </div>
    </div>
  );
};

export default Hero;
