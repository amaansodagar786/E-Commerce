import React, { useContext, useEffect, useState } from 'react';
// import { AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
// import { CgShoppingCart } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import log from "../../../assets/logo.png";
import MyContext from '../../../Uttis/MyContext';

const Chkheader = () => {

    const { data, cartItems, setCartItems , setWishItems , wishItems } = useContext(MyContext)


    const Navigate = useNavigate();


    const logoclick = (e) => {
        e.stopPropagation();
        if (window.confirm("Are You Sure You Want To Go Home Page")) {

            if (window.confirm("Your All Data Will Disappear")) {
                
               
                Navigate('/');
                
            }
        }
    }



    const [scrolled, setScrolled] = useState(false);


    const HandleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };


    useEffect(() => {
        window.addEventListener("scroll", HandleScroll);
        return () => {
            window.removeEventListener("scroll", HandleScroll);
        };
    }, []);







    return (
        <>
            <header className={`main-header ${scrolled ? 'sticky-header' : ""}`}>
                <div className="header-content">
                    <div className="left" >
                        <img onClick={logoclick} src={log} alt="" />
                    </div>
                    <div className="center">The view Of Fitnesssss</div>

                </div>
            </header>
        </>
    );
};

export default Chkheader;
