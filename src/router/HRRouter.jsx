import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


const HRRouter = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();
    const [currUser, setCurrUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosPrivate.get(`/user/${user?.email}`);
                setCurrUser(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (user?.email) {
            fetchUser();
        }
    }, [user, axiosPrivate]);

    if(currUser && currUser.role === 'HR'){
        return children;
    }
    else if (loading){
        return <div className=" flex justify-center dark:text-white"><span className="loading loading-bars loading-lg"></span></div>
    }
    else{
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
};

export default HRRouter;