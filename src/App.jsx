
import './App.css'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import EmpDashboard from './Pages/EmpDashboard'
import ProtectedRoute from './Componenents/ProtectedRoute'
import AdminStats from './Pages/AdminStats'
import EmpStats from './Pages/EmpStats'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {



  return (
    <>
     
     
     
      <Router>
        <Routes>
          <Route path="/register" element={<Signup />}/>
          <Route path="/" element={<Login />}/>
          <Route path="/dashboard" element={<ProtectedRoute role={["admin","manager"]}><Dashboard /></ProtectedRoute>}/>
          <Route path="/adminStats" element={<ProtectedRoute  role={["admin","manager"]}><AdminStats /> </ProtectedRoute>}/>
          <Route path="/empdashboard" element={<ProtectedRoute  role={"employee"}><EmpDashboard /> </ProtectedRoute>}/>
          <Route path="/empStats" element={<ProtectedRoute  role={"employee"}><EmpStats /> </ProtectedRoute>}/>
          <Route path="*" element={<p className='text-3xl md:text-4xl font-bold tracking-wider mt-30 text-center text-red-500'>404-No page found</p>}/>


        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
      
    </>
  )
}

export default App
