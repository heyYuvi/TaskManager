import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, deleteTask }) =>{
    const navigate = useNavigate();

    return(
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.status}</p>
            <button onClick={() =>{deleteTask(task._id)}}>Delete</button>
            <button onClick={() =>{navigate(`/task/${task._id}`)}}>Update</button>
        </div>
    )
}

export default TaskCard;