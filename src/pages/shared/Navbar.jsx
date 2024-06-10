import { useContext, useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { AuthContext } from "../../provider/AuthProvider";
import logo from "../../assets/logo.png";
import userIcon from "../../assets/userIcon.webp";

const Navbar = () => {
    const { user, userLogout, loading } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState("light");
    const html = document.documentElement;
    const navbarRef = useRef(null);

    useEffect(() => {
        const theme = localStorage.getItem("theme");

        if (theme) {
            setTheme(theme);
            html.classList.remove('light');
            html.classList.add(theme);
        }
    }, []);

    const handleTheme = () => {
        if (theme === "light") {
            html.classList.remove("light");
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setTheme("dark");
        } else {
            html.classList.remove("dark");
            html.classList.add("light");
            localStorage.setItem("theme", "light");
            setTheme("light");
        }
    };

    const handleUserLogout = () => {
        userLogout()
            .then(() => {
                toast.success("User Logged Out")
            })

    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const links = (
        <>
            <NavLink to={"/"} className={({ isActive }) =>
                isActive
                    ? "border-b-2 border-primary font-bold text-primary"
                    : " "
            }
            >
                Home
            </NavLink>
            {
                user && <NavLink to={"/dashboard"} className={({ isActive }) =>
                isActive
                    ? "border-b-2 border-primary font-bold text-primary"
                    : " "
            }
            >
                Dashboard
            </NavLink>}
            {
                <NavLink to={"/contact-us"} className={({ isActive }) =>
                    isActive
                        ? "border-b-2 border-primary font-bold text-primary"
                        : " "
                }
                >
                    Contact us
                </NavLink>
            }


        </>
    );

    return (
        <div className="navbar flex justify-between px-0 bg-transparent py-6 dark:text-white" ref={navbarRef}>
            <div className="">
                <div className="dropdown">
                    <div tabIndex={0} className="pr-4 lg:hidden" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul className={`menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow-sm bg-base-100 rounded w-40 ${isOpen ? "translate-x-0" : "-translate-x-96"
                        } dark:bg-slate-900 dark:border dark:border-primary dark:text-white transition-transform duration-300 ease-in-out`}>
                        {links}
                    </ul>
                </div>
                <p className="text-lg text-primary font-bold">
                    <Link to={"/"}> <img className="w-44" src={logo} alt="" /> </Link>
                </p>
            </div>

            <div className="">
                <div className="hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 flex gap-8">
                        {links}
                    </ul>
                </div>
                <li className="px-6 block ">
                    {theme === "dark" ? (
                        <FiSun className="text-xl sm:text-3xl md:text-3xl text-white" onClick={handleTheme} />
                    ) : (
                        <BsFillMoonStarsFill className="text-lg sm:text-xl md:text-2xl" onClick={handleTheme} />
                    )}
                </li>
                {
                    loading ? (
                        <div className=" flex justify-end">
                            <span className="loading loading-bars loading-xs"></span>
                        </div>
                    ) : user ? (
                        <>
                            <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button">
                                    <img className="w-12 h-12 rounded-full border border-primary object-cover object-center" src={user.photoURL ? user.photoURL : userIcon} alt="" />
                                </div>
                                <ul tabIndex={0} className="dropdown-content dark:bg-[#292929] dark:border dark:border-primary dark:text-white z-[50] menu p-3 shadow bg-base-100 rounded w-44 space-y-2">
                                    <li className=" font-bold text-lg">{user.displayName}</li>
                                    <li><button onClick={handleUserLogout} className="bg-primary text-white py-1 px-4 rounded hover:bg-transparent hover:outline hover:outline-1 hover:outline-primary hover:text-primary transition duration-300 ease-in-out">
                                        Logout
                                    </button></li>
                                </ul>
                            </div>
                        </>

                    ) : (
                        <span className="flex gap-2">
                            <Link to={"/login"}>
                                <button className=" text-primary text-xs md:text-base py-2 font-semibold">
                                    Login
                                </button>
                            </Link>
                            <p className=" py-2 text-xs md:text-base font-semibold">/</p>
                            <Link to={"/register"}>
                                <button className="text-primary text-xs md:text-base py-2 font-semibold">
                                    Register
                                </button>
                            </Link>
                        </span>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;
