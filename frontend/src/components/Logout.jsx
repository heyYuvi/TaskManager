import { useNavigate } from "react-router-dom";

const LogOut = () =>{
    const navigate = useNavigate();

    const handleLogOut = () =>{
        localStorage.removeItem("token");
        navigate('/login');
    }

    return (
        <button onClick={() =>{handleLogOut()}}>LogOut</button>
    )
}

export default LogOut;