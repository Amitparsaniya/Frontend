import client from "./client"


export const uploadTrailer =async(formdata,onUploadProgress)=>{
    const token = localStorage.getItem('auth-token')
try{
        const {data}= await client.post('/movie/upload-trailer',formdata,{
            headers:{
                authorization :"Bearer " + token,
                'content-type': 'multipart/form-data'
            },
            onUploadProgress:({loaded,total})=>{
                if(onUploadProgress) onUploadProgress(Math.floor((loaded/total)*100))
            }
        })
        console.log( JSON.stringify(data));
        return data
}catch(error){
    console.log(error);
    const {response} =error
    if(response?.data) return response.data
    return {error:error.message ||error}
}
}
export const uploadMovie =async(formdata)=>{
    const token = localStorage.getItem('auth-token')
try{
        const {data}= await client.post('/movie/create',formdata,{
            headers:{
                authorization :"Bearer " + token,
                'content-type': 'multipart/form-data'
            },
           
        })
        console.log( JSON.stringify(data) +" data");
        return data
}catch(error){
    console.log(error.response?.data);
    const {response} =error
    console.log(response);
    if(response?.data) return response.data
    return {error:error.message ||error}
}
}
export const getMovies =async(PageNo,limit)=>{
    const token = localStorage.getItem('auth-token')
try{
        const {data}= await client.get(`/movie/movies?pageNo=${PageNo}&limit=${limit}`,{
            headers:{
                authorization :"Bearer " + token,
                'content-type': 'multipart/form-data'
            },
           
        })
        console.log(JSON.stringify(data ))
        return data
}catch(error){
    console.log(error.response?.data);
    const {response} =error
    console.log(response);
    if(response?.data) return response.data
    return {error:error.message ||error}
}
}