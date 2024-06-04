import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constent/constent';
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showPayModal, setShowPayModal] = useState(false);
    const [paymentDate, setPaymentDate] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(BASE_URL + '/user');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleVerification = async (employee) => {
        try {
            const updatedEmployee = { ...employee, isVerified: !employee.isVerified };

            await axios.put(BASE_URL + '/user/' + employee._id, updatedEmployee);

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
                const month = paymentDate.getMonth() + 1; // getMonth() is zero-based
                const year = paymentDate.getFullYear();
                console.log(`Paying ${selectedEmployee.name} for ${month}/${year}`);
                // Here you would normally call your backend API to perform the payment

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
        // Implement functionality to view details, e.g., open a modal with more info
    };

    const openPayModal = (employee) => {
        if (employee.isVerified) {
            setSelectedEmployee(employee);
            setPaymentDate(null); // Reset date
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
        return <Button label="Details" onClick={() => handleDetails(rowData)} />;
    };

    return (
        <div>
            <DataTable value={employees} paginator rows={10} rowsPerPageOptions={[10, 20, 50]}>
                <Column field="name" header="Name" />
                <Column field="email" header="Email" />
                <Column field="isVerified" header="Verified" body={verifyButtonTemplate} />
                <Column field="bank_account_no" header="Bank Account" />
                <Column field="salary" header="Salary" />
                <Column body={payButtonTemplate} header="Pay" />
                <Column body={detailsButtonTemplate} header="Details" />
            </DataTable>

            {/* Pay Modal */}
            <Dialog 
                visible={showPayModal} 
                onHide={closePayModal}
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            >
                <div className="p-4">
                    <h4 className="text-white mb-4">Pay Employee</h4>
                    <p className="text-white mb-2">Employee: {selectedEmployee && selectedEmployee.name}</p>
                    <p className="text-white mb-4">Salary: {selectedEmployee && selectedEmployee.salary}</p>
                    <DatePicker
                        selected={paymentDate}
                        onChange={(date) => setPaymentDate(date)}
                        showMonthYearPicker
                        dateFormat="MM/yyyy"
                        className="mb-4 p-2 rounded w-full"
                        placeholderText="Select Month and Year"
                    />
                    <Button label="Pay" onClick={handlePay} className="bg-primary text-white w-full" />
                </div>
            </Dialog>
        </div>
    );
};

export default EmployeeTable;
