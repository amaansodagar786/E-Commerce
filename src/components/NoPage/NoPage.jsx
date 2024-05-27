// AnimatedBorderPage.jsx

import React from 'react';
import './NoPage.scss';
import { IoMdHome } from 'react-icons/io';
import { Link } from 'react-router-dom';

const NoPage = () => {
  return (
    <div className="container">
   
      <IoMdHome className="big-icon" />
 
    <h1> 404 error!</h1>
    <Link to='/'><p>click here to go to home page.</p></Link>
  </div>
  );
};

export default NoPage;
