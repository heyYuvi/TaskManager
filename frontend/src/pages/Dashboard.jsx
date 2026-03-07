import { useState, useEffect } from 'react';
import API from '../api/axios.js';
import SearchBar from '../components/SearchBar.jsx'
import FilterButton from '../components/FilterButton.jsx';
import TaskCard from '../components/TaskCard.jsx';
import TaskForm from '../components/TaskForm.jsx';
import LogOut from '../components/Logout.jsx';

const Dashboard = () =>{
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  

  const fetchTask = async () =>{
    try{
    const response = await API.get(`/task?search=${search}&status=${status}`);
    setTasks(response.data);
    }catch(error){
      console.log("Error fetching error", error);
    }
  }

  const deleteTask = async (id) =>{
    try{
         await API.delete(`/task/${id}`);
   fetchTask();
    }catch(error){
      console.log("Error Deleting errr", error);
    }
  }

  const updateTask = async (id, updatedData) =>{
    try{
       await API.put(`/task/${id}`, updatedData);
       setEditingTask(null);
    fetchTask();
    }catch(error){
      console.log("Error update error", error);
    }
  }

  const createTask = async (taskData) =>{
     try{
      await API.post("/task", taskData);
      fetchTask();
     }catch(error){
      console.log("Error creating task error", error);
     }

  }

  useEffect(() =>{
    fetchTask();
  }, [search, status]);

  return(
    <div>
      <LogOut />
      <SearchBar search={search} setSearch={setSearch} />
      
      <TaskForm editingTask={editingTask} updateTask={updateTask} createTask={createTask} />
      <FilterButton  setStatus={setStatus} />

      {tasks.map((task) =>(<TaskCard  key={task._id} task={task} deleteTask={deleteTask} setEditingTask={setEditingTask} />))}
    </div>
  )
}

export default Dashboard;