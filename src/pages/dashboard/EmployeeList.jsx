import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useState, useEffect } from 'react';
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import PaymentDialog from './PaymentDialog';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const EmployeeList = () => {
    const axiosPrivate = useAxiosPrivate();
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showPayModal, setShowPayModal] = useState(false);
    const [paymentDate, setPaymentDate] = useState(null);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedEmployee) {
            (async () => {
                try {
                    const res = await axiosPrivate.post('/create-payment-intent', { salary: selectedEmployee.salary });
                    setClientSecret(res.data.clientSecret);
                } catch (error) {
                    setError('Failed to create payment intent');
                    console.error('Failed to create payment intent:', error);
                }
            })();
        }
    }, [selectedEmployee, axiosPrivate]);

    const fetchData = async () => {
        try {
            const response = await axiosPrivate.get('/user');
            setEmployees(response.data.filter(i => i.role === 'Employee'));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleVerification = async (employee) => {
        try {
            const updatedEmployee = { ...employee, isVerified: !employee.isVerified };
            await axiosPrivate.put('/user/' + employee._id, updatedEmployee);
            setEmployees(employees.map(emp => emp._id === employee._id ? updatedEmployee : emp));
        } catch (error) {
            console.error('Error toggling verification:', error);
        }
    };

    const verifyButtonTemplate = (rowData) => {
        return rowData.isVerified ? (
            <Button icon={<FaCheck />} onClick={() => toggleVerification(rowData)} />
        ) : (
            <Button icon={<RxCross2 />} onClick={() => toggleVerification(rowData)} />
        );
    };

    const openPayModal = async (employee) => {
        if (employee.isVerified) {
            setSelectedEmployee(employee);
            setPaymentDate(null);
            try {
                const res = await axiosPrivate.post('/create-payment-intent', { salary: employee.salary });
                setClientSecret(res.data.clientSecret);
                setShowPayModal(true);
            } catch (error) {
                setError('Failed to create payment intent');
                console.error('Failed to create payment intent:', error);
            }
        }
    };

    const payButtonTemplate = (rowData) => {
        return (
            <Button
                label="Pay"
                onClick={() => openPayModal(rowData)}
                disabled={!rowData.isVerified}
                className={`${rowData.isVerified ? 'bg-primary text-white' : 'bg-gray-400 text-white'} px-2 rounded text-xs md:text-sm`}
            />
        );
    };

    const detailsButtonTemplate = (rowData) => {
        return (
            <Link to={`/dashboard/employee-details/${rowData?.email}`}>
                <Button label="Details" className="text-xs md:text-sm" />
            </Link>
        );
    };

    return (
        <div className="p-4 pt-10 md:p-10 pb-0">
            <h1 className="border shadow-lg w-full p-4 md:p-10 text-xl md:text-4xl font-bold">Employee List</h1>
            <div className='mt-4 md:mt-10'>
                <div className="overflow-x-auto">
                    <DataTable value={employees} paginator rows={10} rowsPerPageOptions={[10, 20, 50]}>
                        <Column field="name" header="Name" className="px-2" />
                        <Column field="email" header="Email" className="px-2" />
                        <Column field="bank_account_no" header="Account" className="px-2" />
                        <Column field="salary" header="Salary" className="px-2" />
                        <Column field="isVerified" header="Verified" body={verifyButtonTemplate} className="px-2" />
                        <Column body={payButtonTemplate} header="" className="px-2" />
                        <Column body={detailsButtonTemplate} header="" className="px-2" />
                    </DataTable>
                </div>

                {showPayModal && (
                    <Elements stripe={stripePromise}>
                        <PaymentDialog
                            selectedEmployee={selectedEmployee}
                            paymentDate={paymentDate}
                            setPaymentDate={setPaymentDate}
                            clientSecret={clientSecret}
                            setShowPayModal={setShowPayModal}
                            error={error}
                            setError={setError}
                        />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default EmployeeList;
