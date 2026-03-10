import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, deleteTask }) => {
    const navigate = useNavigate();

    

    return (
        <div className="flex items-center justify-center ">
            <div className="w-100 md:w-300 p-6 bg-white  rounded-lg shadow-md border hover:shadow-lg transition mb-4">
            <div className="mb-4 ">
                <h3 className="text-center font-bold text-lg mb-2">{task.title}</h3>
                <p className='text-gray-500 mb-4'>{task.description}</p>
                <button className={`text-white px-2 py-2 font-semibold rounded-full ${
                    
                    task.status === "Pending" ? "bg-red-400 text-red-600" :
                    task.status === "In Progress" ? "bg-yellow-100 text-yellow-600" :
                    "bg-green-100 text-green-600"
                }`
                }>{task.status}</button>
            </div>
            <div className='flex justify-center gap-4'>
                    <button onClick={() => { deleteTask(task._id) }} className="bg-red-500 font-bold px-4 py-2 rounded-md text-white hover:bg-red-600 cursor-pointer transition">Delete</button>
            <button onClick={() => { navigate(`/task/${task._id}`) }} className="bg-yellow-500 px-4 py-2 rounded-lg text-white  hover:bg-yellow-600 cursor-pointer">Update</button>
        
            </div>
        </div>
        </div>
    )
}

export default TaskCard;