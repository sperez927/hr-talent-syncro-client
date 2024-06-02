import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';

const MySwal = withReactContent(Swal);

const ContactUs = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            // TODO
            await axios.post('/', data);

            MySwal.fire({
                title: 'Message Sent!',
                text: 'Your message has been sent successfully. Thank you for your feedback!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            reset();
        } catch (error) {
            console.error(error);

            MySwal.fire({
                title: 'Error!',
                text: 'There was an error sending your message. Please try again later.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact Us | Talent Syncro</title>
            </Helmet>
            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
                <p className="mb-6">Feel free to reach out to us with any questions, comments, or feedback. We look forward to hearing from you!</p>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold">Our Address</h2>
                    <p>Dhaka, Bangladesh</p>
                    <p>Email: contact@talentsyncro.com</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Email Address</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="input input-bordered w-full"
                            {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                        />
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold">Message</span>
                        </label>
                        <textarea
                            placeholder="Enter your message"
                            className="textarea textarea-bordered w-full"
                            rows="5"
                            {...register("message", { required: "Message is required" })}
                        ></textarea>
                        {errors.message && <span className="text-red-500">{errors.message.message}</span>}
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary text-white font-bold">Send Message</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactUs;
