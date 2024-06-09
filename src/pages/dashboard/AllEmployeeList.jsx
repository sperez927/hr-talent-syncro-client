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

    const handleFire = async (id) => {
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
                await axiosPrivate.delete(`/user/${id}`);
                setAllEmployee(prev => prev.filter(user => user._id !== id));
            } catch (error) {
                console.error('Failed to delete user', error);
            }
        }
    };

    return (
        <div>
            <div className="grid grid-cols-4 font-bold bg-primary text-center text-white">
                <div className="py-2 border">Name</div>
                <div className="py-2 border">Designation</div>
                <div className="py-2 border"></div>
                <div className="py-2 border"></div>
            </div>
            {
                allEmployee?.map((user, idx) => (
                    <div key={idx} className="grid grid-cols-4 text-center">
                        <div className="py-2 border border-gray-400 border-t-0">{user.name}</div>
                        <div className="py-2 border border-gray-400 border-t-0">{user.designation}</div>
                        <button
                            className="py-2 border border-gray-400 border-t-0"
                            onClick={() => handleFire(user._id)}
                        >
                            Fire
                        </button>
                        {user.role === 'Employee' && (
                            <button
                                className="py-2 border border-gray-400 border-t-0"
                                onClick={() => handleMakeHR(user._id)}
                            >
                                Make HR
                            </button>
                        )}
                    </div>
                ))
            }
        </div>
    );
};

export default AllEmployeeList;
