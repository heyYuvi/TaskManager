import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import API from '../api/axios.js'

const TaskPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");

    useEffect(() => {
        if (id) {
            fetchTask();
        }
    }, []);

    const fetchTask = async () => {
        try {

            const response = await API.get(`/task/${id}`);

            setTitle(response.data.title);
            setDescription(response.data.description);
            setStatus(response.data.status);
        } catch (error) {
            console.log("Error fetching task", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (id) {
            await API.put(`/task/${id}`, { title, description, status });
        } else {
            await API.post("/task", { title, description, status });
        }
        navigate('/dashboard');
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen mt-10">
            <h3 className='font-bold text-3xl '>Add/Update Task</h3>
            <form onSubmit={handleSubmit} className="w-96 m-auto bg-gray-200 shadow-md hover:shadow-lg mt-10 rounded-md">
                <div className='flex flex-col p-4 items-center justify-center'>
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Title' className='w-full border p-3 mt-6 rounded-md mb-6'></input>
                        <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder='Description' className='w-full border p-3 rounded-md mb-3'></textarea>
                        <label className='self-start font-medium mt-1'>Status</label>
                        <select value={status} onChange={(e) => { setStatus(e.target.value) }} className='w-full font-bold border p-3 mt-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400'>
                            <option value='Pending'>Pending</option>
                            <option value='In Progress'>In Progress</option>
                            <option value='Completed'>Completed</option>
                        </select>
                         <button type='submit' className='bg-green-400 p-3 rounded-md mt-4 font-bold text-white hover:bg-green-600 transition'>{id ? "Update" : "Add Task"}</button>
                </div>
            </form>
        </div>
    )
}

export default TaskPage;