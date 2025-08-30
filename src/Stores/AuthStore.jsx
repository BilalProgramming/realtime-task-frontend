import { create } from "zustand";



const getInitilaState=()=>{
    try{ 
        const token=localStorage.getItem("token")
        const user=localStorage.getItem("user")
        if(token && user){
            return {
                token,
                user:JSON.parse(user),
                isLoggedIn:true
            }
        }

    }
    catch(err){
        console.error("Failed to parse user data from localStorage", e);

    }
    //default initial State
   return{ token:null,
    user:null,
    isLoggedIn:false}
}
const useAuthStore=create((set)=>({
    

    ...getInitilaState(),
    login:(userData,token)=>set({
        user:userData,
        token,
        isLoggedIn:true

    }),
    logout:()=>{
        set({
        isLoggedIn:false,
        user:null,
        token:null
        
    }),
        // Clear localStorage on logout
        localStorage.removeItem("token"),
        localStorage.removeItem("user")
    }

    
}))
export default useAuthStore

