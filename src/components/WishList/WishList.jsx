import React, { useContext, useEffect, useState } from 'react';
import "./WishList.scss";
import { MdClose, MdDelete } from 'react-icons/md';
import { FaLongArrowAltRight } from "react-icons/fa";
import { TbMoodEmpty } from "react-icons/tb";
import MyContext from '../../Uttis/MyContext';

const WishList = () => {
  const {
    selectedSize,
    setSelectedSize,
    isSizeSelected,
    setIsSizeSelected,
    handleNavigate,
    data,
    setCartItems,
    handleCheckout,
    setWishItems,
    wishItems,
    closeModal,
    isProductInCart,
    removeProductFromWish
  } = useContext(MyContext);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleNavigateMain = (productId) => {
    let category;
    let productCategory;
    for (const categoryObj of data) {
      category = categoryObj.product_container.find(item => item.id === productId);
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
    const fetchWishItems = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          return;
        }

        const response = await fetch('https://vhx.vercel.app/wish', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();

        setWishItems(data.wishItems);
        setCartItems(data.cartItems)
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchWishItems();
  }, [setCartItems, setWishItems]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setIsSizeSelected(true);
    console.log(size);
  };

  return (
    <div className='wish-model'>
      <div className="opac-layer"></div>
      <div className="wish-content">
        <div className="close" onClick={closeModal}><MdClose /></div>
        <div className='wish-center'>
          {wishItems.length === 0 ?
            <div className='no-wish'>
              <span className='empty-wish'><TbMoodEmpty /></span>
              <span className='empty-text'>You have No Item In WishList</span>
            </div>
            :
            wishItems?.map((Item) => {             
               return (
                <div className="wish-product" key={Item.productId}>
                  <div className="img-container" onClick={() => handleNavigateMain(Item.productId)}>
                    <img src={Item.productimg} alt="" />
                  </div>
                  <div className="prod-details">
                    <span className="name">{Item.productname}</span>
                    <span className="highlight">&#8377;{Item.productprice}</span>
                    {selectedProduct === Item.productId && (
                      <div className="sizebtn">
                        <button
                          style={{ backgroundColor: selectedSize === "S" ? '#cfcece' : "white" }}
                          onClick={() => handleSizeSelect("S")}
                        >
                          S
                        </button>
                        <button
                          style={{ backgroundColor: selectedSize === "M" ? '#cfcece' : "white" }}
                          onClick={() => handleSizeSelect("M")}
                        >
                          M
                        </button>
                        <button
                          style={{ backgroundColor: selectedSize === "L" ? '#cfcece' : "white" }}
                          onClick={() => handleSizeSelect("L")}
                        >
                          L
                        </button>
                      </div>
                    )}
                    {isProductInCart(Item.productId) ? (
                      <span className='move-cart' style={{ cursor: "no-drop" }}>Already In Cart</span>
                    ) : (
                      <span className='move-cart' onClick={() => {
                        if (!isSizeSelected) {
                          setSelectedProduct(Item.productId);
                        } else {
                          // Check if size is selected before moving to cart
                          if (isSizeSelected) {
                            removeProductFromWish(Item.productId);
                            handleCheckout(Item.productId, Item.productname, Item.productimg, Item.productprice);
                            setIsSizeSelected(false);
                          } else {
                            // Size not selected, prompt user to select size
                            alert("Please select a size before adding to cart.");
                          }
                        }
                      }}>
                        Move To Cart &nbsp; <FaLongArrowAltRight />
                      </span>
                    )}
                  </div>
                  <span className='delete' onClick={() => removeProductFromWish(Item.productId)}><MdDelete /></span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default WishList;
