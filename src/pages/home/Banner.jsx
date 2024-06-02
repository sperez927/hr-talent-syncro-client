import banner from "../../assets/employee.jpg"


const Banner = () => {
    return (
        <div className=" text-white py-32 bg-cover bg-top" style={{ backgroundImage: `url(${banner})`, }}>
            <div className="bg-black bg-opacity-40 w-2/3 mx-auto text-center p-4 space-y-4">
                <h1 className=" text-3xl font-bold">Leading the Way in Digital Talent Solutions</h1>
                <p className=" text-lg ">Connecting Talent with Opportunities Seamlessly – Experience Excellence with Talent Syncro</p>
                <button className=" border-2 border-primary px-2 rounded-lg">Join Us</button>
            </div>
        </div>
    );
};

export default Banner;