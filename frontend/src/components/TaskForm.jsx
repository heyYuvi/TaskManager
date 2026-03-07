import { useState, useEffect } from 'react';

const TaskForm = ({ editingTask, updateTask, createTask}) =>{
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");

    useEffect(() =>{
        if(editingTask){
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setStatus(editingTask.status);
        }
    }, [editingTask]);

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(editingTask){
            updateTask(editingTask._id, {
            title,
            description,
            status
        });
        }else{
            createTask({
                title,
                description,
                status
            });
        }

        setTitle("");
        setDescription("");
        setStatus("");
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type='text' value={title} onChange={(e) =>{setTitle(e.target.value)}} placeholder='Title'></input>
            <textarea value={description} onChange={(e) =>{setDescription(e.target.value)}} placeholder='Description'></textarea>
            <select value={status} onChange={(e) =>{setStatus(e.target.value)}}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <button type='submit'>{editingTask ? "Update" : "Add"}</button>
        </form>
    )
}

export default TaskForm;