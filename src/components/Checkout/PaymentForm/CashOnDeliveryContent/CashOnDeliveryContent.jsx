import React, { useContext, useState } from 'react';
import './CashOnDeliveryContent.scss';
import { IoMdRefresh } from "react-icons/io";
import MyContext from '../../../../Uttis/MyContext';


const CashOnDeliveryContent = ({ onCaptchaVerification }) => {

  const {setCaptcha ,captcha ,inputText , setInputText , captchamsg, setCaptchamsg} = useContext(MyContext);

  // const [captcha, setCaptcha] = useState(generateCaptcha());
  // const [inputText, setInputText] = useState('');

  // Function to generate a random captcha
  function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 5; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  // Function to refresh captcha
  function refreshCaptcha() {
    setCaptcha(generateCaptcha());
    setInputText('');
    setCaptchamsg('');
  }

  // Function to handle input change
  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  // Function to handle verification

  // function verifyCaptcha() {
  //   if (inputText === captcha) {
  //     setMessage('Success!');
  //     onCaptchaVerification(true); // Notify parent component
  //   } else {
  //     setMessage('Error! Captcha does not match.');
  //     onCaptchaVerification(false); // Notify parent component
  //   }
  // }

  function preventCopy(event) {
    event.preventDefault();
  }

  return (
    <div className="cash-on-delivery-content">
      <h3>Cash on Delivery</h3>
      <div>
      <span className='cptchaspan' onCopy={preventCopy}>{captcha}</span>
        
       <span className='refreshbtn' onClick={refreshCaptcha}> <IoMdRefresh /> </span>
        <br/>

        <label htmlFor="captcha">Enter Captcha:</label>
        <input type="text" id="captcha" value={inputText} onChange={handleInputChange} /> <br />
        {/* <button className='cmprbtn' onClick={verifyCaptcha}>Done</button> */}

        {captchamsg && <div>{captchamsg}</div>}
      </div>
    </div>
  );
};

export default CashOnDeliveryContent;
