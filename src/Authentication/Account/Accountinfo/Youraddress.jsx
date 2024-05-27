import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../../Uttis/MyContext';
import './Youraddress.scss'; // Import your SCSS file


const Youraddress = () => {
  const { userdata, token, setUserData,shippingInfo } = useContext(MyContext);
  const [isEditing, setIsEditing] = useState(false);
  

  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [updatedCity, setUpdatedCity] = useState('');
  const [updatedState, setUpdatedState] = useState('');

  // ON CLICK ON EDIT ICON 
  const handleOnClick = () => {
    setIsEditing(true);
    setUpdatedName(shippingInfo.name || '');
    setUpdatedEmail(shippingInfo.email || '');
    setUpdatedAddress(shippingInfo.address || '');
    setUpdatedCity(shippingInfo.city || '');
    setUpdatedState(shippingInfo.state || '');
  };

 

  // INPUT CHANGE 

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    switch (field) {
      case 'name':
        setUpdatedName(value);
        break;
      case 'email':
        setUpdatedEmail(value);
        break;
      case 'address':
        setUpdatedAddress(value);
        break;
      case 'city':
        setUpdatedCity(value);
        break;
      case 'state':
        setUpdatedState(value);
        break;
      default:
        break;
    }
  };

  // ON CLICK ON DONE ICON AFTER CHANGE
  const handleSaveChanges = async () => {
    try {
      const response = await axios.post('https://updated-backend-brown.vercel.app/save-shipping-info', {
        shippingInfo: {
          name: updatedName,
          email: updatedEmail,
          address: updatedAddress,
          city: updatedCity,
          state: updatedState
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setIsEditing(false);
        setUserData({ ...userdata, shippingInfo: response.data.shippingInfo });
      } else {
        alert('Error updating name.');
      }
    } catch (error) {
      console.error('Error While Updating Name:', error);
    }
  };



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://updated-backend-brown.vercel.app/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [token, setUserData]);

  return (
    <div className="your-address-container">
      {token ? (
        <>
          <h2>SHIPPING ADDRESS</h2> <br />
          <div className="user-data-item">
            <label>Name:</label>
            <input

              type="text"
              value={isEditing ? updatedName : shippingInfo.name}
              readOnly={!isEditing}
              onChange={(e) => handleInputChange(e, 'name')}

            />
            
          </div>


          
          <div className="user-data-item">
            <label>Email:</label>
            <input
              type="text"
              value={isEditing ? updatedEmail : shippingInfo.email}
              readOnly={!isEditing}
              onChange={(e) => handleInputChange(e, 'email')}
            />
            
          </div>



          <div className="user-data-item">
            <label>Address:</label>
            <input
              type="text"
              value={ isEditing ? updatedAddress : shippingInfo.address}
              readOnly={!isEditing}
              onChange={(e) => handleInputChange(e, 'address')}
            />
           
          </div>


          <div className="user-data-item">
            <label>City:</label>
            <input
              type="text"
              value={ isEditing ? updatedCity :shippingInfo.city}
              readOnly={!isEditing}
              onChange={(e) => handleInputChange(e, 'city')}
            />
            
          </div>

          <div className="user-data-item">
            <label>State:</label>
            <input
              type="text"
              value={isEditing ? updatedState :shippingInfo.state}
              readOnly={!isEditing}
              onChange={(e) => handleInputChange(e, 'state')}
            />
            
          </div>

          <div className="btn">
          {isEditing ? (
              <button type="button" onClick={handleSaveChanges} >
                {/* <DoneIcon fontSize="small" /> */}
                Submit
              </button>
            ) : (
              <button type="button"  onClick={handleOnClick}>
                {/* <EditIcon fontSize="small" /> */}
                Edit
              </button>
            )}
          </div>

        </>
      ) : (
        <h3>Please login</h3>
      )}
    </div>
  );
};

export default Youraddress;
// import React from 'react'

// const Youraddress = () => {
//   return (
//     <div>
//       Youraddress
//     </div>
//   )
// }

// export default Youraddress
