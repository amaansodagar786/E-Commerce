import React, { useState, useEffect, useContext } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import axios from 'axios';
import "./Yourorders.scss";
import MyContext from '../../../Uttis/MyContext';

const YourOrders = () => {
  const [orders, setOrders] = useState([]);
  // const [trackinfo, setTrackinfo] = useState([]);
  const [trackdiv, setTrackdiv] = useState(false);
  // const [selectedProductId, setSelectedProductId] = useState(null);
  const [activeStep, setActiveStep] = useState(0); 
  const { token , selectedProductId,setSelectedProductId , setTrackinfo, trackinfo ,statusinfo,setStatusinfo} = useContext(MyContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          console.log('No Token');
          return;
        }

        const response = await axios.get('http://localhost:3034/yourorders', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(response.data.Yourorders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);




  const handleClick = (productId, status) => {
    
    console.log(statusinfo)
    setTrackdiv(true);
    setSelectedProductId(productId);
    if (statusinfo === 'pending') {
      setActiveStep(0);
    } else if (statusinfo === 'shipped') {
      setActiveStep(1);
    } else if (statusinfo === 'delivered') {
      setActiveStep(2);
    }
  };

  const handleCloseTrack = () => {
    setTrackdiv(false);
    setSelectedProductId(null);
  };

  function getStatusMessage(status) {
    switch (status) {
      case 'pending':
        return 'Order confirmed and ready to ship';
      case 'shipped':
        return 'Order shipped and ready to be delivered';
      case 'delivered':
        return 'Order delivered';
      default:
        return 'Unknown status';
    }
  }
  

  return (
    <div>
      <h2 className='head'>Your Orders</h2>
      {token ? (
        orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          <ul>
            {orders.map((order, index) => (
              <div key={order.productId} className="container-order">
                <div className="order-items">
                  <div className="order-item">
                    <p style={{ display: "none" }}>P_ID : {order.productId}</p>
                    <img src={order.productimg} alt={order.productname} />
                    <h3> {order.productname}</h3>
                    <p>Size <br />{order.productsize}</p>
                    <span>Quantity <br />{order.quantity}</span>
                    <span>&#8377;{order.productprice}</span>
                    <span onClick={() => handleClick(order.productId, order.status)}>
                      
                      {trackdiv && selectedProductId === order.productId ? "Close" : "Track"}
                    </span>
                  </div>
                  {trackdiv && selectedProductId === order.productId && (
                    <div className="track">
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
                        <Button onClick={handleCloseTrack}>Close</Button>
                      </div>
                    </div>
                  )}

                  {trackdiv && selectedProductId === order.productId && (
                   <div className='trackdiv'>
                   <h2>Tracking Information</h2>
                   <ul>
                     {trackinfo
                       .filter(info => info.productId === selectedProductId)
                       .map(tinfo => (
                         <li key={tinfo.productId}>
                           Status: {getStatusMessage(tinfo.status)}
                         </li>
                       ))}
                   </ul>
                 </div>
                 
                  )}
                </div>
              </div>
            ))}
          </ul>
        )
      ) : (
        <p>Login</p>
      )}
    </div>
  );
};

export default YourOrders;
