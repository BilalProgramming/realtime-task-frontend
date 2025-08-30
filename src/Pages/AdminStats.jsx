import React,{ useEffect, useState } from "react";
import MainLayout from "../Componenents/MainLayout";
import { getTaskStats,getTask,updateTaskStatus } from "../Services/TaskServices"; 
import { LuListTodo, LuClipboardCheck, LuClock } from "react-icons/lu";
import { createPortal } from 'react-dom';
import { toast } from "react-toastify";
import io from 'socket.io-client';

const URL=import.meta.env.VITE_BACKEND_URL
const socket = io(URL); 
const DashboardCard=({title,value,icon,iconColor})=>{
    return(
        <div className="bg-white   rounded-xl shadow-md  border border-gray-200 p-6  flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
            <div className="flex flex-col  ">
            <h1 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h1>
            <p className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">{value}</p>
                        </div>
                        <div className={`p-3 rounded-full ${iconColor} bg-opacity-50`}>
                            {icon}
                        </div>
           

        </div>
    )
}

export const Modal = ({ title, children, onClose }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4 sm:p-6 font-[Inter]">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl transform transition-all sm:my-8">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 border-b border-gray-200 rounded-t-lg bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 ml-auto bg-transparent border-0 text-gray-400 hover:text-gray-900"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );

  if (isBrowser) {
    return createPortal(modalContent, document.body);
  } else {
    return null;
  }
};


const AdminStats=()=>{
    const [stats,setStats]=useState([])
    const [modalOpen,setModalOpen]=useState(false)
    const [tasksData,setTaskData]=useState([])
    const fetchTaskstats=async()=>{
        const result=await getTaskStats()
        console.log("result",result);
        
        if(result.status){
            setStats(result?.data?.data)

        }

    }
    useEffect(()=>{
     fetchTaskstats()
    },[])
   // useEffect for handling WebSocket events
    useEffect(()=>{
         // Listen for the 'admin task updatwed' event from the backend
         socket.emit('joinRoom',{roomName:'admin'})
         console.log("admin join room Name admin");
         
         socket.on('adminTaskUpdated',(updatedTask)=>{
            console.log("Admin has marked  one  task  as 'completed:", updatedTask);
            toast.success(`Admin has marked  task '${updatedTask.title}' as 'completed`)

            // Re-fetch the task statistics to reflect the change
            fetchTaskstats(); 
         })
               // Listen for the 'user task updatwed' event from the backend
         socket.on('taskUpdated',(updatedTask)=>{
            console.log("user has marked  one  task  as 'completed:", updatedTask);
            toast.success(`User has marked  task '${updatedTask.title}' as 'completed`)

            // Re-fetch the task statistics to reflect the change
            fetchTaskstats(); 
         })
          // Cleanup the listener when the component unmounts
        return () => {
            socket.off('adminTaskUpdated');
            socket.off('taskUpdated') 
            console.log("admin disconnect to socket");

        };

    },[])
    const handleView=async(id)=>{
        setModalOpen(true)
        const result=await getTask(id)
        console.log(result);        
        if(result.status){
            setTaskData(result?.data?.data)

        }
        
    }
    const handleStatus=async(id)=>{
        const result =await updateTaskStatus(id)
        if(result.status){
            toast.success("Marks as Completed successfully")
            setModalOpen(false)
            return
        }
        toast.error("Failed to updat status")

    }

return(
    <MainLayout>
  
    <div className="bg-gray-50 min-h-screen px-4 py-12 flex flex-col items-center">
            <div className="max-w-7xl w-full">
                <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-tight">Stats Overview</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DashboardCard 
                        title={"Total Tasks"} 
                        value={stats.totalTasks}
                        icon={<LuListTodo className="h-8 w-8 text-blue-500" />}
                        iconColor="bg-blue-100"
                    />
                    <DashboardCard 
                        title={"Pending Tasks"} 
                        value={stats.totalPendingTask}
                        icon={<LuClock className="h-8 w-8 text-yellow-500" />}
                        iconColor="bg-yellow-100"
                    />
                    <DashboardCard 
                        title={"Completed Tasks"} 
                        value={stats.totalCompletedTask}
                        icon={<LuClipboardCheck className="h-8 w-8 text-green-500" />}
                        iconColor="bg-green-100"
                    />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-center  mt-10 ">Total Task per user</h1>
                 <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200 mt-10">
                 <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-600">
                        <tr>
                            <th className="px-6 py-4 tracking-wide text-sm font-semibold text-white text-left uppercase">Name</th>
                            <th className="px-6 py-4 tracking-wide text-sm font-semibold text-white text-left uppercase">Total Task</th>
                            <th className="px-6 py-4 tracking-wide text-sm font-semibold text-white text-left uppercase">Expanded View</th>

                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {
                           stats?.tasksPerUser?.map((stat)=>(
                            <tr  className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                                <td className="px-6 py-4">{stat.user}</td>
                                <td className="px-6 py-4 text-left text-gray-900 text-md">{stat.count}</td>
                                <td className="px-6 py-4 text-left text-gray-900 text-md"><button onClick={()=>handleView(stat.id)} className="bg-blue-600 hover:bg-blue-700 cursor-pointer px-4 py-2  text-white rounded-md shadow-md">view</button></td>

                            </tr>

                           ))
                        }
                        
                    </tbody>
                   </table>
                 </div>
               
            </div>
            {modalOpen && (
  <Modal title="User Task Details" onClose={()=>setModalOpen(false)}>

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/*  map through your tasks data */}
          {tasksData.map((task,index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{task.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                {task.status === 'completed' ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {task.status}
                  </span>
                ) : (
                    
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      disabled={task.status==="completed"}
                      checked={task.status==="completed"}
                      onChange={() => handleStatus(task._id)}
                      className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="ml-2 text-yellow-600 font-medium">Pending</span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Modal>
)}
        </div>
    </MainLayout>
)
}
export default AdminStats