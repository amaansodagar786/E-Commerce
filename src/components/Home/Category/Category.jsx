import { useNavigate } from "react-router-dom";
import "./Category.scss";
import { useContext } from "react";
import MyContext from "../../../Uttis/MyContext";




const Category = () => {

   
    const {data,HeadingText} = useContext(MyContext);
   
    const Navigate = useNavigate()
    
    return (

    
   
    <div className="shop-by-category">
        <div className="sec-heading">{HeadingText}</div>

        
  
        <div className="categories">

{
    data.map((Item) => {
        return (
           
           
            <div className="category" key={Item.id}  onClick={() => (Navigate(`/category/${Item.product_category}`)) }>
                <img src={Item.home_page_route_category_page_img} alt="" />
            </div>
        )
    })
}



</div>

    </div>

    

    )
    
};

export default Category;
