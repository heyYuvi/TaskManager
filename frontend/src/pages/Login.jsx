import React from 'react';
import { useState } from 'react';
import API from '../api/axios.js'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
        const response = await API.post("/users/login", form);
        
        const { message, token } = response.data;
        localStorage.setItem("token", token);
        alert(message);

        setForm({ email: "", password: ""});
        console.log(token);

        navigate('/dashboard');
        
        }catch(error){
            alert(error?.response?.data?.message || "Login Failed");
        }
    }


  return (
    <form onSubmit={handleSubmit}>
        <input type='email' name='email' value={form.email} placeholder='Email' onChange={handleChange} required></input>
        <input type='password' name='password' value={form.password} placeholder='Password' onChange={handleChange}></input>
        <button type='submit'>Login</button>
        <p onClick={() =>{
            navigate('/register');
        }}>Don't have an account? Register</p>
    </form>
  )
}

export default Login;
