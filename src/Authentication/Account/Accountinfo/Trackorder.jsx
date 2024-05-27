import React, { useState } from 'react'
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material'; // Import Stepper components

import "./Trackorder.scss" ;

const Trackorder = () => {

    const [activeStep, setActiveStep] = useState(0); 
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
  return (
    <div>
      <div className="stepper">
                    <Stepper activeStep={activeStep} alternativeLabel>
                      <Step>
                        <StepLabel>Confirmed</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>Shipped</StepLabel>
                      </Step>
                      <Step>
                        <StepLabel>Delivered</StepLabel>
                      </Step>
                    </Stepper>
                    {/* <div className="step-actions">
                      <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                      <Button variant="contained" onClick={handleNext}>Next</Button>
                    </div> */}
                  </div>
    </div>
  )
}

export default Trackorder
