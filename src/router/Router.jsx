import { createBrowserRouter } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import Root from "../pages/Root";
import Error from "../pages/Error";
import Home from "../pages/home/Home";
import Login from "../pages/loginRegister/Login";
import Register from "../pages/loginRegister/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import ContactUs from "../pages/ContactUs";
import Profile from "../pages/dashboard/Profile";
import WorkSheet from "../pages/dashboard/WorkSheet";
import EmployeeList from "../pages/dashboard/EmployeeList";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import HRRouter from "./HRRouter";

const Router = createBrowserRouter([
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
                path: '/contact-us',
                element: <ContactUs></ContactUs>,
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRouter><Dashboard></Dashboard></PrivateRouter>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/dashboard',
                element: <PrivateRouter><Profile></Profile></PrivateRouter>,
            },
            {
                path: '/dashboard/work-sheet',
                element: <PrivateRouter><WorkSheet></WorkSheet></PrivateRouter>,
            },
            {
                path: '/dashboard/employee-list',
                element: <HRRouter><EmployeeList></EmployeeList></HRRouter>,
            },
            {
                path: '/dashboard/payment-history',
                element: <PrivateRouter><PaymentHistory></PaymentHistory></PrivateRouter>,
            },
            
        ]
    },
])

export default Router;
