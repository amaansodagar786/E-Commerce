import React, { useEffect, useState } from 'react'
import MyContext from './MyContext'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const MyContextProvider = ({children}) => {
    const HeadingText = "Popular"
    const HeadingText1 = "Related Products"
    const Navigate = useNavigate()
    const [data, setData] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
      setIsLoading(true);
  
      axios.get('http://localhost:3034/api')
          .then((res) => {
              if (res.data.success) {
                  setData(res.data.data);
                  setIsLoading(false); // Set loading to false when data is fetched successfully
              } else {
                  console.error('Error fetching data:', res.data.error);
                  setIsLoading(false); // Set loading to false in case of error
              }
          })
          .catch((error) => {
              console.error('Error fetching data:', error);
              setIsLoading(false); // Set loading to false in case of error
          });
  }, []);
  

 

  
   const [cartValue, setCartValue] = useState(() => {
    // Initialize cartValue from localStorage, or 0 if it doesn't exist
    return parseInt(sessionStorage.getItem('cartValue')) || 0;
  });

  // Update localStorage whenever cartValue changes
  useEffect(() => {
    sessionStorage.setItem('cartValue', cartValue.toString());
  }, [cartValue]);
  
  const handleBuy = (Item) => {
    // Check if the user is authenticated before navigating to checkout
    if (token) {
      setCartValue(Item)
      Navigate('/checkout');
    } else {
      // Redirect to the login page if not authenticated
      openModal4();
    }
  };

const AddToPrice = (Total) =>{
  setCartValue(Total)
  closeModal2()
  Navigate('/checkout');

  
}


  
  
  

 




    const [showWishList, setShowWishList] = useState(false)

    const openModal = () => {
      setShowWishList(true);
      document.body.classList.add('modal-open');
    };
  
    const closeModal = () => {
      setShowWishList(false);
      document.body.classList.remove('modal-open');
    };

    const [showSearch, setShowSearch] = useState(false)
    const openModal1 = () => {
      setShowSearch(true);
      document.body.classList.add('modal-open');
    };
  
    const closeModal1 = () => {
      setShowSearch(false);
      document.body.classList.remove('modal-open');
    };

    const [showCart, setShowCart] = useState(false)
   
    const openModal2 = () => {
      setShowCart(true);
      document.body.classList.add('modal-open');
    };
  
    const closeModal2 = () => {
      setShowCart(false);
      document.body.classList.remove('modal-open');
    };
  
   


  


    
   


    const formatReviewCount = (count) => {
      if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`;
      }
      return count;
    };

    
  
    const handleNavigate = (Data,Item) => {




      const dynamicUrl = `/category/${Data}/${Item}`;
      const fullUrl = window.location.origin + dynamicUrl;

      //     // Open the link in a new tab
      window.open(fullUrl, '_blank');
  };



    const [currentStep, setCurrentStep] =useState(() => {
      // Initialize cartValue from localStorage, or 0 if it doesn't exist
      return parseInt(sessionStorage.getItem('currentStep')) || 0;
    });
  
    // Update localStorage whenever cartValue changes
    useEffect(() => {
      sessionStorage.setItem('currentStep', currentStep.toString());
    }, [currentStep]);
  
    const handleNext = () => {
      setCurrentStep((prevStep) => prevStep + 1);
    };
  
    const handlePrev = () => {
      setCurrentStep((prevStep) => prevStep - 1);
    };

    

    
    const [showLogin, setShowLogin] = useState(false)

    const openModal4 = () => {
      setShowLogin(true);
      document.body.classList.add('modal-open');
    };
  
    const closeModal4 = () => {
      setShowLogin(false);
      document.body.classList.remove('modal-open');
    };

    const LoginHide = () =>{
      document.getElementById('login').style.display="none"
      document.getElementById('register').style.display="block"
  }

  const RegisterHide = () =>{
      document.getElementById('login').style.display="block"
      document.getElementById('register').style.display="none"
  }
  const ForgotHide = () =>{
      document.getElementById('forgot').style.display="none"
      document.getElementById('login').style.display="block"
  }
  const BothHide = () =>{
    document.getElementById('forgot').style.display="block"
    document.getElementById('login').style.display="none"
    document.getElementById('register').style.display="none"
}


    const [isAuthenticated, setIsAuthenticated] = useState(false);



    const[loader,setLoader] = useState(false)

    const [userdata, setUserData] = useState(null);

useEffect(() => {
  const userDataString = sessionStorage.getItem('userdata');
  if (userDataString) {
    setUserData(JSON.parse(userDataString));
  }
}, []);

useEffect(() => {
  
  const fetchUserData = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        // Handle case when user is not logged in
        return;
      }

      const response = await fetch('http://localhost:3034/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUserData(data.accountInfo);
      sessionStorage.setItem('userdata', JSON.stringify(data.accountInfo));
    } catch (error) {
      console.error(error);
    }
  };

  fetchUserData();
}, []);


    const[login,setLogin] =useState(false)

  
 


  
    const handleLogout = () => {
      const shouldLogout = window.confirm('Are you sure you want to logout?');
      if (shouldLogout) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('cartItems');
        sessionStorage.removeItem('wishItems');
        setToken('');
        setCartItems([]);
        setWishItems([])
        Navigate('/');
      }
    
  
    }
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);



  const handleLogin = (newtoken) => {
    sessionStorage.setItem('token', newtoken);
    setToken(newtoken);
    closeModal4();
    

    // const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    // setCartItems(storedCartItems);
  };

  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    return storedCartItems;
  });


  useEffect(() => {
    
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const [loading, setLoading] = useState(false);
  const handleCheckout = async (productId,productname,productimg,productprice) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
      openModal4()
        return;
      }

      const response = await fetch('http://localhost:3034/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId,productname,productimg,productprice, quantity: 1 ,productsize: selectedSize, })
      });

      const data = await response.json();
      console.log(data.productprice)
      setCartItems(data.cartItems)
      setWishItems(data.wishItems)
      // Redirect to cart page after adding to cart
     setShowCart(true)
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };



  const isProductInCart = (productId) => {
    if (cartItems) {
        return cartItems.find(item => item.productId === productId);
    }
    return false;
};
const [productremoved, setProductremoved] = useState(false);

const removeProductFromCart = async (productId) => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      // Handle case when user is not logged in
     openModal4();
      return;
    }

    const response = await fetch('http://localhost:3034/remove-from-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    });

    const data = await response.json();
    if(data.success){


     
      // alert(data.message)
      setCartItems(data.cartItems)
     
     
     
      

    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    // Handle error
  }
};

const handleIncreaseQuantity = async (productId, quantity) => {
 
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      // Handle case when user is not logged in
     openModal4();
      return;
    }

    if (quantity < 10){
      const response = await fetch('http://localhost:3034/increase-quantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId })
      });
    

    

    const data = await response.json();
    if(data.success){

     
      setCartItems(data.cartItems)
     
     
      

    }
  } else {
    // Quantity is already 1, cannot decrease further
    alert('Quantity cannot be increased further');
  }
  } catch (error) {
    console.error('Error removing from cart:', error);
    setLoader(false);
  }
};

const handleDecreaseQuantity = async (productId, quantity) => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      // Handle case when user is not logged in
      openModal4();
      return;
    }

    if (quantity > 1) {
      const response = await fetch('http://localhost:3034/decrease-quantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId })
      });

      const data = await response.json();
      if (data.success) {
        setCartItems(data.cartItems);
        
      }
    } else {
      // Quantity is already 1, cannot decrease further
      alert('Quantity cannot be decreased further');
    }
  } catch (error) {
    console.error('Error decreasing quantity:', error);
    // Handle error
  }
};

const TotalValue = cartItems.reduce((total, currentItem) => {
  return total + (currentItem.quantity * currentItem.productprice);
}, 0);

const [wishItems, setWishItems] = useState(() => {
  const storedWishItems = JSON.parse(sessionStorage.getItem('wishItems')) || [];
  return storedWishItems;
});



useEffect(() => {
  
  sessionStorage.setItem('wishItems', JSON.stringify(wishItems));
}, [wishItems]);

const handleWish = async (productId,productname,productimg,productprice) => {
       
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      // Handle case when user is not logged in
    openModal4()
      return;
    }

    const response = await fetch('http://localhost:3034/add-to-wish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId,productname,productimg,productprice,quantity:1 })
    });

    const data = await response.json();
    // console.log(data);
    setWishItems(data.wishItems)
    
    // Redirect to cart page after adding to cart
   
  } catch (error) {
    console.error('Error adding to cart:', error);
    // Handle error
  } 
};

const isProductInWish = (productId) => {
  if (wishItems) {
      return wishItems.find(item => item.productId === productId);
  }
  return false;
};
const removeProductFromWish = async (productId) => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      // Handle case when user is not logged in
     openModal4();
      return;
    }

    const response = await fetch('http://localhost:3034/remove-from-wish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    });

    const data = await response.json();
    if(data.success){

      // alert(data.message)
      setWishItems(data.wishItems)
     
     
      

    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    // Handle error
  }
};


const [shippingInfo, setshippingInfo] = useState({});
useEffect(() => {
  
  const fetchCartItems = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        // Handle case when user is not logged in
        return;
      }

      const response = await fetch('http://localhost:3034/get-user-address', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
  if(data.success){
      setshippingInfo(data.data);
  }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      // Handle error
    }
  };

  fetchCartItems();
}, []);



const [message,setMessage] = useState('')
const [allProducts, setAllProducts] = useState([]); // ALL CART ITEMS DETAILS
const [product, setProduct] = useState([]);  // SINGLE PRODUCT BUY DETAILS


// ZOOM ON HOVER ON SINGLE PRODUCT IMAGE 
const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
const [hover, setHover] = useState(false);


//SIZE USE STATES
const [selectedSize, setSelectedSize] = useState('');
  const [isSizeSelected, setIsSizeSelected] = useState(false);

// YOUR ORDERS SELECTED PRODUCT ID 

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [trackinfo, setTrackinfo] = useState([]);
  const [statusinfo, setStatusinfo] = useState('');
  
  
  useEffect(() => {
    const fetchTrackDetails = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          console.log('No Token');
          return;
        }
  
        const response = await fetch('http://localhost:3034/trackinfo', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch track info');
        }
  
        const data = await response.json();
        setTrackinfo(data.trackinfo);
      } catch (error) {
        console.error('Error fetching track info:', error);
      }
    };
  
    fetchTrackDetails();
  }, []);
  
  useEffect(() => {
  const statusInfo = trackinfo
    .filter(info => info.productId === selectedProductId)
    .map(tinfo => tinfo.status)[0]; 

  if (statusInfo !== undefined) {
    
    setStatusinfo(statusInfo);
  }
}, [trackinfo, selectedProductId]);


// COD CAPTCHA 

const [captcha, setCaptcha] = useState(generateCaptcha());
const [inputText, setInputText] = useState('');
const [captchamsg, setCaptchamsg] = useState('');



function generateCaptcha() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let captcha = '';
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
}

  

  
  

  




  return (
    <MyContext.Provider value={{captchamsg,setCaptchamsg,inputText,setInputText,captcha,setCaptcha,setStatusinfo, statusinfo,trackinfo,setTrackinfo,selectedProductId,setSelectedProductId,selectedSize,setSelectedSize,isSizeSelected,setIsSizeSelected,   ForgotHide,BothHide,hover,setHover,cursorPosition ,setCursorPosition,product,setProduct,allProducts,setAllProducts,isLoading,message,setMessage,setshippingInfo,shippingInfo,handleBuy,handleWish,loading,handleCheckout,wishItems,setWishItems,cartItems,setCartItems,token,handleLogin,userdata,setUserData,handleLogout,login,setLogin,loader,setLoader,LoginHide,RegisterHide,isAuthenticated,setIsAuthenticated,openModal4,closeModal4,showLogin,setShowLogin,AddToPrice,cartValue,isProductInCart,productremoved,currentStep,handleNext,handlePrev,data,handleNavigate,isProductInWish,formatReviewCount,removeProductFromWish,HeadingText,HeadingText1,showCart,setShowCart,removeProductFromCart,handleIncreaseQuantity,handleDecreaseQuantity,TotalValue,showWishList,setShowWishList,openModal,closeModal,openModal1,closeModal1,showSearch,closeModal2,openModal2,}} >
      {children}
    </MyContext.Provider>
  )
}

export default MyContextProvider