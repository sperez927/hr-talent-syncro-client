import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Helmet } from "react-helmet-async";

const EmployeeDetails = () => {
    const { email } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const [userInfo, setUserInfo] = useState(null);
    const [userPaymentInfo, setUserPaymentInfo] = useState([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                if (email) {
                    const res1 = await axiosPrivate.get(`/user/${email}`);
                    setUserInfo(res1.data);
                }
            } catch (error) {
                console.error("Failed to fetch user info:", error);
            }
        };

        fetchUserInfo();
    }, [email, axiosPrivate]);

    useEffect(() => {
        const fetchUserPaymentInfo = async () => {
            try {
                if (userInfo?._id) {
                    const res2 = await axiosPrivate.get(`/payment/${userInfo._id}`);
                    setUserPaymentInfo(res2.data.history);
                }
            } catch (error) {
                console.error("Failed to fetch user payment info:", error);
            }
        };

        fetchUserPaymentInfo();
    }, [userInfo, axiosPrivate]);

    const transformPaymentData = (paymentData) => {
        if (!paymentData) return [];

        return paymentData.map(item => {
            const date = new Date(item.date);
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            return {
                date: `${month}-${year}`,
                salary: item.employeeSalary
            };
        });
    };

    const chartData = transformPaymentData(userPaymentInfo);

    return (
        <div className="p-2 pt-10 md:p-10 pb-0">
            <Helmet>
                <title>Employee Details | Talent Syncro</title>
            </Helmet>
            <h1 className="border shadow-lg w-full p-10 text-4xl font-bold">Employee Details</h1>
            <div className="mt-10">
                <div className=" flex flex-col justify-center items-center">
                    <img className=" w-36 h-36 rounded-full object-cover object-top" src={userInfo?.photoUrl} alt="" />
                    <h1 className=" font-bold text-xl">{userInfo?.name}</h1>
                    <p>{userInfo?.designation}</p>
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-2xl font-bold text-center pb-10">Salary History</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="salary" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EmployeeDetails;
