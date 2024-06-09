import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AuthContext } from "../../provider/AuthProvider";

const MySwal = withReactContent(Swal);

const AllEmployeeList = () => {
    const { bannedUser, setBannedUser } = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const [allEmployee, setAllEmployee] = useState(null);

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
                });
                setBannedUser([...bannedUser, currUser.email]);

                await axiosPrivate.put(`/user/${currUser._id}`, { status: 'ban' });
                setAllEmployee(prev => prev.map(user => user._id === currUser._id ? { ...user, status: 'ban' } : user));
            } catch (error) {
                console.error('Failed to ban user', error);
            }
        }
    };

    const handleSalary = async (user) => {
        const { value: salary } = await MySwal.fire({
            title: 'Adjust Salary',
            input: 'number',
            inputLabel: 'New Salary',
            inputValue: user.salary,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!';
                } else if (isNaN(value) || value <= user.salary) {
                    return 'Please enter a valid salary that is higher than the current one!';
                }
            }
        });

        if (salary) {
            try {
                await axiosPrivate.put(`/user/${user._id}`, { salary });
                setAllEmployee(prev => prev.map(i => i._id === user._id ? { ...i, salary } : i));
                MySwal.fire('Success', 'Salary updated successfully!', 'success');
            } catch (error) {
                console.error('Failed to update salary', error);
                MySwal.fire('Error', 'Failed to update salary', 'error');
            }
        }
    };

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

    return (
        <div className="p-10 pb-0">
            <h1 className="border shadow-lg w-full p-10 text-4xl font-bold">All Employee List</h1>
            <div className='mt-10'>
                <div className="grid grid-cols-5 font-bold px-3 bg-primary text-white">
                    <div className="py-2">Name</div>
                    <div className="py-2">Designation</div>
                    <div className="py-2">Salary</div>
                    <div></div>
                    <div></div>
                </div>
                {
                    allEmployee?.map((user, idx) => (
                        <div key={idx} className="grid grid-cols-5 px-3">
                            <div className="py-2">{user.name}</div>
                            <div className="py-2">{user.designation}</div>
                            <div className="py-2 flex justify-between items-center">
                                <p>{user.salary}</p>
                                {
                                    user.status !== 'ban' &&
                                    <button onClick={() => handleSalary(user)} className="text-xs text-cyan-500 font-bold">Adjust</button>
                                }
                            </div>
                            {
                                user.status === 'ban' ?
                                    <div className="py-2 text-red-500 font-bold text-center">Fired</div>
                                    :
                                    <>
                                        <button className="py-2 text-primary font-bold" onClick={() => handleFire(user)}>
                                            Fire
                                        </button>
                                        {
                                            user.role === 'Employee' &&
                                            <button className="py-2 text-green-500 font-bold" onClick={() => handleMakeHR(user._id)}>
                                                Make HR
                                            </button>
                                        }
                                    </>
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default AllEmployeeList;
