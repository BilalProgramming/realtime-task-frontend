import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers,createTask } from '../Services/TaskServices'
import MainLayout from '../Componenents/MainLayout'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import io from 'socket.io-client';

const URL=import.meta.env.VITE_BACKEND_URL
const socket = io(URL); 
const Dashboard = () => {
    const navigate=useNavigate()
    const [createLoading,setCreateLoading]=useState(false)
    // const [usersData,setUsersData]=useState([])
    const [formData,setFormData]=useState({
        title:"",
    description:"",
    id:""
    })
    const getUsers=async()=>{
       
        const result=await getAllUsers()
        console.log("resut",result.data.data);
        
        if(result.status){
            return result?.data?.data
            // setUsersData(result.data.data)
        }   

    }
    const {
        data: users =[],
        isLoading,
        error,
      } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
      });
    
    // useEffect(()=>{  
    //     getUsers()
        
        
    // },[])
    
      const handleSubmit=async(e)=>{
        e.preventDefault()
        setCreateLoading(true)
        
        const result=await createTask(formData)
        console.log("result",result);
        
        if(!result.status){
            setCreateLoading(false)
            toast.error(result.message || "failed to create task")
            return

        }
        setFormData({
            title:"",description:"",id:""
        })
        setCreateLoading(false)
        navigate("/adminStats")
        toast.success(result.data.message || "created")
    }
    const handleInputChange=(e)=>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))

    }
      
  return (
    <>
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="w-full max-w-xl">
          <div className="bg-white p-8 rounded-3xl shadow-2xl space-y-8 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
            <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 tracking-wide">
              Assign New Task
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-md font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  onChange={handleInputChange}
                  className="mt-1 block w-full  rounded-lg border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors duration-200"
                  placeholder="e.g., Fix homepage bug"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-md font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  onChange={handleInputChange}
                  rows="4"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors duration-200"
                  placeholder="e.g., Resolve the issue with the user authentication flow."
                />
              </div>
              <div>
                <label htmlFor="assignedUser" className="block text-sm font-medium text-gray-700">
                  Assigned User
                </label>
                <select
                  id="assignedUser"
                  name="id"
                  onChange={handleInputChange}
                  value={formData.id}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors duration-200"
                >
                  <option value="">-- Select a user --</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  className={`w-full py-3 px-6 rounded-xl text-white font-semibold shadow-lg transition-all duration-300
                    ${createLoading 
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed animate-pulse' 
                      : 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 active:from-indigo-700 active:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                  disabled={createLoading}
                >
                  {createLoading ? 'Assigning Task...' : 'Assign Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  </>
  )
}

export default Dashboard
