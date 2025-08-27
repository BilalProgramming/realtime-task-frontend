import API from "./Api";

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
        localStorage.setItem("token",response.data.token)
        console.log("response",response);       
       return ({status:true,data:response?.data})
    }
    catch(err){
        console.log("err",err);
        
        return ({status:false,data:err?.response?.data?.message})
    
    }
    }
    