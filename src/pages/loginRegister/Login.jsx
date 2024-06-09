import { useForm } from "react-hook-form"
import { useContext, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../provider/AuthProvider";
import loginReg from "../../assets/loginReg.jpg"
import SocialLogin from "./SocialLogin";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);
const Login = () => {
    const { userLogin, bannedUser } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const [showPass, setShowPass] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (bannedUser?.find(bannedUser => bannedUser === data.email)) {
            MySwal.fire({
                title: <p className="text-3xl font-bold text-primary mb-4">User is banned</p>,
                icon: "error",
                confirmButtonColor: 'green',
                confirmButtonText: "Okay"
            })
        }

        else {
            const { email, password } = data;

            userLogin(email, password)
                .then(result => {
                    console.log(result);
                    toast.success('Successfully Logged In');
                    navigate(location?.state ? location.state : "/");
                })
                .catch(error => {
                    console.log(error);
                    toast.error('Incorrect User Input');
                })
        }
    }


    return (
        <>
            <Helmet>
                <title>Talent Syncro | Login</title>
            </Helmet>
            <div style={{ backgroundImage: `url(${loginReg})`, }} className=" mx-auto w-full flex justify-center lg:mt-10 dark:text-white p-10 bg-cover bg-top">
                <div className=" bg-white bg-opacity-85 p-10 w-1/2">
                    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold dark:text-white">Email address</span>
                            </label>
                            <input name="email" type="email" placeholder="Enter your email address" className="bg-transparent input rounded-none border-b-2 border-b-gray-300 focus:outline-none focus:border-0 focus:border-b-2 focus:border-b-primary" {...register("email", { required: true })} />
                            {errors.email && <span className=" text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold dark:text-white">Password</span>
                            </label>
                            <span className=" flex relative">
                                <input name="password" type={showPass ? 'text' : 'password'} placeholder="Enter your password" className=" bg-transparent w-full input rounded-none border-b-2 border-b-gray-300 focus:outline-none focus:border-0 focus:border-b-2 focus:border-b-primary" {...register("password", { required: true })} />
                                <span className=" absolute top-1/3 right-3" onClick={() => setShowPass(!showPass)}>
                                    {
                                        showPass ? <IoEyeOffOutline /> : <IoEyeOutline />
                                    }
                                </span>
                            </span>
                            {errors.password && <span className=" text-red-500">This field is required</span>}
                        </div>
                        <div>
                            <p className=" text-end text-gray-500 dark:text-white">Forgot password?</p>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn text-white bg-primary hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300 ease-in-out">Login</button>
                        </div>
                    </form>
                    <SocialLogin></SocialLogin>
                    <p className=" mt-3 text-center">Do Not Have An Account ? <Link className=" text-red-500" to={'/register'}>Register</Link></p>

                </div>
            </div>
        </>
    );
};

export default Login;