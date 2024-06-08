import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState, useEffect } from 'react';
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link } from 'react-router-dom';


const EmployeeList = () => {
    const axiosPrivate = useAxiosPrivate();
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showPayModal, setShowPayModal] = useState(false);
    const [paymentDate, setPaymentDate] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosPrivate.get('/user');
            setEmployees(response.data);
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

    const handlePay = async () => {
        if (selectedEmployee.isVerified && paymentDate) {
            try {
                const month = paymentDate.getMonth() + 1;
                const year = paymentDate.getFullYear();
                console.log(`Paying ${selectedEmployee.name} for ${month}/${year}`);

                const paymentInfo = {
                    employeeId: selectedEmployee._id,
                    employeeName: selectedEmployee.name,
                    employeeEmail: selectedEmployee.email,
                    employeeSalary: selectedEmployee.salary,
                    date: paymentDate,
                }
                console.log(paymentInfo);

                axiosPrivate.post('/payment', paymentInfo);

                setShowPayModal(false);
            } catch (error) {
                console.error('Error paying employee:', error);
            }
        } else {
            console.error('Cannot pay an unverified employee or without selecting a date.');
        }
    };

    const handleDetails = (employee) => {
        console.log(`Viewing details for ${employee.name}`);
    };

    const openPayModal = (employee) => {
        if (employee.isVerified) {
            setSelectedEmployee(employee);
            setPaymentDate(null);
            setShowPayModal(true);
        }
    };

    const closePayModal = () => {
        setShowPayModal(false);
    };

    const payButtonTemplate = (rowData) => {
        return (
            <Button
                label="Pay"
                onClick={() => openPayModal(rowData)}
                disabled={!rowData.isVerified}
                className={`${rowData.isVerified ? 'bg-primary text-white' : 'bg-gray-400 text-white'} px-2 rounded text-sm`}
            />
        );
    };

    const detailsButtonTemplate = (rowData) => {
        return (
            <Link to={`/dashboard/employee-details/${rowData?.email}`}>
                <Button label="Details" onClick={() => handleDetails(rowData)} />
            </Link>
        )
    };

    return (
        <div className="p-10 pb-0">
            <h1 className="border shadow-lg w-full p-10 text-4xl font-bold">Work Sheet</h1>
            <div className=' mt-10'>
                <DataTable value={employees} paginator rows={10} rowsPerPageOptions={[10, 20, 50]}>
                    <Column field="name" header="Name" />
                    <Column field="email" header="Email" />
                    <Column field="bank_account_no" header="Bank Account" />
                    <Column field="salary" header="Salary" />
                    <Column field="isVerified" header="Verified" body={verifyButtonTemplate} />
                    <Column body={payButtonTemplate} header="Pay" />
                    <Column body={detailsButtonTemplate} header="Details" />
                </DataTable>

                {/* Pay Modal */}
                <Dialog
                    visible={showPayModal}
                    onHide={closePayModal}
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', width: '70%', height: '50%' }}
                >
                    <div className=' w-full h-full flex justify-center items-center'>
                        <div className="p-10 text-center text-xl">
                            <h4 className="text-white text-3xl font-bold mb-4">Pay Employee</h4>
                            <p className="text-white mb-2">Employee: {selectedEmployee && selectedEmployee.name}</p>
                            <p className="text-white mb-4">Salary: {selectedEmployee && selectedEmployee.salary}</p>
                            <DatePicker
                                selected={paymentDate}
                                onChange={(date) => setPaymentDate(date)}
                                showMonthYearPicker
                                dateFormat="MM/yyyy"
                                className="mb-4 py-2 px-10 text-center rounded w-full"
                                placeholderText="Select Month and Year"
                            />
                            <Button label="Pay" onClick={handlePay} className="bg-primary text-white w-full py-2 rounded" />
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default EmployeeList;
