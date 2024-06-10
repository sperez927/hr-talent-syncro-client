import { Helmet } from "react-helmet-async";

const Error = () => {
    return (
        <div className=" pt-20 flex flex-col justify-center items-center">
            <Helmet>
                <title>Error | Talent Syncro</title>
            </Helmet>
            <p>404 Page Not Found</p>
            <button className=" bg-primary text-white py-2">Back to Home</button>
        </div>
    );
};

export default Error;