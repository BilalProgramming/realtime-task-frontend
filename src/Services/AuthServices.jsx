import API from "./Api";
import useAuthStore from "../Stores/AuthStore";

export const userSignup=async(formData)=>{
try{
    
    const response=await API.post("/user/signup",formData)
    console.log("response",response);
    
   return ({status:true,data:response?.data})
}
catch(err){
    console.log("err",err);
    return ({status:false,data:err?.response?.data?.message})

}
}
export const userLogin=async(formData)=>{
    try{
        
        const response=await API.post("/user/login",formData)
        const token=response?.data?.token
        const user=response.data.data
        // console.log("user from services",user);       
        useAuthStore.getState().login({user,token})
        localStorage.setItem("token",token)
        localStorage.setItem("user",JSON.stringify(user))


        console.log("response",response);       
       return ({status:true,data:response?.data})
    }
    catch(err){
        console.log("err",err);
        
        return ({status:false,data:err?.response?.data?.message})
    
    }
    }
    