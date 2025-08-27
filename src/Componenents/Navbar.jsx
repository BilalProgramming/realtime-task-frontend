import React from 'react'
import { toast } from 'react-toastify'

const Navbar = () => {
    const handleLogout=()=>{
        localStorage.removeItem("token")
        toast.success("Logged out!")
        setTimeout(()=>{
            window.location.href="/"


        },1000)

        
       }
       return (
        <nav className='bg-gray-900 p-4 shadow-xl sticky top-0 z-10'>
          <div className='flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center space-x-4'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <div className='text-2xl font-extrabold text-blue-400 tracking-wide'>Taskify</div>
            </div>
            <ul>
              <button
                onClick={handleLogout}
                className='px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-lg transition-transform transform hover:scale-105 duration-300'
              >
                Logout
              </button>
            </ul>
          </div>
        </nav>
      );
}

export default Navbar
