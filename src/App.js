import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Header from "./components/Header/Header";
import Newsletter from "./components/Footer/Newsletter/Newsletter";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "react-scroll-to-top";
import Conatct from "./components/Contact/Conatct";
import GoToTop from "./components/useLocation/UseLocation-up";

import Account from "./components/Categories/Categories";
import MyContextProvider from "./Uttis/MyContextProvider";
import Load from "./components/Loader/Loader";
import Checkout from "./components/Checkout/Checkout";
import RegisterForm from "./Register";
import NoPage from "./components/NoPage/NoPage";
import { ImArrowUp } from "react-icons/im";
import { useContext, useState } from "react";
import MyContext from "./Uttis/MyContext";
import Profile from "./Authentication/Account/Account";
import Youraccount from "./Authentication/Account/Accountinfo/Youraccount";
import Yourorders from "./Authentication/Account/Accountinfo/Yourorders";
import Youraddress from "./Authentication/Account/Accountinfo/Youraddress";
import Trackorder from "./Authentication/Account/Accountinfo/Trackorder";




function App() {

    const [loader, setLoader] = useState(false)
    const data = useContext(MyContext)
    const isLoading = useContext(MyContext)





    return (
        <>












            <BrowserRouter>




                {isLoading && <Load />}
                <MyContextProvider>

                    {loader && <Load />}
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/contact" element={<Conatct setLoader={setLoader} />} />

                        <Route path="/categories" element={<Account Data={data} />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="*" element={<NoPage />} />

                        <Route path="/profile" element={<Profile />} />
                        <Route path="/account" element={<Youraccount />} />
                        <Route path="/orders" element={<Yourorders />} />
                        <Route path="/address" element={<Youraddress />} />

                        <Route path="/category/:title" element={<Category />} />
                        <Route path="/category/:title/:name" element={<SingleProduct Data={data} />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/trackorder" element={<Trackorder />} />
                        

                    </Routes>
                    <Newsletter setLoader={setLoader} />
                    <Footer />

                    <ScrollToTop smooth component={<ImArrowUp size={20} color="black" />} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} />


                    <GoToTop />

                </MyContextProvider>
            </BrowserRouter>

        </>
    )
}

export default App;
