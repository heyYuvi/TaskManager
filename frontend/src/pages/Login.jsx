import React from 'react';
import { useState } from 'react';
import API from '../api/axios.js'
import { Link } from 'react-router-dom';

const Login = () => {

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/users/login", form);

            const { message, token } = response.data;
            localStorage.setItem("token", token);
            alert(message);

            setForm({ email: "", password: "" });
            console.log(token);

            navigate('/dashboard');

        } catch (error) {
            alert(error?.response?.data?.message || "Login Failed");
        }
    }


    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>

            <form onSubmit={handleSubmit} className='bg-white p-2 w-100 rounded-xl shadow-md'>
               <h2 className='text-xl font-bold text-center mb-8'>Login</h2>
                <input type='email' name='email' value={form.email} placeholder='Email' onChange={handleChange} required className='w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
                <input type='password' name='password' value={form.password} placeholder='Password' onChange={handleChange} className='w-full border rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
                <button type='submit' className='w-full text-white font-bold border p-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition'>Login</button>
                <p className='text-center mt-4 text-sm'>Don't have an account
                    <Link to='/register' className='text-blue-500 font-semibold hover:underline ml-1'>Register</Link>
                </p>
            </form>
        </div>
    )
}

export default Login;
