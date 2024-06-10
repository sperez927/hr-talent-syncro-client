import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";


const Dashboard = () => {
    return (
        <div className=" flex">
            <div className="lg:w-[25%]"><SideBar></SideBar></div>
            <div className=" w-full lg:w-[75%]"><Outlet></Outlet></div>
        </div>
    );
};

export default Dashboard;