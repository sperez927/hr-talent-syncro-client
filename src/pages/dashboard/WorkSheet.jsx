import { useState } from 'react';
import { useForm } from "react-hook-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const WorkSheet = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [workEntries, setWorkEntries] = useState([]);

    const onSubmit = (data) => {
        const newEntry = { ...data, date: selectedDate };
        setWorkEntries([newEntry, ...workEntries]);
        console.log(data);
    }

    return (
        <div className=" p-10 pb-0">
            <h1 className=" border shadow-lg w-full p-10 text-4xl font-bold">Work Sheet</h1>
            <div className=" mt-10">
                <form onSubmit={handleSubmit(onSubmit)} className=" grid grid-cols-4 items-end gap-2">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold dark:text-white">Tasks</span>
                        </label>
                        <select name="task" id="" className="bg-transparent input rounded-none border-b-2 border-b-gray-300 focus:outline-none focus:border-0 focus:border-b-2 focus:border-b-primary" {...register("task", { required: true })}>
                            <option value="">Select Task</option>
                            <option value="Sales">Sales</option>
                            <option value="Support">Support</option>
                            <option value="Content">Content</option>
                            <option value="Paper-work">Paper-work</option>
                        </select>
                        {errors.task && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-bold dark:text-white">Hours Worked</span>
                        </label>
                        <input name="hours" type="number" placeholder="Enter hours worked" className="bg-transparent input rounded-none border-b-2 border-b-gray-300 focus:outline-none focus:border-0 focus:border-b-2 focus:border-b-primary" {...register("hours", { required: true })} />
                        {errors.hours && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text font-bold dark:text-white">Date</span>
                        </label>
                        <DatePicker selected={selectedDate} onChange={(date) => { setSelectedDate(date); setValue('date', date); }} className="bg-transparent input rounded-none border-b-2 border-b-gray-300 focus:outline-none focus:border-0 focus:border-b-2 focus:border-b-primary" />
                    </div>
                    <div className="form-control">
                        <button type="submit" className=" w-fit self-end p-2 rounded-md text-white bg-primary hover:bg-transparent hover:border hover:border-primary hover:text-primary transition duration-300 ease-in-out">Submit</button>
                    </div>
                </form>
            </div>
            <div className="mt-10">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border p-4">Task</th>
                            <th className="border">Hours Worked</th>
                            <th className="border p-4">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workEntries.map((entry, index) => (
                            <tr key={index}>
                                <td className="border p-4 text-center">{entry.task}</td>
                                <td className="border text-center">{entry.hours}</td>
                                <td className="border p-4 text-center">{entry.date.toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorkSheet;