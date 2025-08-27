import { jwtDecode } from "jwt-decode"
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"
const ProtectedRoute = ({children,role}) => {
    const token=localStorage.getItem("token")
    
    if(!token){
    return <Navigate to="/"/>
    
    }
    try{
        const decoded=jwtDecode(token)
        if(!role.includes(decoded.role)){
        return  <Navigate to="/"/>
        }
        return children
        

    }
    catch(err){
        console.log("err",err);
        toast.error("unauthenticated")
        localStorage.removeItem("token")
       return <Navigate to="/"/>
    

    }

    
 
}

export default ProtectedRoute
