const TaskCard = ({ task, deleteTask,setEditingTask }) => {

    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.status}</p>
            <button onClick={() =>{setEditingTask(task)}}>Edit</button>
            <button onClick={() =>{deleteTask(task._id)}}>Delete</button>
        </div>
    )
}

export default TaskCard;