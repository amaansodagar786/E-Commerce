import React from 'react'
import Prod from "../../../assets/banner/banner1.png"
import Prod3 from "../../../assets/banner/banner3.png"
import Prod4 from "../../../assets/banner/banner4.png"
import "./Banner.scss"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Banner = (props) => {
  return (
    <div className='home-banner'>
       <Carousel
   autoPlay={props.deviceType !== "mobile" ? true : false}
   autoPlaySpeed={3000}
   centerMode={false}
   removeArrowOnDeviceType={["tablet", "mobile"]}
//    customTransition="all .5"
  transitionDuration={500}
 
 
 
   draggable
   focusOnSelect={false}
   infinite={true}
  
   keyBoardControl
   // minimumTouchDrag={80}
   pauseOnHover ={false}
   // renderArrowsWhenDisabled={false}
   // renderButtonGroupOutside={false}
   // renderDotsOutside={false}
 
  
 
  responsive={{
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 1
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 1
    }
  }}
  rewind={false}
  rewindWithAnimation={false}
  rtl={false}
  shouldResetAutoplay
  showDots ={false}
  sliderClass=""
  slidesToSlide={1}
  swipeable
>
  <img
    src={Prod} alt=''
    />

  <img
   src={Prod3} alt=''
   
  />
  <img
    src={Prod4} alt=''
    
  />
  
</Carousel>
    </div>
  )
}

export default Banner