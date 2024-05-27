// Stepper.js

import React, { useContext } from 'react';
import './Stepper.scss';
import MyContext from '../../Uttis/MyContext';

const Stepper = () => {

    const {currentStep} = useContext(MyContext)
    const steps = ['Shipping', 'Payment', 'Confirmation'];
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div key={index} className={`step ${index === currentStep ? 'active' : ''}`} >
          {step}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
