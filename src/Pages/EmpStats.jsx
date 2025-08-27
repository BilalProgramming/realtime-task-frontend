import { useEffect, useState } from "react";
import MainLayout from "../Componenents/MainLayout"
import { LuListTodo, LuClipboardCheck, LuClock } from "react-icons/lu";
import { getTaskStats } from "../Services/TaskServices";


const DashboardCard=({title,value,icon,iconColor})=>{
  
    return(
        <div className="bg-white  flex items-center justify-center p-6 border border-gray-200 rounded-xl shadow-md transform transition-transform duration-300 hover:scale-105">
            <div className="flex flex-col">
                <h1 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h1>
                <p className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">{value}</p>
                <div className={`p-3 rounded-full ${iconColor} bg-opacity-50`}>
                            {icon}
                        </div>
            </div>

        </div>
    )

}
const EmpStats = () => {
    const [stats,setStats]=useState([])
    const fetchStats=async()=>{
        const result=await getTaskStats()
        if(result.status){
            setStats(result?.data?.data)
        }
    }
    useEffect(()=>{
        fetchStats()
    },[])
   
  return (
   <MainLayout>
    <div className="bg-gray-50 min-h-screen px-4 py-12 flex flex-col items-center">
        <div className="max-w-7xl w-full">
            <h1 className="text-2xl md:text-3xl tracking-wider font-extrabold text-center">Stats Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
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

        </div>

    </div>
   
   
   </MainLayout>
  )
}

export default EmpStats
