// ShippingForm.js

import React, { useContext, useState } from 'react';
import './ShippingForm.scss'; // Assuming you use the provided CSS file
import MyContext from '../../../Uttis/MyContext';
import UpdatedForm from './UpdatedForm/UpdatedForm';

const ShippingForm = () => {
  const { shippingInfo, handleNext } = useContext(MyContext);
  const [formShow, setFormShow] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    setFormShow(true);
    setEditMode(true);
  };

  return (
    <div className="shipping-form">
      <h2>Delivery address</h2>
      {!formShow ? 
        
          <div className="address-box">
            {shippingInfo.address ? 
              <>
                <div className="your-address-container">
      
        <>
          <h2>SHIPPING ADDRESS</h2> <br />
          <div className="user-data-item">
            <label>Name:</label>
            <input

              type="text"
              value={shippingInfo.name}
              

            />
            
          </div>


          
          <div className="user-data-item">
            <label>Email:</label>
            <input
              type="text"
              value={shippingInfo.email}
             
            />
            
          </div>



          <div className="user-data-item">
            <label>Address:</label>
            <input
              type="text"
              value={ shippingInfo.address}
             
            />
           
          </div>


          <div className="user-data-item">
            <label>City:</label>
            <input
              type="text"
              value={ shippingInfo.city}
              
            />
            
          </div>

          <div className="user-data-item">
            <label>State:</label>
            <input
              type="text"
              value={shippingInfo.state}
             
            />
            
          </div>

          

        </>
      
      
    </div>
              </>
             : 
              <p className="empty-address">No shipping information available..</p>
            }
            {shippingInfo.address ? (
              <div className='edit-next'>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleNext}>Next</button>
              </div>
              
              
            ) : (
              <button onClick={() => setFormShow(true)}>Add New</button>
            )}
          </div>
        
        
       : 
       <UpdatedForm editMode={editMode} />
      }
    </div>
  );
};

export default ShippingForm;
