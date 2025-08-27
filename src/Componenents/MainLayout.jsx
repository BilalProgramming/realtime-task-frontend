import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

const MainLayout = ({children}) => {
  return (
    <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="flex ">
            <Sidebar />
            
        
        <div className="flex-1 p-8 md:p-12">

           
            {children}
            </div>
        </div>
      
    </div>
  )
}

export default MainLayout
