import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";


const SideBar = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className=" space-y-10 w-[25%] h-screen flex flex-col justify-between bg-primary py-6 pl-10 text-white">
            <div className="space-y-10 ">
                <h1 className=" text-2xl font-bold underline">Talent Syncro</h1>
                <div className=" flex items-center gap-3">
                    <img className=" w-20 h-20 rounded-full object-cover object-top" src={user?.photoURL} alt="" />
                    <h1 className=" font-semibold">{user?.displayName}</h1>
                </div>
                <div className=" flex flex-col gap-6 text-xl font-semibold">
                    <Link className=" pl-5 border-2 py-2 " to={'/'}>Home</Link>
                    <Link className=" pl-5 border-2 py-2 " to={''}>Profile</Link>
                    <Link className=" pl-5 border-2 py-2 " to={''}>Work Sheet</Link>
                </div>
            </div>
            <div className=" flex gap-3 items-center text-xl font-semibold">
                Sign Out<IoIosLogOut />
            </div>
        </div>
    );
};

export default SideBar;