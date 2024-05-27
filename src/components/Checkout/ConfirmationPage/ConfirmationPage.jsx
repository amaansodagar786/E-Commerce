// ConfirmationPage.js

import React, { useContext } from 'react';
import './ConfirmationPage.scss';

import MyContext from '../../../Uttis/MyContext';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const Navigate = useNavigate();
  const { handlePrev } = useContext(MyContext);

  const navigatetohome = () => {
    Navigate('/');
  };

  return (
    <div className="confirmation-page">
      <h2>Order Confirmation</h2>
      <div className="confirmation-message">
        <p>Your order has been placed successfully!</p>
        <p>Thank you for shopping with us.</p>
      </div>
      <button onClick={navigatetohome}>Back to Home</button>
    </div>
  );
};

export default ConfirmationPage;
