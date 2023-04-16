import React from 'react'
import { useState } from 'react'
import { FileUploader } from "react-drag-drop-files"
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { uploadMovie, uploadTrailer } from '../../api/movie'
import { useNotification } from '../../hooks'
import Modelscontainer from '../models/Modelscontainer'
import Movieform from './Movieform'

export default function Movieupload({visible,onClose}) {
    const [videoSelected, setvideoSelected] = useState(false)
    const [videoUploaded, setvideoUploaded] = useState(false)
    const [UploadProgress, setUploadProgress] = useState(0)
    const [VideoInfo, setVideoInfo] = useState({})
    // const [movieInfo, setmovieInfo] = useState({title: "",
    // storyLine: "",
    // tags: [],
    // cast: [],
    // director: {},
    // writers: [],
    // releseDate: "",
    // poster: null,
    // genres: [],
    // type: "",
    // language: "",
    // status: "",
    // trailer: {
    //     secure_url: "",
    //   public_id: "",
    // },})

      const {updateNotification}= useNotification()

    const handleUploadTrailer =async(data)=>{
        const {error,secure_url,public_id} = await uploadTrailer(data,setUploadProgress)
        if(error) {
            console.log(error);
            return updateNotification('error',error)
        }
            setvideoUploaded(true)

        setVideoInfo({secure_url,public_id})
        console.log({secure_url,public_id})
        return updateNotification('success',"Trailer upload sucessfully!")
    }

    const handleTypeError = (error) => {
        updateNotification("error", error);
        console.log(error);
      };
    const handleChange = async (file) => {
        const formData = new FormData()
        formData.append('video', file)
        setvideoSelected(true)

        handleUploadTrailer(formData)
        console.log(JSON.stringify(file) +"file");

    }
    const handleSubmit =async(data)=>{
        try{

            if(!VideoInfo.secure_url || !VideoInfo.public_id) return updateNotification('error','Trailer is missing!')
            data.append('trailer',JSON.stringify(VideoInfo))
            
            const res= await uploadMovie(data)
            console.log( JSON.stringify(res)  +" res")
            onClose()
            return updateNotification("success" ,"Movie Upload successfully!")
        }catch(e){
            console.log(e);
        }
    }

    const getUploadProgessValue =()=>{
        if(!videoUploaded && UploadProgress >=100 ){
            return "Processing..."
        }
        return`Upload proggess ${UploadProgress}%`
    }

    return (
        <>
        <Modelscontainer  visbile={visible} onClose={onClose} >

            <Uploadprogress visible={!videoUploaded && videoSelected}
            message={getUploadProgessValue()} 
            width={UploadProgress}/>
       { !videoSelected?(<TrailerSelector visible={!videoSelected} onTypeError={handleTypeError} handleChange={handleChange} />):
            (<Movieform onSubmit={handleSubmit}/>)}
        </Modelscontainer>
        </>
    

    )


}
const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
    if (!visible) return null
    return (

        <div className='flex items-center justify-center h-full '>
            <FileUploader handleChange={handleChange} onTypeError={onTypeError} types={['mp4', 'avi']}>
                <div className=' w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col dark:text-light-subtle items-center justify-center cursor-pointer '>
                    <AiOutlineCloudUpload size={80} />
                    <p>Drop your file here</p>
                </div>
            </FileUploader>

        </div>

    )
}

const Uploadprogress =({width,message,visible})=>{
    if(!visible) return null
    return (
        <div className='p-2'>
        <div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
            <div className="h-3 overflow-hidden dark:bg-dark-subtle bg-light-subtle relative ">
                <div style={{width:width + '%'}} className="h-full absolute left-0 overflow-hidden  bg-secondary dark:bg-white w-14"/>
            </div>
                <p className='mt-1 font-semi-bold dark:text-dark-subtle text-light-subtle animate-pulse'>{message}</p>
        </div>
    </div>
    )
}