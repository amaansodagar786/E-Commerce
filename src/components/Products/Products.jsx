import Product from "./Product/Product";
import "./Products.scss";


const Products = ({headingText,Data,innerPage}) => {
    return <div className="products-container">
 {!innerPage && <div className="sec-heading">{headingText}</div>}
   <div className="products">

   <Product Data={Data}/>
  

   </div>
    </div>;
};

export default Products;
