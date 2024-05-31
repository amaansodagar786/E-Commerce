import React, { useContext, useState } from 'react';
import "./MainProduct.scss";
import StarRating from '../StarRating/StarRating';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import MyContext from '../../Uttis/MyContext';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FaCartPlus } from 'react-icons/fa';
import Loader from '../Loader/Loader';

const MainProduct = ({ Data, Item }) => {
    const {
        isLoading, handleWish, setShowCart, formatReviewCount,
        isProductInWish, isProductInCart, removeProductFromWish,
        handleNavigate, handleCheckout
    } = useContext(MyContext);

    const [isHovered, setIsHovered] = useState(false);

    const isMobileView = () => window.innerWidth <= 768;


    return (

        <>
        { isLoading && <Loader />

        }
        { !isLoading && (
        <div className="category-container">
            <div className="product-page"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>

                <Carousel
                    showThumbs={false}
                    showArrows={false}
                    onClickItem={() => handleNavigate(Item.product_category, Data.single_product_category)}
                    showStatus={false}
                    transitionTime={300}
                    autoPlay={!isMobileView() && isHovered}
                    selectedItem={0}
                    interval={1300}
                    stopOnHover={false}
                    infiniteLoop={true}
                    showIndicators={!isMobileView() && isHovered}
                    emulateTouch={!isMobileView() && isHovered}
                    swipeable={!isMobileView() && isHovered}
                    dynamicHeight={false}
                    transitionEffect="fade"
                >
                    <img src={Data.imgs} alt="Product Image 1" />
                    <img src={Data.first} alt="Product Image 2" />
                    <img src={Data.second} alt="Product Image 3" />
                    <img src={Data.third} alt="Product Image 4" />
                </Carousel>

                {isProductInWish(Data.id) ? (
                    <span className="heart" onClick={() => removeProductFromWish(Data.id)}>
                        <AiTwotoneHeart />
                    </span>
                ) : (
                    <span className="heart" onClick={() => handleWish(Data.id, Data.product_name, Data.imgs, Data.product_price)}>
                        <AiOutlineHeart />
                    </span>
                )}
            </div>

            <div className='product-content'>
                <div className="product-name">{Data.product_name}</div>
                <div className="rating">
                    <StarRating />{Data.rating} ({formatReviewCount(Data.count)})
                </div>
                <div className="product-price">
                    &#8377;{Data.product_price} &nbsp;
                    <span className="product-price-deleted">
                        &#8377;<del>{Data.product_price_deleted}</del>
                    </span>
                </div>
            </div>
        </div>
        )}
        </>
    );
};

export default MainProduct;
