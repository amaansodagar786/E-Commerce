import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Youraccount from './Accountinfo/Youraccount';
import Yourorders from './Accountinfo/Yourorders';
import Youraddress from './Accountinfo/Youraddress';
import { MdManageAccounts } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import { IoShirt } from "react-icons/io5";
import "./Account.scss"

const Account = () => {
  const [activeItem, setActiveItem] = useState(null);
  const Navigate = useNavigate();

  const handleItemClick = (id) => {
    setActiveItem(id);
    // Navigate to a new route based on the clicked item
    Navigate('/' + id.toLowerCase());
  }

  return (
    <>
    <div>
      <div className="main-account">
        <div className="dashboard-container">
          <div onClick={() => handleItemClick('ACCOUNT')} className={`dashboard-item account ${activeItem === 'ACCOUNT' ? 'active' : ''}`}>
            <MdManageAccounts size={24}/>
            <h2 id='mobile'> ACCOUNT</h2>
          </div>
          <div onClick={() => handleItemClick('ORDERS')} className={`dashboard-item order ${activeItem === 'ORDERS' ? 'active' : ''}`}>
            <IoShirt size={24}/>
            <h2 id='mobile'>ORDERS</h2>
          </div>
          <div onClick={() => handleItemClick('ADDRESS')}  className={`dashboard-item address ${activeItem === 'ADDRESS' ? 'active' : ''}`}>
            <MdLocalShipping size={24}/>
            <h2 id='mobile'> ADDRESS</h2>
          </div>
        </div>
        
        <div className="maindiv" id='account' style={{ display: activeItem === 'ACCOUNT' ? 'block' : 'none' }}>
          <Youraccount/> 
        </div>

        <div className="maindiv" id='orders' style={{ display: activeItem === 'ORDERS' ? 'block' : 'none' }}>
          <div> <Yourorders/> </div>
        </div>

        <div className="maindiv" id='address' style={{ display: activeItem === 'ADDRESS' ? 'block' : 'none' }}>
          <div><Youraddress/></div>
        </div>
      </div>
    </div>
    <hr />
    </>
  )
}

export default Account;
