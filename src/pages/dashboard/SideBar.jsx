import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";


const SideBar = () => {
    const { user, currUser, userLogout } = useContext(AuthContext);



    return (
        <>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <div className="flex-none lg:hidden ">
                        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-none hidden space-y-10 min-h-screen h-fit lg:flex flex-col justify-between bg-primary py-6 pl-10 text-white">
                        <div className="space-y-10">
                            <h1 className=" text-2xl font-bold underline">Talent Syncro</h1>
                            <div className=" flex items-center gap-3">
                                <img className=" w-20 h-20 rounded-full object-cover object-top" src={user?.photoURL} alt="" />
                                <h1 className=" font-semibold">{user?.displayName}</h1>
                            </div>
                            {
                                currUser?.role === 'HR' ?
                                    <div className=" flex flex-col gap-6 text-xl font-semibold">
                                        <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/'}>Home</Link>
                                        <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard'}>Profile</Link>
                                        <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/employee-list'}>Employee List</Link>
                                        <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/progress'}>Progress</Link>
                                    </div>
                                    : currUser?.role === 'Admin' ?
                                        <div className=" flex flex-col gap-6 text-xl font-semibold">
                                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/'}>Home</Link>
                                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard'}>Profile</Link>
                                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/all-employee-list'}>All Employee List</Link>

                                        </div>
                                        :
                                        <div className=" flex flex-col gap-6 text-xl font-semibold">
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
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="space-y-10 min-h-screen h-fit flex flex-col justify-between bg-primary py-6 pl-10 text-white">
                        <div className="space-y-10 ">
                            <h1 className=" text-2xl font-bold underline pr-4">Talent Syncro</h1>
                            <div className=" flex items-center gap-3 pr-4">
                                <img className=" w-20 h-20 rounded-full object-cover object-top" src={user?.photoURL} alt="" />
                                <h1 className=" font-semibold">{user?.displayName}</h1>
                            </div>
                            {
                                currUser?.role === 'HR' ?
                                    <div className=" flex flex-col gap-6 text-sm font-semibold">
                                        <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/'}>Home</Link>
                                        <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard'}>Profile</Link>
                                        <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/employee-list'}>Employee List</Link>
                                        <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/progress'}>Progress</Link>
                                    </div>
                                    : currUser?.role === 'Admin' ?
                                        <div className=" flex flex-col gap-6 text-sm font-semibold">
                                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/'}>Home</Link>
                                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard'}>Profile</Link>
                                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/all-employee-list'}>All Employee List</Link>
                                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/messages'}>Messages</Link>

                                        </div>
                                        :
                                        <div className=" flex flex-col gap-6 text-sm font-semibold">
                                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/'}>Home</Link>
                                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard'}>Profile</Link>
                                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/work-sheet'}>Work Sheet</Link>
                                            <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/payment-history'}>Payment History</Link>
                                        </div>
                            }
                        </div>
                        <button onClick={userLogout} className=" self-end pr-5 flex gap-3 items-center text-sm font-semibold">
                            Sign Out <IoIosLogOut size={18} />
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="flex-none hidden lg:block space-y-10 min-h-screen h-fit flex flex-col justify-between bg-primary py-6 pl-10 text-white">
                <div className="space-y-10 ">
                    <h1 className=" text-2xl font-bold underline">Talent Syncro</h1>
                    <div className=" flex items-center gap-3">
                        <img className=" w-20 h-20 rounded-full object-cover object-top" src={user?.photoURL} alt="" />
                        <h1 className=" font-semibold">{user?.displayName}</h1>
                    </div>
                    {
                        currUser?.role === 'HR' ?
                            <div className=" flex flex-col gap-6 text-xl font-semibold">
                                <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/'}>Home</Link>
                                <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard'}>Profile</Link>
                                <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/employee-list'}>Employee List</Link>
                                <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/progress'}>Progress</Link>
                            </div>
                            : currUser?.role === 'Admin' ?
                                <div className=" flex flex-col gap-6 text-xl font-semibold">
                                    <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/'}>Home</Link>
                                    <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard'}>Profile</Link>
                                    <Link className=" pl-5 border-2 border-r-0 py-2 " to={'/dashboard/all-employee-list'}>All Employee List</Link>

                                </div>
                                :
                                <div className=" flex flex-col gap-6 text-xl font-semibold">
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
            </div> */}
        </>
    );
};

export default SideBar;