

import AllProducts from "./AllProducts/AllProducts";
import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import "./Home.scss";
import React from 'react';

// import Increament from "./Increament/Increament";

const Home = () => {
  
   
    return <div>
  <Banner/>
        
        <div className="main-content">

       
            <div className="layout">
               
                <Category  />
              

                <AllProducts/>

            

              

            </div>
        </div>

        {/* <Increament/> */}

     

    </div>;
};

export default Home;
