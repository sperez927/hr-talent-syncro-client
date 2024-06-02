import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/logo.png"

const Footer = () => {

    return (
        <div className=" text-black py-10 mt-16 font-semibold bg-transparent">
            <div className="flex flex-col md:items-start items-center">
                    <img src={logo} className="font-bold text-3xl w-56" alt="Logo"></img>
                    <p className="text-lg mt-2">Innovative. Empowering. Support.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 items-start mb-6">
                <div className="col-span-3 text-center space-y-6 md:text-start mt-4">
                    <div className="flex justify-between md:justify-start md:gap-6 ">
                        <p>Careers</p>
                        <p>Privacy Policy</p>
                        <p>Term and Conditions</p>
                    </div>
                    <div className="flex gap-10 justify-center md:justify-start">
                        <a href="https://www.facebook.com/"><FiFacebook size={25} /></a>
                        <a href="https://twitter.com/"><FaXTwitter size={25} /></a>
                        <a href="https://www.instagram.com/"><FaInstagram size={25} /></a>
                    </div>
                </div>
                <div className="space-y-2 text-center md:text-start mt-4 md:mt-0">
                    <h1 className="text-lg font-bold">Contact Us</h1>
                    <p>Dhaka, Bangladesh</p>
                    <p><a href="mailto:study.buddies@gmail.com">talent.syncro@gmail.com</a></p>
                </div>
            </div>
            <hr />
            <p className="text-center mt-8">© 2024 Talent Syncro. All rights reserved.</p>
        </div>

    );
};

export default Footer;