import axios from 'axios';

const API = axios.create({
    baseURL : "https://smart-taskmanager.onrender.com/api"
});

export default API;