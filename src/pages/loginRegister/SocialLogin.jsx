import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../../constent/constent";

const SocialLogin = () => {
    const { googleSignIn, githubSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result);

                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoUrl: result.user.photoURL,
                    role: 'Employee',
                    bank_account_no: null,
                    salary: null,
                    designation: null,
                    isVerified: false,
                };

                console.log("New User Data:", newUser);

                axios.post(BASE_URL + '/user', newUser, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                toast.success('Successfully Logged In');
                navigate(location?.state ? location.state : "/");
            })
            .catch(error => {
                console.log(error);
                toast.error('Incorrect User Input');
            })
    }

    const handleGithubSignIn = () => {
        githubSignIn()
            .then(result => {
                console.log(result);

                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoUrl: result.user.photoURL,
                    role: 'Employee',
                    bank_account_no: null,
                    salary: null,
                    designation: null,
                    isVerified: false,
                };

                console.log("New User Data:", newUser);

                axios.post(BASE_URL + '/user', newUser, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                toast.success('Successfully Logged In');
                navigate(location?.state ? location.state : "/");
            })
            .catch(error => {
                console.log(error);
                toast.error('Incorrect User Input');
            })
    }


    return (
        <div className=" m-6 space-y-4">
            <p className=" text-center">Or Sign In Using</p>
            <span className="flex justify-center items-center gap-2">
                <button onClick={handleGoogleSignIn}><FcGoogle size={45} /></button>
                <button onClick={handleGithubSignIn}><FaGithub size={40} /></button>
            </span>
        </div>
    );
};

export default SocialLogin;