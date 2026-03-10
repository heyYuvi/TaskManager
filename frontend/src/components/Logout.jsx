import { useNavigate } from 'react-router-dom';

const Logout = ({ className }) => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }
    return (
        <button className={className} onClick={handleLogOut}>LogOut</button>
    )
}

export default Logout;