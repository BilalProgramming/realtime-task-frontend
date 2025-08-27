import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
const Sidebar = () => {
    const token=localStorage.getItem("token")
    const decoded=jwtDecode(token)
    const role=decoded.role
    const adminMenu=[
        {label:"Dashboard",path:"/adminStats"},
        {label:"Assign Task",path:"/dashboard"}
    ]
    const empMenu=[
        {label:"Dashboard",path:"/empStats"},
        {label:"View Task",path:"/empDashboard"}
    ]
    const menu=role==="employee"?empMenu:adminMenu

    return (
        <div className="bg-gray-900 w-64 p-6 text-white hidden md:block border-r border-gray-700 shadow-xl ">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-white">Dashboard</h2>
          <ul className="space-y-2">
            {
                menu.map((item)=>(
                    <Link to={item.path} className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200">
            <span className="text-white font-medium">{item.label}</span>
          </Link>
                ))
            }
      </ul>
        </div>
      );
}

export default Sidebar
