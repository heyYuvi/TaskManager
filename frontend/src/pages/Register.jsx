import { useState } from 'react';
import API from '../api/axios.js';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/users/register", form);
            alert("User Registered");

            setForm({ name: "", email: "", password: "" });

            navigate('/login');
        } catch (error) {
            alert(error.response.data.message || "Registration failed");
        }

    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <form onSubmit={handleSubmit} className='w-96 bg-white rounded-lg shadow-md p-6'>
                <h2 className='font-bold text-xl text-center mb-6'>Register</h2>
            <input type='text' name='name' value={form.name} placeholder='Name' onChange={handleChange} className='w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
            <input type='email' name='email' value={form.email} placeholder='Email' onChange={handleChange} className='w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
            <input type='password' name='password' value={form.password} placeholder='Password' onChange={handleChange} className='w-full border rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
            <button type='submit'className='w-full p-3 rounded-lg text-white font-bold bg-blue-500 hover:bg-blue-600 transition cursor-pointer'>Register</button>
            <p className='mt-4 text-center text-sm'>Already have an account?
                <Link to='/login' className='text-blue-500 ml-1 font-semibold hover:underline'>
                Login
                </Link>
            </p>
        </form>
        </div>
    )
}

export default Register;