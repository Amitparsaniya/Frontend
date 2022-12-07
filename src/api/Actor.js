import client from "./client"
export const CreateActor  =async(formdata)=>{
    const token = localStorage.getItem('auth-token')
try{
        const {data}= await client.post('/actor/create',formdata,{
            headers:{
                authorization :"Bearer " + token,
                'content-type': 'multipart/form-data'
            },
            
        })
        return data
}catch(error){
    console.log(error);
    const {response} =error
    if(response?.data) return response.data
    return {error:error.message ||error}
}
}
export const serchActor  =async(query)=>{
    const token = localStorage.getItem('auth-token')
try{
        const {data}= await client.get(`/actor/serch?name=${query}`,{
            headers:{
                authorization :"Bearer " + token,
                'content-type': 'multipart/form-data'
            },
            
        })
        return data
}catch(error){
    console.log(error);
    const {response} =error
    if(response?.data) return response.data
    return {error:error.message ||error}
}
}
