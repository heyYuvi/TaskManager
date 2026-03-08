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
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Title'></input>
            <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder='Description'></textarea>
            <select value={status} onChange={(e) => { setStatus(e.target.value) }}>
                <option value='Pending'>Pending</option>
                <option value='In Progress'>In Progress</option>
                <option value='Completed'>Completed</option>
            </select>
            <button type='submit'>{id ? "Update" : "Add Task"}</button>
        </form>
    )
}

export default TaskPage;