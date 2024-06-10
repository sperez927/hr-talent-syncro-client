import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
    const { currUser, } = useContext(AuthContext);
    const axiosPrivate = useAxiosPrivate();
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        const fetchPaymentHistory = async (page) => {
            if (currUser?._id) {
                try {
                    const response = await axiosPrivate.get(`/payment/${currUser._id}?page=${page}&limit=${rowsPerPage}`);
                    setHistory(response.data.history);
                    setTotalPages(Math.ceil(response.data.total / rowsPerPage));
                } catch (err) {
                    setError(err.response?.data?.message || "An error occurred");
                }
            }
        };
        fetchPaymentHistory(currentPage);
    }, [currUser, axiosPrivate, currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="p-2 pt-10 md:p-10 pb-0">
            <Helmet>
                <title>Payment History | Talent Syncro</title>
            </Helmet>
            <h1 className="border shadow-lg w-full p-10 text-4xl font-bold">Payment History</h1>
            <div className="mt-10">
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div>
                        <div className="grid grid-cols-3 text-center font-bold bg-primary text-white">
                            <div className="py-2 border border-gray-200">Month</div>
                            <div className="py-2 border border-gray-200">Amount</div>
                            <div className="py-2 border border-gray-200">Transaction Id</div>
                        </div>
                        <div>
                            {history?.length > 0 ? (
                                history.map((payment, index) => (
                                    <div key={index} className="grid grid-cols-3 text-center">
                                        <div className=" py-2 border border-t-0 border-gray-400">{new Date(payment.date).toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                                        <div className=" py-2 border border-t-0 border-gray-400">{payment.employeeSalary}</div>
                                        <div className=" py-2 border border-t-0 border-gray-400 overflow-hidden px-1">{payment.transactionId}</div>
                                    </div>
                                ))
                            ) : (
                                <div colSpan="3">No payment history available</div>
                            )}
                        </div>
                        <div className="mt-5 flex justify-center">
                            {currentPage > 1 && (
                                <button onClick={() => handlePageChange(currentPage - 1)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
                                    Previous
                                </button>
                            )}
                            {currentPage < totalPages && (
                                <button onClick={() => handlePageChange(currentPage + 1)} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;
