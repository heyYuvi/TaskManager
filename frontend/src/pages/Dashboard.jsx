import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios.js';
import SearchBar from '../components/SearchBar.jsx'
import FilterButton from '../components/FilterButton.jsx';
import TaskCard from '../components/TaskCard.jsx';
//import TaskForm from '../components/TaskForm.jsx';
import Logout from '../components/Logout.jsx';

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");


  const fetchTasks = async () => {
    try {
      const response = await API.get(`/task?search=${search}&status=${status}`);
      setTasks(response.data);
    } catch (error) {
      console.log("Error fetching error", error);
    }
  }

  const deleteTask = async (id) => {
    try {
      await API.delete(`/task/${id}`);
      fetchTasks();
    } catch (error) {
      console.log("Error deleting error", error);
    }
  }



  useEffect(() => {
    fetchTasks();
  }, [search, status]);

  return (
    <div className='w-full max-w-[1440px] m-auto min-h-screen flex flex-col bg-gray-200'>
      <div className='flex justify-between mt-6 p-6'>
        <h4 className='font-bold text-4xl cursor-pointer hover:text-gray-600 tranisition'>Task Manager</h4><Logout className="font-bold border p-2 rounded-lg bg-red-600 text-white hover:bg-red-800 cursor-pointer transition"/>
      </div>
      <div className="flex justify-between p-6 items-center">

        <SearchBar search={search} setSearch={setSearch} className="border p-3 rounded-md w-70 focus:outline-none focus:ring-2 focus:ring-blue-400 md:w-200 "/>

        <FilterButton setStatus={setStatus} />

        <button onClick={() => { navigate('/task/new') }} className="bg-green-700 font-bold text-4xl text-white w-10 h-10 rounded-full cursor-pointer">+</button>
      </div>

      {tasks.length === 0 ? (
        <p>No task found</p>) :
        (
          tasks.map((task) => (<TaskCard key={task._id} task={task} deleteTask={deleteTask} />))
        )}

    </div>
  )
}

export default Dashboard;