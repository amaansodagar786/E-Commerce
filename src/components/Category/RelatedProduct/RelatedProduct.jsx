

import { useContext } from "react";
import "./RelatedProduct.scss";

import { useParams } from "react-router-dom";
import MyContext from "../../../Uttis/MyContext";

import MainProduct from "../../MainProduct/MainProduct";





const RelatedProduct = () => {






    const {data} = useContext(MyContext);









    const { title } = useParams()
    const {name} = useParams()







    return (


        <>



            <div className="category-page">

                {
                    data.filter(Item => Item.product_category === title).map((Item) => {
                        return (

                            <>


                                <div className="category-heading">Related Products


                                   

                                </div>





                                <div className="category-products">

                                    {
                                        Item.product_container
                                        .filter(Item => Item.single_product_category !== name)






                                            .map((Data2) => {
                                                return (


                                                   <MainProduct Data={Data2} Item={Item} />
                                                )
                                            })
                                    }











                                </div>

                            </>

                        )
                    })
                }



            </div>



        </>
    )
};

export default RelatedProduct;
