import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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

        const { error: paymentMethodError } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            MySwal.fire({
                icon: 'error',
                title: 'Payment Error',
                text: paymentMethodError.message,
            });
            return;
        } else {
            setError('');
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
            MySwal.fire({
                icon: 'error',
                title: 'Payment Error',
                text: cardConfirmError.message,
            });
            setShowPayModal(false);
            return;
        } else {
            if (paymentIntent.status === 'succeeded' && selectedEmployee.isVerified && paymentDate) {
                try {
                    const month = paymentDate.getMonth() + 1;
                    const year = paymentDate.getFullYear();

                    const paymentInfo = {
                        employeeId: selectedEmployee._id,
                        employeeName: selectedEmployee.name,
                        employeeEmail: selectedEmployee.email,
                        employeeSalary: selectedEmployee.salary,
                        date: paymentDate,
                        transactionId: paymentIntent.id,
                    };

                    await axiosPrivate.post('/payment', paymentInfo);

                    MySwal.fire({
                        icon: 'success',
                        title: 'Payment Successful',
                        text: `Successfully paid ${selectedEmployee.name} for ${month}/${year}`,
                    });

                    setShowPayModal(false);
                } catch (error) {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Payment Error',
                        text: 'An error occurred while processing the payment.',
                    });
                    setShowPayModal(false);
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
                        />
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <Button disabled={!stripe || !clientSecret} label="Pay" onClick={handleSubmit} className="bg-primary w-full py-2 rounded" />
                </div>
            </div>
        </Dialog>
    );
};

export default PaymentDialog;

