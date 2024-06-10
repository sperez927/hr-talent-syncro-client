import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";


const Profile = () => {
    const { currUser } = useContext(AuthContext);

    return (
        <div className="p-2 md:p-10 pb-0">
            <h1 className="border shadow-lg w-full p-10 text-4xl font-bold">Profile</h1>
            <div className=" mt-10 md:text-lg font-semibold flex flex-col gap-2 items-center border shadow-lg p-4">
                <img className=" w-52 h-52 object-cover object-top rounded-full" src={currUser?.photoUrl} alt="" />
                <h1 className=" text-xl font-bold">{currUser?.name}</h1>
                <p className=" text-sm">{currUser?.designation}</p>
                <p>{currUser?.email}</p>
                <p>Position: {currUser?.role}</p>
                <p>Bank Account No: {currUser?.bank_account_no}</p>
                <p>Salary: {currUser?.salary}</p>
            </div>
        </div>
    );
};

export default Profile;