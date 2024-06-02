import { createBrowserRouter } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Root from "../pages/Root";
import Error from "../pages/Error";
import Home from "../pages/home/Home";
import Login from "../pages/loginRegister/Login";
import Register from "../pages/loginRegister/Register";
import Dashboard from "../pages/Dashboard";
import ContactUs from "../pages/ContactUs";


const Router = createBrowserRouter ([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>,
            },
            {
                path: '/dashboard',
                element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
            },
            {
                path: '/contact-us',
                element: <ContactUs></ContactUs>,
            },
        ]
    }
])

export default Router;