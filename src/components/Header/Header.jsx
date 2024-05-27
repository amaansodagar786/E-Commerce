import "./Header.scss";
import { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineSearch,AiFillHeart } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg"
import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import log from "../../assets/logo.png"
import { useLocation, useNavigate} from "react-router-dom";

import WishList from "../WishList/WishList";

import MyContext from "../../Uttis/MyContext";
import Login from "../../Authentication/Login/Login";
import Chkheader from "./CheckoutHeader/Chkheader";



const Header = () => {

   



    

 

    const {data ,wishItems,token,handleLogout,showCart,cartItems,openModal,showWishList,showSearch,openModal1,openModal2,showLogin,openModal4} = useContext(MyContext)

    const Navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false)

  
                                                                                    
   
    
  
   
   

    

    const HandleScroll = () => {

       



        const offset = window.scrollY
        if (offset > 200) {
            setScrolled(true);

        } else {
            setScrolled(false);
        }

    }



    useEffect(() => {
        window.addEventListener("scroll", HandleScroll)


    }, [])


   
    const location = useLocation();
  
   
    
  
   
  
    if (location.pathname==='/checkout') {
      
      return <Chkheader/>;
    }



   
    return (

        <>
       
            <header className={`main-header ${scrolled ? 'sticky-header' : ""}`}>
                <div className="header-content">
                    
                    <div className="left" onClick={() => Navigate('/')}>
                    <img src={log} alt=""/>
                    </div>
                    <div className="center">The view Of Fitness</div>
                    <div className="right">
                    {token?
                        <>
                    <span onClick={() => Navigate(`/profile`)}>account</span>

                    
                        <span onClick={handleLogout}>logout</span>
                        </>:
                        <span onClick={openModal4}>login</span>
                    }
            
           
                        <AiOutlineSearch onClick={openModal1} />
                      { 
                        wishItems.length >0 ?
                        <AiFillHeart onClick={openModal}/>:
                         <AiOutlineHeart onClick={openModal} />
                       
                        }
                       
                        <span className="cart-icon " onClick={openModal2}>
                            <CgShoppingCart />
                            <span>{cartItems.length}</span>
                        </span>
                       
                    </div>
                </div>
            </header>
            {showCart &&
                <Cart />


            }

            {showSearch &&
                <Search />
            }


           

           
{
    showWishList && 


                <WishList/>
}

{
    showLogin && 


                <Login/>
}
            


        </>
    )


};

export default Header;
