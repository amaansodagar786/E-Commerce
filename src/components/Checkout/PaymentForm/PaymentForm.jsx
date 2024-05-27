import React, { useContext, useState } from 'react';
import MyContext from '../../../Uttis/MyContext';
import './PaymentForm.scss';
import img from "../../../assets/paytm.png";
import upi from "../../../assets/upi.jpeg";
import credit from "../../../assets/credit.jpeg";
import gpay from "../../../assets/gpay.png";
import cash from "../../../assets/cash.png";
import CashOnDeliveryContent from './CashOnDeliveryContent/CashOnDeliveryContent';


const PaymentForm = () => {
  const {removeProductFromCart , cartItems , captchamsg , setCaptchamsg, setCaptcha ,captcha ,inputText , setInputText , handlePrev, handleNext, product, allProducts, token } = useContext(MyContext);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsCaptchaVerified(false); 
  };


  function confirmbuttonClick() {
    if (inputText === captcha) {
      // setIsCaptchaVerified(true);
      setCaptchamsg("Verified")

      Removeproductfromcart();
      handleNextButtonClick();
       handleNext(); 
      
    }
    else
    {
      setCaptchamsg(" Not Verified")
    }
  }

  const handleNextButtonClick = () => {
    if (isCaptchaVerified) { // Only proceed if captcha is verified
      let orderdetails = null;

      if (allProducts.length > 0) {
        orderdetails = allProducts;
      } else if (product.length > 0) {
        orderdetails = product;
      } else {
        console.error('Error: No order details available to submit.');
        return; // Added return statement to exit the function
      }

      if (orderdetails) {
        fetch('https://updated-backend-brown.vercel.app/orderdetails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderdetails),
        })
        .then(response => {
          if (response.ok) {
            console.log("Order details submitted successfully");
          } else {
            throw new Error('Failed to submit order details. Server responded with status ' + response.status);
          }
        })
        .catch(error => {
          console.error('Error while submitting order details:', error.message);
        });
      } else {
        console.error('Error: No order details available to submit.');
      }
      
    } else {
      console.log('Please verify captcha');
    }
    
  };
  
  

  const Removeproductfromcart = () => {

     cartItems.forEach((item) => {
   removeProductFromCart(item.productId);
   });
  };


  const handleCaptchaVerification = (isVerified) => {
    setIsCaptchaVerified(isVerified);
  };

  return (
    <div className="payment-form">
      {token ? (
        <>
          
            <div className="payment-options">
              <div className={`payment-option ${selectedOption === 'upi' ? 'selected' : ''}`} onClick={() => handleSelectOption('upi')}>
                <img src={upi} alt="UPI" />
                <span>UPI</span>
              </div>
              <div className={`payment-option ${selectedOption === 'paytm' ? 'selected' : ''}`} onClick={() => handleSelectOption('paytm')}>
                <img src={img} alt="Paytm" />
                <span>Paytm</span>
              </div>
              <div className={`payment-option ${selectedOption === 'credit-card' ? 'selected' : ''}`} onClick={() => handleSelectOption('credit-card')}>
                <img src={credit} alt="Credit Card" />
                <span>Credit Card / Debit Card</span>
              </div>
              <div className={`payment-option ${selectedOption === 'google-pay' ? 'selected' : ''}`} onClick={() => handleSelectOption('google-pay')}>
                <img src={gpay} alt="Google Pay" />
                <span>Google Pay</span>
              </div>
              <div className={`payment-option ${selectedOption === 'cash-on-delivery' ? 'selected' : ''}`} onClick={() => handleSelectOption('cash-on-delivery')}>
                <img src={cash} alt="Cash on Delivery" />
                <span>Cash on Delivery</span>
              </div>
            </div>
        
          {selectedOption === 'cash-on-delivery' && (
            <CashOnDeliveryContent onCaptchaVerification={handleCaptchaVerification} />
          )}
          <div className="navigation-buttons">
            <button onClick={handlePrev}>Previous</button>
            <button onClick={confirmbuttonClick}  >Confirm</button>
          </div>

        </>
      ) : (
        <p>Please login...</p>
      )}
    </div>
  );
};

export default PaymentForm;
