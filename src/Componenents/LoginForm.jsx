import { useState } from "react"
import { userLogin } from "../Services/AuthServices"
import { useNavigate,Link } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify"
const LoginForm = () => {
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const [formData,setFormData]=useState({
        email:"",password:""
    })
    const handleInputChange=(e)=>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))

    }
    const handleSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault()
        const result=await userLogin(formData)
        console.log(result);
        
        if(!result.status){
            setLoading(false)
            toast.error("Failed to login")
            return
        }
        setLoading(false)
        toast.success( "login succesfully")
        const token=localStorage.getItem("token")
        const decode=jwtDecode(token)
      
        if(decode.role==="employee"){
            navigate("/empStats")
        }
        else{
            navigate("/adminStats")

        }
        
        
       
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-2xl shadow-xl space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome Back
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Sign in to your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white font-semibold py-3 px-4 rounded-lg shadow-md  transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-blue-600 hover:underline">
                            Sign up here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
   
  )
}

export default LoginForm
