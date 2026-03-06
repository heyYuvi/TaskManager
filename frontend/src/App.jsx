import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App(){

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace/>}></Route>

          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/dashboard' element={ localStorage.getItem('Token')? <Dashboard /> : <Navigate to='/login' />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;