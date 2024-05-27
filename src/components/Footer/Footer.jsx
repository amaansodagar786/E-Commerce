import "./Footer.scss";
import { FaLocationArrow,FaMobileAlt,FaEnvelope } from "react-icons/fa";
import Payment from "../../assets/payments.png"
import { useNavigate } from "react-router-dom";




const Footer = () => {

    const Navigate = useNavigate()
    return <footer className="footer">
    <div className="footer-content">
        <div className="col">
            <div className="title">About</div>
            <div className="text">
            Stay attuned to men's fashion trends and ensure that VHX offerings align with contemporary styles. Highlight key fashion elements and styles that resonate with your male audience
            </div>
        </div>


        <div className="col">
        <div className="title">Contact</div>

        <div className="c-item">
            <FaLocationArrow/>
            <div className="text">202,kunal complex
             nizampura,vadodara-390002</div>
        </div>

        <div className="c-item">
            <FaMobileAlt/>
            <div className="text">+931 605 1171</div>
        </div>
       

        <div className="c-item">
            <FaEnvelope/>
            <div className="text">veeragraval@v-extechsolution.in</div>
        </div>
        </div>

        <div className="col">
        <div className="title">Categories</div>
        <div className="text" onClick={() => Navigate('/category/t-shirt')}>T-shirt</div>
        <div className="text" onClick={() => Navigate('/category/sport-shoes')}>Shoes</div>
        <div className="text" onClick={() => Navigate('/category/track-pants')}>Track Pents</div>
        <div className="text" onClick={() => Navigate('/category/gym-tank')}>Gym Tank</div>
       
       
        
        
        </div>

        <div className="col">
        <div className="title">Pages</div>
        <span className="text" onClick={() => Navigate('/')}>Home</span>
        
        <span className="text" onClick={() => Navigate('/contact')}>Contact Us</span>
       
        
        </div>
        
    </div>

    <div className="bottom-bar">
        <div className="bottom-bar-content">
            <div className="text">
                VRX View 2023 CREATED BY VEER.PREMIUM E-COMERCE SOLUTION.
            </div>
            <img src={Payment} alt=""/>
        </div>
    </div>


    </footer>;
};

export default Footer;
