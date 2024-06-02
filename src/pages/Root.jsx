import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const Root = () => {
    return (
        <>
            <div className=" bg-transparent border-b mb-16">
                <div className="max-w-[1440px] mx-auto px-[5%]">
                    <Navbar></Navbar>
                </div>
            </div>
            <div className=" max-w-[1440px] mx-auto px-[5%] font-poppins font-medium">
                <Outlet></Outlet>
            </div>
            <div className=" bg-footer">
                <div className="max-w-[1440px] mx-auto px-[5%] mt-16">
                    <Footer></Footer>
                </div>
            </div>
        </>
    );
};

export default Root;