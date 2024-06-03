import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";


const Dashboard = () => {
    return (
        <div className=" flex">
            <div className=" w-[25%]"><SideBar></SideBar></div>
            <div className=" w-[75%]"><Outlet></Outlet></div>
        </div>
    );
};

export default Dashboard;