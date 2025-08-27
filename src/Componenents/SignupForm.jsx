import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { userSignup } from "../Services/AuthServices"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

const SignupForm = () => {
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const [formData,setFormData]=useState({
        name:"",email:"",password:""
    })
    const handleInputChange=(e)=>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))

    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        
       const result=await userSignup(formData)
       console.log("result",result);
       
       if(!result.status){
        setLoading(false)
        toast.error(result.data)
        return
       }
       setLoading(false)
       toast.success(result.data.message)
       navigate("/")       
    }
  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen p-4 ">
        <div className="w-full max-w-md">
                  
               <div className="bg-white p-8   space-y-8 rounded-2xl shadow-md mt-5 ">
               <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome Back
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Register your account
                        </p>
                    </div>
               <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-600 mb-1" >Name</label>
                        <input type="text"
                        name="name" 
                        required
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1" >Email</label>
                        <input type="text" 
                          name="email" 
                          required
                          onChange={handleInputChange}
                        className=" w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 mb-1" >Password</label>
                        <input type="password" 
                          name="password" 
                          required
                          onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                        />
                    </div>
                    <div className="mt-3">
                    <button className={`bg-black text-white w-full  py-2  rounded-md shadow-md  ${loading?"opacity-50":"cursor-pointer"}`}>{loading?"Sign in...":"Sign in"}</button>

                    </div>

                    <p className="text-gray-500 text-sm text-center"> Have an account? <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold">Login here</Link></p>

                </form>
               </div>
            </div>
        </div>
   
  )
}

export default SignupForm
