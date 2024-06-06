import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const HRRouter = ({ children }) => {
    const { currUser, loading } = useContext(AuthContext);
    const location = useLocation();


    if (currUser?.role === 'HR') {
        return children;
    }
    else if (loading) {
        return <div className=" flex justify-center dark:text-white"><span className="loading loading-bars loading-lg"></span></div>
    }
    else {
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
};

export default HRRouter;