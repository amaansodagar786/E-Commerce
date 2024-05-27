import "./Cart.scss";
import { MdClose } from "react-icons/md";
import CartItem from "./CartItem/CartItem";
import { useContext, useState } from "react"; // Import useState
import MyContext from "../../Uttis/MyContext";

const Cart = () => {
  const { AddToPrice, cartItems, closeModal2, TotalValue ,allProducts , setAllProducts,removeProductFromCart} = useContext(
    MyContext
  );
  
  // Define state for all products
//   const [allProducts, setAllProducts] = useState([]);

const Saveproducts = () => {
  const productsDetails = cartItems.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    productimg: item.productimg,
    productname: item.productname,
    productsize: item.productsize,
    productprice: item.productprice,
  }));
  setAllProducts(productsDetails);
  console.log(" Product Details:", productsDetails);

  // Call removeProductFromCart for each item in cartItems
  // cartItems.forEach((item) => {
  //   removeProductFromCart(item.productId);
  // });
};

  return (
    <div className="cart-panel">
      <div className="opac-layer"></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          <span className="close-btn" onClick={closeModal2}>
            <MdClose />
            <span className="text">close</span>
          </span>
        </div>

        <CartItem />
        <div className="cart-footer">
          <div className="subtotal">
            <span className="text">Subtotal</span>
            <span className="text total">&#8377; {TotalValue}</span>
          </div>
          <div className="button">
            {cartItems && cartItems.length > 0 ? (
              <button
                className="checkout-cta"
                onClick={() => {
                  AddToPrice(TotalValue);
                  Saveproducts(); 
                //   console.log("All Product IDs:", productIds);

                }}
              >
                Checkout
              </button>
            ) : (
              <button
                className="checkout-cta"
                disabled
                style={{ opacity: "0.7", cursor: "no-drop" }}
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
