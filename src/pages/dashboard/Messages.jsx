import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Messages = () => {
    const [allMessages, setAllMessages] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axiosPrivate.get('/contact-us');
                setAllMessages(response.data);
            } catch (error) {
                console.error('Failed to get messages', error);
            }
        };
        fetchMessages();
    }, [axiosPrivate]);

    return (
        <div className="p-2 md:p-10 pb-0">
            <h1 className="border shadow-lg w-full p-10 text-4xl font-bold">Messages</h1>
            <div className="mt-10">
                {allMessages.length === 0 ? (
                    <p>No messages available</p>
                ) : (
                    allMessages.map((item, idx) => (
                        <div key={idx} className="mb-4 border p-4">
                            <h1 className="font-bold">{item.email}</h1>
                            <p>{item.message}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Messages;
