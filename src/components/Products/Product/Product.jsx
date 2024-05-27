import "./Product.scss";


const Product = ({Data}) => {

    return (

        <>

        {
            Data.filter((Item) => Item.home_category === "popular").slice(0,25).map((Item)=>{
                return(
                    <div className="product-card">



                    <div className="thumbnail">
                        <img src={Item.product_img} alt=""/>
                    </div>
                    <div className="prod-details">
                        <span className="name">{Item.product_title}</span>
                        <span className="price">&#8377;{Item.product_price}</span>
                    </div>
                
                
                </div>

                )
            })
        }

</>
   
    )
};

export default Product;
