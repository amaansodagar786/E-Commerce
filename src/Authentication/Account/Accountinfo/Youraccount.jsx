import React, { useContext } from 'react'
import MyContext from '../../../Uttis/MyContext';
import AccountForm from './AccountForm/AccountForm';
import "./Youraccount.scss"

const Youraccount = () => {

  const { token } = useContext(MyContext);

  return (
    <div className="your-account-container">
      {token ? 
        < div className='account-main-head'>
          <h2>User Data</h2>

         <AccountForm/>
         
        </div>
       : 
        <p>please login...</p>
      }
    </div>
  )
}

export default Youraccount