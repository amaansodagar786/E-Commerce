import React from 'react'
import "./Card.scss"



const Card = ({Data}) => {
  return (
    <div className='card-main'>


      {
        Data.slice(0,10).map((Item)=>{
          return(

            <div className="card-contain" key={Item.id} style={Item.color} >
            <div className="left">
              <img src={Item.about_page_route_img} alt="" />
            </div>
    
            <div className="right">
              <p>{Item.about_page_route_title}</p>
            </div>
          </div>

          )
        })
      }
     
    </div>
  )
}

export default Card