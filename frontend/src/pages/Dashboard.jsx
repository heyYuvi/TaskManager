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
    <div>
      <Logout />
      <SearchBar search={search} setSearch={setSearch} />

      <FilterButton setStatus={setStatus} />

      {tasks.length === 0 ? (
        <p>No task found</p> ) : 
        (
          tasks.map((task) => (<TaskCard key={task._id} task={task} deleteTask={deleteTask} />))
        )}
      <button onClick={() =>{navigate('/task/new')}}>Add Task</button>
    </div>
  )
}

export default Dashboard;