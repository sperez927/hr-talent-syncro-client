import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Progress = () => {
    const axiosPrivate = useAxiosPrivate();
    const [worklist, setWorklist] = useState([]);
    const [name, setName] = useState('');
    const [month, setMonth] = useState('');

    useEffect(() => {
        const fetchWorklist = async () => {
            try {
                const params = {};
                if (name) params.name = name;
                if (month) params.month = month;

                const response = await axiosPrivate.get('/work-sheet', { params });

                setWorklist(response.data);
            } catch (error) {
                console.error("Failed to fetch work list:", error);
            }
        };

        fetchWorklist();
    }, [axiosPrivate, name, month]);

    const handleNameChange = (event) => setName(event.target.value);
    const handleMonthChange = (event) => setMonth(event.target.value);

    return (
        <div className="p-10 pb-0">
            <h1 className="border shadow-lg w-full p-10 text-4xl font-bold">Progress</h1>
            <div className="mt-10">
                <div className="mb-5">
                    <label>
                        Employee Name:
                        <select value={name} onChange={handleNameChange}>
                            <option value="">All</option>
                            {[...new Set(worklist.map(item => item.name))].map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </label>
                    <label className="ml-5">
                        Month:
                        <input type="month" value={month} onChange={handleMonthChange} />
                    </label>
                </div>
                <div className="grid grid-cols-4 text-center font-bold bg-primary text-white">
                    <div className="border py-2">Name</div>
                    <div className="border py-2">Task</div>
                    <div className="border py-2">Hour Worked</div>
                    <div className="border py-2">Date</div>
                </div>
                {worklist?.map((i, idx) => (
                    <div key={idx} className="grid grid-cols-4 text-center">
                        <div className="border border-gray-400 py-2 px-1">{i.name}</div>
                        <div className="border border-gray-400 py-2 px-1">{i.task}</div>
                        <div className="border border-gray-400 py-2 px-1">{i.hourWorked}</div>
                        <div className="border border-gray-400 py-2 px-1">{new Date(i.date).toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Progress;
