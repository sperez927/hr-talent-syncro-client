import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const PaymentDialog = ({ selectedEmployee, paymentDate, setPaymentDate, clientSecret, setShowPayModal, error, setError }) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosPrivate = useAxiosPrivate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            console.log("Stripe or elements not loaded");
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            console.log("CardElement not found");
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log(error);
            setError(error.message)
        } else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        const { paymentIntent, error: cardConfirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: selectedEmployee.name || '',
                    email: selectedEmployee.email || ''
                }
            }
        });

        if (cardConfirmError) {
            console.log(cardConfirmError);
        } else {
            console.log('Payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded' && selectedEmployee.isVerified && paymentDate) {
                console.log('Transaction id', paymentIntent.id);
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
                        transactionId: paymentIntent.id,
                    }
                    console.log(paymentInfo);

                    await axiosPrivate.post('/payment', paymentInfo);

                    setShowPayModal(false);
                } catch (error) {
                    console.error('Error paying employee:', error);
                }
            }
        }
    };

    return (
        <Dialog
            visible={true}
            onHide={() => setShowPayModal(false)}
            style={{ backgroundColor: 'rgba(255, 255, 255, 255)', width: '70%', height: '50%' }}
        >
            <div className='w-full h-full flex justify-center items-center'>
                <div className="p-10 text-center text-xl">
                    <h4 className="text-3xl font-bold mb-4">Pay Employee</h4>
                    <p className="mb-2">Employee: {selectedEmployee && selectedEmployee.name}</p>
                    <p className="mb-4">Salary: {selectedEmployee && selectedEmployee.salary}</p>
                    <DatePicker
                        selected={paymentDate}
                        onChange={(date) => setPaymentDate(date)}
                        showMonthYearPicker
                        dateFormat="MM/yyyy"
                        className="mb-4 py-2 px-10 text-center rounded w-full"
                        placeholderText="Select Month and Year"
                    />
                    <div className='py-4 px-2 border border-gray-400'>
                        <CardElement
                            options={{
                                iconStyle: 'solid',
                                style: {
                                    base: {
                                        iconColor: '#c4f0ff',
                                        color: '#32325d',
                                        fontSize: '16px',
                                        '::placeholder': {
                                            color: '#aab7c4',
                                        },
                                    },
                                    invalid: {
                                        iconColor: '#FFC7EE',
                                        color: '#FFC7EE',
                                    },
                                },
                            }}
                            onReady={() => {
                                console.log('CardElement [ready]');
                            }} />
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <Button disabled={!stripe || !clientSecret} label="Pay" onClick={handleSubmit} className="bg-primary w-full py-2 rounded" />
                </div>
            </div>
        </Dialog>
    );
};

export default PaymentDialog;
