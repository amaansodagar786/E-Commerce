import "./CartItem.scss";
import { MdClose } from "react-icons/md";
import MyContext from "../../../Uttis/MyContext";
import { useContext, useEffect, useState} from "react";
import {BsCartX} from "react-icons/bs"
import { useNavigate } from "react-router-dom";

const CartItem = () => {

    const {increase,data,handleNavigate,cartItems,setCartItems,closeModal2,removeProductFromCart,handleIncreaseQuantity,handleDecreaseQuantity} = useContext(MyContext)
    const Navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    
    const handleNavigateMain = (productId) => {
      let category;
      let productCategory; // Declare a variable to store the product category
      for (const categoryObj of data) {
          category = categoryObj.product_container.find(product => product.id === productId);
          if (category) {
              productCategory = categoryObj.product_category; 
              break;
          }
      }
  
      if (!category) {
          console.log('Product not found');
          return;
      }
  
      const newCategory = productCategory;
      const itemToNavigate = category.single_product_category; 
  
      return handleNavigate(newCategory, itemToNavigate);
  }
  
  
  
  
  

    useEffect(() => {
        setLoading(true);
        const fetchCartItems = async () => {
          try {
            const token = sessionStorage.getItem('token');
            if (!token) {
              // Handle case when user is not logged in
              return;
            }
    
            const response = await fetch('https://updated-backend-brown.vercel.app/cart', {
  headers: { Authorization: `Bearer ${token}` }
});
    
            const data = await response.json();
        
            setCartItems(data.cartItems);
          } catch (error) {
            console.error('Error fetching cart items:', error);
            // Handle error
          } finally {
            setLoading(false);
          }
        };
    
        fetchCartItems();
      }, [setCartItems]);
    
      if (loading) {
        return <div>Loading...</div>;
      }
   
    return <div className="cart-products">

        {
        cartItems.length ===0 ? 

            <div className="no-item">
                <span><BsCartX size={60}/></span>
                <h3>No Item In Cart</h3>
                <button className="add-to-cart-button" onClick={() => Navigate('/') || closeModal2()}>Go For Shopping</button>
            </div>:
            
            
            cartItems?.map((Item) =>{
                return(
                    <div className="cart-product" >
                    <div className="img-container" onClick={() => handleNavigateMain(Item.productId)}>
                        <img src={Item.productimg} alt="" />
                        <span className="sizespan"> {Item.productsize}</span>
                        
                    </div>
        
                    <div className="prod-details">

                        <span className="name">{Item.productname}</span>
                      
                         <MdClose className="close-btn" onClick={() => removeProductFromCart(Item.productId)}/>
      
                        <div className="quantity-buttons">

                            

                            

                            <span onClick={() => handleDecreaseQuantity(Item.productId,Item.quantity)}>-</span>
                            {increase ? <span>Loading</span> : <span>{Item.quantity}</span>}
                            <span onClick={() => handleIncreaseQuantity(Item.productId,Item.quantity)}> {loading ? '' : '+'}</span>

                           
                        </div>
                        <div className="text">
                            <span>{Item.quantity}</span>
                            <span>x</span>
                            <span className="highlight"> &#8377;{Item.productprice}</span>
                        </div>
                    </div>
                </div>
                )
             })
        } 
      



        
        
    </div>;
};

export default CartItem;