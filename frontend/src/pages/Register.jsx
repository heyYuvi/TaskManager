import { useState } from 'react';
import API from '../api/axios.js';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate  = useNavigate();

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
        <form onSubmit={handleSubmit}>
            <input type='text' name='name' value={form.name} placeholder='Name' onChange={handleChange}></input>
            <input type='email' name='email' value={form.email} placeholder='Email' onChange={handleChange}></input>
            <input type='password' name='password' value={form.password} placeholder='Password' onChange={handleChange}></input>
            <button type='submit'>Register</button>
            <p onClick={() =>{navigate('/login')}}>Already have an account? Login</p>
        </form>
    )
}

export default Register;