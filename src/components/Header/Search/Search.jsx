import React, { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import "./Search.scss";
import MyContext from "../../../Uttis/MyContext";
import { useNavigate } from "react-router-dom";



const Search = () => {

    const Navigate = useNavigate()

    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
        // console.log(event.target.value)
      };
    const {data,closeModal1} = useContext(MyContext);
  
    

  
    return (
        <div className="search-modal">

            <div className="form-field">
                <input
                    autoFocus
                    type="text"
                    placeholder="Search for products..."
                    value={value}
                    onChange={onChange}
                  
                   
                />
                <MdClose
                    className="close-btn"
                    onClick={closeModal1}
                />
            </div>

            <div className="search-result-content">
              
                <div className="search-results">

{
    data
    .filter((Item) => {
        const userValue = value.toLowerCase()
        const defaultValue = Item.product_category.toLowerCase()

        return(
        userValue &&
            defaultValue.startsWith(userValue)
            // &&  defaultValue !== userValue
        )
    })

  
    
    .map((Item) => {
        return(
            <div className="search-result-item" >
                            
                            
            <span className="name"   onClick={() => Navigate(`/category/${Item.product_category}`) || closeModal1()}>
         {Item.product_category}
            </span>
           
            
       
    </div>
        )
    })
}
     
                
                       
                  
                </div>
            </div>
        </div>
    );
};

export default Search;