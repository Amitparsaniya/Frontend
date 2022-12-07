import client from "./client"

export const createUser = async(userInfo) =>{
    try{
      const {data} = await client.post('/user/create',userInfo)
      console.log("helllooo",data);
      return data
    
    }catch(error){
        const {response} =error
        if(response?.data) return  response.data
        
        return {error:error.message || error }
    }
}
export const verifyUserEmail = async (userInfo) =>{
    try{
      const {data} = await client.post('/user/verfiy-email',userInfo)
      return data
    }catch(error){
      console.log(error)
        const {response} =error
        if(response?.data) return  response.data
        
        return {error:error.message || error }
    }
}
export const SignInUser = async (userInfo) =>{
    try{
      const {data} = await client.post('/user/signin',userInfo)
      return data
    }catch(error){
      console.log(error)
        const {response} =error
        if(response?.data) return  response.data
        
        return {error:error.message || error }
    }
}
export const getisAuth = async (token) =>{
    try{
      const {data} = await client.get('/user/is-auth',{ 
        headers:{
          Authorization:'Bearer ' + token,
          accept:"application/json"
        }
      })
      return data
    }catch(error){
      console.log(error)
        const {response} =error
        if(response?.data) return  response.data
        
        return {error:error.message || error }
    }
}
export const forgetPassword = async (email) =>{
    try{
      const {data} = await client.post('/user/forget-password',{ email})
      return data
    }catch(error){
      console.log(error)
        const {response} =error
        if(response?.data) return  response.data
        
        return {error:error.message || error }
    }
}
export const verfiypasswordResetToken = async (token,userId) =>{
    try{
      const {data} = await client.post('/user/verify-password-reset-token',{ token,userId})
      return data
    }catch(error){
      console.log(error)
        const {response} =error
        if(response?.data) return  response.data
        
        return {error:error.message || error }
    }
}
export const resetpassword = async (passwordInfo) =>{
    try{
      const {data} = await client.post('/user/reset-password',passwordInfo)
      return data
    }catch(error){
      console.log(error)
        const {response} =error
        if(response?.data) return  response.data
        
        return {error:error.message || error }
    }
}
export const resendEmailverificationToken = async (userId) =>{
    try{
      const {data} = await client.post('/user/resend-email-verificationtoken',{userId})
      return data
    }catch(error){
      console.log(error)
        const {response} =error
        if(response?.data) return  response.data
        
        return {error:error.message || error }
    }
}
