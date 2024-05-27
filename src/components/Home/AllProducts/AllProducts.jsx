

import { useContext } from "react";
import "./AllProducts.scss";


import MyContext from "../../../Uttis/MyContext";


import MainProduct from "../../MainProduct/MainProduct";




const AllProducts = () => {

    const {data} = useContext(MyContext)

    






  












  



    return (


        <>



            <div className="all-category-page">

            <div className="category-heading">Popular Products

</div>

<div className="category-products">

                {


                    data.map((Item) => {
                        return (

                            <>


                               





                               

                                    {
                                        Item.product_container






     
   

                                            .map((Data2) => {
                                                return (


                                                  <MainProduct Data={Data2} Item ={Item}/>
                                                )
                                            })
                                    }











                              

                            </>

                        )
                    })
                }


</div>



            </div>



        </>
    )
};

export default AllProducts;
