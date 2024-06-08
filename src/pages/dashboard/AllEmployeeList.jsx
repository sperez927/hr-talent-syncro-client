import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AllEmployeeList = () => {
    const axiosPrivate = useAxiosPrivate();
    const [allEmployee, setAllEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axiosPrivate.get('/user');
                setAllEmployee(response.data.filter(user => user.role === 'Employee' && user.isVerified || user.role === 'HR' && user.isVerified));
            } catch (error) {
                setError('Failed to get users');
                console.error('Failed to get users', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [axiosPrivate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>

        </div>
    );
};

export default AllEmployeeList;
