import { useEffect, useState } from "react"
import { getTask,updateTaskStatus } from "../Services/TaskServices"
import MainLayout from "../Componenents/MainLayout"
import { toast } from "react-toastify"
import useAuthStore from "../Stores/AuthStore"
// import { UseSocketConnection } from "../CustomHook/UseSocketConnection"
import io from 'socket.io-client';
const URL=import.meta.env.VITE_BACKEND_URL
const socket = io(URL); 
const EmpDashboard = () => {
    const {user}=useAuthStore()
    const userId=JSON.parse(localStorage.getItem("user")).id
    
    // const userId=user?.user?.id
    // const { socket } = UseSocketConnection(userId);  
      const [tasks,setTasks]=useState([])
 //get task api call
    const fetchTaks=async()=>{
        const result=await getTask()
        if(result.status){
            setTasks(result.data?.data)
        }
    }
    useEffect(()=>{
        fetchTaks()
    },[])

    //useEffect for handling web socket event
    useEffect(() => {
        if(!userId){
            console.log("...");
            
        }
        socket.emit('joinRoom',{roomName:userId})
        socket.connect();
      
        socket.on('taskUpdated', (updatedTask) => {
          console.log(" updated your task as completed", updatedTask);
          toast.success(` Marked your task '${updatedTask.title}' as 'completed'`);
          fetchTaks();
        });

        //for create task
        socket.on('taskCreated',(createdTask)=>{
            console.log("Admin create task ", createdTask);
            toast.success(`Admin Assign one task  '${createdTask.title}''`);
            fetchTaks()
        })
      
        return () => {
          socket.off('taskUpdated');
          socket.disconnect();
          console.log("diconnect socket");
          
        };
      }, []); // listener always active
      
    //   useEffect(() => {
    //     if (!userId ) return;
    //     console.log('User joined room', userId);
    //   }, [userId]); // join when user ready
      

//      useEffect(() => {
//     // listener only once
//     socket.on("taskUpdated", (updatedTask) => {
//       console.log("Admin updated your task as completed", updatedTask);
//       toast.success(`Admin marked your task '${updatedTask.title}' as completed`);
//       fetchTaks();
//     });

//     return () => {
//       socket.off("taskUpdated");
//     };
//   }, [socket]);
    

   
    const handleStatusUpdate=async(id)=>{        
        const result=await updateTaskStatus(id)
        if(result.status){
         toast.success("status updated successfully")
         fetchTaks()
         return
        }
        toast.error("Failed to update status")
        
    }
  return (
    <MainLayout>
            
            <div className="bg-gray-50 min-h-screen px-4 py-12 flex flex-col items-center">
                <div className="max-w-4xl w-full mt-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-gray-800 tracking-tight">Your Tasks</h1>
                    {/* Responsive wrapper with rounded corners and shadow */}
                    <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-600">
                                <tr>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-white uppercase tracking-wide">Task Title</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-white uppercase tracking-wide hidden sm:table-cell">Description</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-white uppercase tracking-wide">Assigned Date</th>
                                    <th className="py-4 px-6 text-left text-sm font-semibold text-white uppercase tracking-wide">Status</th>

                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {tasks.length > 0 ? (
                                    tasks.map((task, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                                            <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{task.title}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{task.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(task.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-md text-blue-700 font-semibold">{task.status==="completed"?(task.status):
                                            (<input title="Marks as Complete" onChange={()=>handleStatusUpdate(task._id)} type="checkbox" />)}</td>
                                        
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="border-t border-gray-200">
                                        <td colSpan={3} className="px-6 py-4 text-center text-gray-500 font-medium">No tasks found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
  )
}

export default EmpDashboard
