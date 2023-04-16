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
export const EditActor  =async(id,formdata)=>{
    const token = localStorage.getItem('auth-token')
try{
        const {data}= await client.post('/actor/update/'+id,formdata,{
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
        const {data}= await client.get(`/actor/search?name=${query}`,{
            headers:{
                authorization :"Bearer " + token,

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
export const getActors  =async(pageNo,limit)=>{
    const token = localStorage.getItem('auth-token')
try{
        const {data}= await client.get(`/actor/actors?pageNo=${pageNo}&limit=${limit}`,{
            headers:{
                authorization :"Bearer " + token,
                'content-type': 'multipart/form-data'
            },
            
        })
        console.log( JSON.stringify( data ))
        return data
}catch(error){
    console.log(error);
    const {response} =error
    if(response?.data) return response.data
    return {error:error.message ||error}
}
}

export const DeleteActor  =async(id)=>{
    const token = localStorage.getItem('auth-token')
try{
        const {data}= await client.delete('/actor/'+id,{
            headers:{
                authorization :"Bearer " + token
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
