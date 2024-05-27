import "./SingleProduct.scss";

import {
  FaFacebookF,
  FaCartPlus,
  FaCopy,
  FaWhatsapp,
  FaTwitter,
} from 'react-icons/fa';
import { useParams } from "react-router-dom";
import SingleImage from "./SingleImage/SingleImage";
import RelatedProduct from "../Category/RelatedProduct/RelatedProduct";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useContext, useEffect, useState } from "react";
import MyContext from "../../Uttis/MyContext";
import { AiFillHeart, AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import StarRating from "../StarRating/StarRating";

const SingleProduct = () => {
  const {
    loading,
    handleCheckout,
    handleWish,
    setShowCart,
    isProductInCart,
    data,
    isProductInWish,
    handleBuy,
    formatReviewCount,
    removeProductFromWish,
    product,
    setProduct,
    setCursorPosition,
    cursorPosition,
    hover,
    setHover,
    selectedSize,
    setSelectedSize,
    isSizeSelected,
    setIsSizeSelected


  } = useContext(MyContext);

  const [isMobile, setIsMobile] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  // const [selectedSize, setSelectedSize] = useState('');
  // const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [divshow, setDivshow] = useState(false);





  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };


    window.addEventListener('resize', handleResize);


    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setIsSizeSelected(true);
    setDivshow(false);

    console.log(size);

  };



  const Saveproduct = (item) => {
    const productDetails = {
      productId: item.id,
      quantity: item.quantity,
      productimg: item.imgs,
      productname: item.product_name,
      productsize : selectedSize,
      productprice: item.product_price,
      
    };
    setProduct([productDetails]);
    console.log("Product Details:", productDetails);
  };


  // const Saveproduct = (item) => {
  //   const productId = item.id;
  //   setProduct(productId);
  //   console.log("Product Details:", product);
  // };

  const { title, name } = useParams();
  const dynamicUrl = `/category/${title}/${name}`;
  const fullUrl = window.location.origin + dynamicUrl;

  return (
    <>
      <div className="single-product-main-content">
        <div className="layout">
          {data
            .filter((Item) => Item.product_category === title)
            .map((Item) => (
              <>
                {Item.product_container
                  .filter((Item) => Item.single_product_category === name)
                  .map((Item) => (
                    <div className="single-product-page" key={Item.id}>
                      <div className="left">
                        <SingleImage
                          Imgs={Item.imgs}
                          First={Item.first}
                          Second={Item.second}
                          Third={Item.third}
                          onImageHover={setHoveredImage}
                        />
                        {isProductInWish(Item.id) ? (
                          <span
                            className="heart"
                            onClick={() => removeProductFromWish(Item.id)}
                          >
                            <AiFillHeart/>
                          </span>
                        ) : (
                          <span
                            className="heart"
                            onClick={() =>
                              handleWish(
                                Item.id,
                                Item.product_name,
                                Item.imgs,
                                Item.product_price
                              )
                            }
                          >
                            <AiOutlineHeart />
                          </span>
                        )}
                      </div>
                      <div className="right">
                        <span className="name">{Item.product_name}</span>
                        <span className="price">
                          &#8377;{Item.product_price} &nbsp;{" "}
                          <del style={{ color: "rgba(0,0,0,0.5)" }}>
                            {" "}
                            &#8377;{Item.product_price_deleted}{" "}
                          </del>
                        </span>
                        <div className="rating">
                          <StarRating />
                          {Item.rating} ({formatReviewCount(Item.count)})
                        </div>
                        <span className="desc">
                          <pre>{Item.product_description}</pre>
                        </span>


                        <div className="sizebtn">
                          <button
                            style={{
                              backgroundColor: selectedSize === Item.product_size1 ? '#cfcece' : "white",
                            }}
                            onClick={() => handleSizeSelect(Item.product_size1)}
                          >
                            {Item.product_size1}
                          </button>
                          <button
                            style={{
                              backgroundColor: selectedSize === Item.product_size2 ? '#cfcece' : "white",
                            }}
                            onClick={() => handleSizeSelect(Item.product_size2)}
                          >
                            {Item.product_size2}
                          </button>
                          <button
                            style={{
                              backgroundColor: selectedSize === Item.product_size3 ? '#cfcece' : "white",
                            }}
                            onClick={() => handleSizeSelect(Item.product_size3)}
                          >
                            {Item.product_size3}
                          </button>
                        </div>

                        {/* <div className="size-error" style={{ display: divshow ? 'block' : 'none' }}>
                          Select a size!
                        </div> */}
                        { divshow &&
                        <div className="size-error" >
                        Select a size!
                      </div>

                        }



                        <div className="cart-buttons">
                          {isProductInCart(Item.id) ? (
                            <button
                              className="add-to-cart-button"
                              onClick={() => setShowCart(true)}
                            >
                              <FaCartPlus size={20} /> &nbsp; Go To Cart
                            </button>
                          ) : (
                            <button
                              className="add-to-cart-button"
                              onClick={() => {
                                if (isSizeSelected) {
                                  setDivshow(false)
                                  handleCheckout(
                                    Item.id,
                                    Item.product_name,
                                    Item.imgs,
                                    Item.product_price,
                                    
                                  );
                                } else {
                                  setDivshow(true); 
                                }
                              }}
                              disabled={loading}
                            >
                              {loading ? (
                                "Adding to Cart..."
                              ) : (
                                <>
                                  <FaCartPlus size={20} /> &nbsp; Add To Cart
                                </>
                              )}
                            </button>
                          )}
                          <button
                            className="add-to-cart-button"
                            onClick={() => {
                              if (isSizeSelected) {
                                
                                handleBuy(Item.product_price);
                                Saveproduct(Item);
                              
                              } else {
                                setDivshow(true); 
                              }

                            }}
                          >
                            &nbsp; Buy Now
                          </button>
                        </div>
                        <span className="divider" />
                        <div className="info-item">
                          <span className="text-bold">
                            Category:
                            <span className="normal-text">&nbsp;{title}</span>
                          </span>
                          <span className="text-bold">
                            Share:
                            <span
                              className="Social-icons"
                              style={{ display: "flex" }}
                            >
                              <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                  fullUrl
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaFacebookF title="facebook" />
                              </a>
                              <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                  fullUrl
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaTwitter title="instergram" />
                              </a>
                              <a
                                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                                  fullUrl
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaWhatsapp title="whatsapp" />
                              </a>
                              <CopyToClipboard text={fullUrl}>
                                <FaCopy title="copy" />
                              </CopyToClipboard>
                            </span>
                          </span>
                        </div>
                      </div>
                      <div
                        className='display'
                        style={{
                          backgroundImage: `url(${hoveredImage ? hoveredImage : Item.imgs})`,
                          backgroundPosition: `-${cursorPosition.x}px -${cursorPosition.y}px`,
                          display: isMobile ? 'none' : (hover ? 'block' : 'none')
                        }}
                      ></div>
                    </div >
                  ))}
              </>
            ))}
        </div>
      </div >
      <RelatedProduct />
    </>
  );
};

export default SingleProduct;