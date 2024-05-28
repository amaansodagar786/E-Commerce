

import { useContext, useState } from "react";
import "./Category.scss";

import { useParams } from "react-router-dom";

import MainProduct from "../MainProduct/MainProduct";
import MyContext from "../../Uttis/MyContext";




const Category = () => {




    const { data } = useContext(MyContext)

    const [sortOrder, setSortOrder] = useState("");

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const sortedProducts = data.map((Item) => {
        const sortedVariants = [...Item.product_container].sort((a, b) => {
            return sortOrder === 'asc' ? a.product_price - b.product_price : sortOrder === 'desc' ? b.product_price - a.product_price : sortOrder === 'rating' ? b.count - a.count : null

        });

        return { ...Item, product_container: sortedVariants };
    });









    const { title } = useParams()










    return (


        <>



            <div className="category-page">

                {
                    sortedProducts.filter(Item => Item.product_category === title).map((Item) => {
                        return (

                            <>


                                <div className="category-heading">{Item.product_heading}


                                    <select onChange={handleSortChange} className="select-filter">
                                        <option selected disabled>Filter</option>
                                        <option value="asc">Low to High</option>
                                        <option value="desc">High to Low</option>
                                        <option value="rating">by rating</option>

                                    </select>

                                </div>





                                <div className="category-products">

                                    {
                                        Item.product_container






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

export default Category;
