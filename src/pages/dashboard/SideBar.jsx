import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";


const SideBar = () => {
    const { user, currUser, userLogout } = useContext(AuthContext);



    return (
        <div className=" space-y-10 min-h-screen h-fit flex flex-col justify-between bg-primary py-6 pl-10 text-white">
            <div className="space-y-10 ">
                <h1 className=" text-2xl font-bold underline">Talent Syncro</h1>
                <div className=" flex items-center gap-3">
                    <img className=" w-20 h-20 rounded-full object-cover object-top" src={user?.photoURL} alt="" />
                    <h1 className=" font-semibold">{user?.displayName}</h1>
                </div>
                {
                    currUser?.role === 'HR'
                        ?
                        <div className=" flex flex-col gap-6 text-xl font-semibold">
                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/'}>Home</Link>
                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard'}>Profile</Link>
                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/employee-list'}>Employee List</Link>
                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/progress'}>Progress</Link>
                        </div>
                        : <div className=" flex flex-col gap-6 text-xl font-semibold">
                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/'}>Home</Link>
                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard'}>Profile</Link>
                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/work-sheet'}>Work Sheet</Link>
                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/payment-history'}>Payment History</Link>
                        </div>
                }
            </div>
            <button onClick={userLogout} className=" self-end pr-5 flex gap-3 items-center text-xl font-semibold">
                Sign Out <IoIosLogOut size={25} />
            </button>
        </div>
    );
};

export default SideBar;