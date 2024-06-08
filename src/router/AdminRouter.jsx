import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const AdminRouter = ({ children }) => {
    const { currUser, loading } = useContext(AuthContext);
    const location = useLocation();


    if (currUser?.role === 'Admin') {
        return children;
    }
    else if (loading) {
        return <div className=" flex justify-center dark:text-white"><span className="loading loading-bars loading-lg"></span></div>
    }
    else {
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
};

export default AdminRouter;