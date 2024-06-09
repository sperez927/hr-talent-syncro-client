import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const MySwal = withReactContent(Swal);

const AllEmployeeList = () => {
    const axiosPrivate = useAxiosPrivate();
    const [allEmployee, setAllEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axiosPrivate.get('/user');
                setAllEmployee(response.data.filter(user => (user.role === 'Employee' && user.isVerified) || (user.role === 'HR' && user.isVerified)));
            } catch (error) {
                console.error('Failed to get users', error);
            }
        };

        fetchEmployees();
    }, [axiosPrivate]);

    const handleMakeHR = async (id) => {
        try {
            await axiosPrivate.put(`/user/${id}`, { role: 'HR' });
            setAllEmployee(prev => prev.map(user => user._id === id ? { ...user, role: 'HR' } : user));
        } catch (error) {
            console.error('Failed to update user', error);
        }
    };

    const handleFire = async (currUser) => {
        const result = await MySwal.fire({
            title: <p className="text-3xl font-bold text-primary mb-4">Are you sure?</p>,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: 'green',
            confirmButtonText: "Sure",
            cancelButtonColor: 'red',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await axiosPrivate.post(`/banned-user/`, {
                    name: currUser.name,
                    email: currUser.email,
                })
                await axiosPrivate.delete(`/user/${currUser._id}`);
                setAllEmployee(prev => prev.filter(user => user._id !== currUser._id));
            } catch (error) {
                console.error('Failed to delete user', error);
            }
        }
    };

    return (
        <div className="p-10 pb-0">
            <h1 className="border shadow-lg w-full p-10 text-4xl font-bold">All Employee List</h1>
            <div className=' mt-10'>
                <div className="grid grid-cols-4 font-bold bg-primary text-center text-white">
                    <div className="py-2 ">Name</div>
                    <div className="py-2 ">Designation</div>
                    <div className="py-2 "></div>
                    <div className="py-2 "></div>
                </div>
                {
                    allEmployee?.map((user, idx) => (
                        <div key={idx} className="grid grid-cols-4 text-center">
                            <div className="py-2 ">{user.name}</div>
                            <div className="py-2 ">{user.designation}</div>
                            <button className="py-2 " onClick={() => handleFire(user)}>
                                Fire
                            </button>
                            {user.role === 'Employee' && (
                                <button className="py-2 " onClick={() => handleMakeHR(user._id)} >
                                    Make HR
                                </button>
                            )}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllEmployeeList;
