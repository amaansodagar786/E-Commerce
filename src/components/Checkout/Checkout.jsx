// Checkout.js

import React, { useContext} from 'react';

import './Checkout.scss';
import Stepper from '../Stepper/Stepper';
import ShippingForm from './ShippingForm/ShippingForm';
import PaymentForm from './PaymentForm/PaymentForm';
import ConfirmationPage from './ConfirmationPage/ConfirmationPage';
import MyContext from '../../Uttis/MyContext';



const Checkout = () => {
 const {currentStep,cartValue} = useContext(MyContext)

  return (
<>
    

    <div className='checkout-main'>
   
   
    <div className="checkout-container">
    
      <Stepper/>
      {/* Render content for each step */}
      {currentStep === 0 && <ShippingForm  />}
      {currentStep === 1 && <PaymentForm />}
      {currentStep === 2 && <ConfirmationPage />}
      
    </div>

    <div className='checkout-price'>
    <h1>Price Details</h1>

    <div className='total-value'><span>Item Price</span> <span>&#8377;{cartValue}</span></div>
    <div className='delivery-charge'><span>Delivery Charges</span> <span>Free</span></div>
    <div className='paid-charge'><span>Total Payable</span> <span>&#8377;{cartValue}</span></div>
    </div>
   
     </div>

     </>
  );
};

export default Checkout;
