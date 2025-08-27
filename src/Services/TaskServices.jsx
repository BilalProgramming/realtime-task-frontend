import API from "./Api";

export const getAllUsers=async()=>{
 try{
    const token=localStorage.getItem("token")
    if(!token){
      return ({status:false,message:"No token provided"})
    }
    const response=await API.get("/task/getusers",{
      headers:{
          'Authorization':`Bearer ${token }`
      }
    })
    return({status:true,data:response.data})
 }
 catch(err){
    console.log(err);
    return({status:false,message:response.data.message ||"failed to get users"})
 }
}

export const createTask=async(formData)=>{
    try{
       const token=localStorage.getItem("token")
       if(!token){
         return ({status:false,message:"No token provided"})
       }
       const response=await API.post("/task/create",formData,{
         headers:{
             'Authorization':`Bearer ${token }`
         }
       })
       console.log("response",response);
       
       return({status:true,data:response.data})
    }
    catch(err){
       console.log(err?.response?.data?.message);
       return({status:false,message:err?.response?.data?.message ||"failed to create users"})
    }
   }
 export const getTask=async(id)=>{
    try{
       if(id){
        const response=await API.get(`/task/get/?id=${id}`)
        return({status:true,data:response.data})

        }
        const response=await API.get("/task/get")
        return({status:true,data:response.data})
       }
      
    catch(err){
       console.log(err);
       return({status:false,message:response.data.message ||"failed to get users"})
    }
   }   
   export const getTaskStats=async()=>{
    try{
       const token=localStorage.getItem("token")
       if(!token){
         return ({status:false,message:"No token provided"})
       }
       const response=await API.get("/task/stats",{
         headers:{
             'Authorization':`Bearer ${token }`
         }
       })
       return({status:true,data:response.data})
    }
    catch(err){
       console.log(err);
       return({status:false,message:response.data.message ||"failed to get users"})
    }
   }   

   export const updateTaskStatus=async(id)=>{
   try{
   
    const response=await API.put(`/task/status/${id}`)
    return ({status:true,data:response.data})
   }
   catch(err){
    return ({status:false,message:err.response?.data?.message})

   }
   }