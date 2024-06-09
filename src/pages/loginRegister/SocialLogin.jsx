import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);
const SocialLogin = () => {
    const axiosPublic = useAxiosPublic();
    const { googleSignIn, githubSignIn, bannedUser, userLogout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user.email);

                if (bannedUser?.find(bannedUser => bannedUser === result.user.email)) {
                    userLogout();
                    MySwal.fire({
                        title: <p className="text-3xl font-bold text-primary mb-4">User is banned</p>,
                        icon: "error",
                        confirmButtonColor: 'green',
                        confirmButtonText: "Okay"
                    })
                }
                else {
                    const newUser = {
                        name: result.user.displayName,
                        email: result.user.email,
                        photoUrl: result.user.photoURL,
                        role: 'Employee',
                        bank_account_no: null,
                        salary: null,
                        designation: null,
                        isVerified: false,
                        status: 'active',
                    };

                    console.log("New User Data:", newUser);

                    axiosPublic.post('/user', newUser, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    toast.success('Successfully Logged In');
                    navigate(location?.state ? location.state : "/");
                }
            })
            .catch(error => {
                console.log(error);
                toast.error('Incorrect User Input');
            })
    }

    const handleGithubSignIn = () => {
        githubSignIn()
            .then(result => {
                console.log(result.user.email);

                if (bannedUser?.find(bannedUser => bannedUser === result.user.email)) {
                    userLogout();
                    MySwal.fire({
                        title: <p className="text-3xl font-bold text-primary mb-4">User is banned</p>,
                        icon: "error",
                        confirmButtonColor: 'green',
                        confirmButtonText: "Okay"
                    })
                }
                else {

                    const newUser = {
                        name: result.user.displayName,
                        email: result.user.email,
                        photoUrl: result.user.photoURL,
                        role: 'Employee',
                        bank_account_no: null,
                        salary: null,
                        designation: null,
                        isVerified: false,
                        status: 'active',
                    };

                    console.log("New User Data:", newUser);

                    axiosPublic.post('/user', newUser, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    toast.success('Successfully Logged In');
                    navigate(location?.state ? location.state : "/");
                }
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