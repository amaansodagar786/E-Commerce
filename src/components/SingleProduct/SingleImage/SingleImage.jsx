import React, { useContext } from 'react'
import "./SingleImage.scss"
import MyContext from '../../../Uttis/MyContext';


const SingleImage = ({ Imgs, First, Second, Third , onImageHover  }) => {

   const {
      cursorPosition,
      setCursorPosition,
      hover,
      setHover

   } = useContext(MyContext);


   const handleMouseMove = (event) => {
      const image = document.getElementById('change');
      const rect = image.getBoundingClientRect();
      const x = event.clientX - rect.left - 25; // Subtract 25 to center horizontally
      const y = event.clientY - rect.top - 25; // Subtract 25 to center vertically

      setCursorPosition({ x, y });
      setHover(true); 
   };

   const handleMouseLeave = () => {
      setHover(false); 
   };



   const Img1Over = () => {
      document.getElementById("change").src = First
      onImageHover(First);
   }

   const Img2Over = () => {
      document.getElementById("change").src = Second
      onImageHover(Second);
   }

   const Img3Over = () => {
      document.getElementById("change").src = Third
      onImageHover(Third);
   }
   return (
      <>
         <img
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            src={Imgs}
            alt=""
            id='change'
         />
         <div className='box-main'>
            <div className="box" onMouseOver={Img1Over}>
               <img src={First} alt="" />
            </div>
            <div className="box" onMouseOver={Img2Over}>
               <img src={Second} alt="" />
            </div>
            <div className="box" onMouseOver={Img3Over}>
               <img src={Third} alt="" />

            </div>
         </div>


      </>
   )
}

export default SingleImage