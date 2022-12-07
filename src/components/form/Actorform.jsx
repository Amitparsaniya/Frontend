import React from 'react'
import { useState } from 'react'
import {ImSpinner6} from 'react-icons/im'
import { useNotification } from '../../hooks'
import { commanInputClasses } from '../../utils/theme'
import PosterSelector from '../PosterSelector'
import Selector from '../Selector'

                   
const defaultActorInfo= {
  name: '',
  about :'',
  gender:'',
  avatar : null
}

const genderOptions =[
  {title:"Male", value:"male"},
  {title:"FeMale", value:"female"},
  {title:"Other", value:"other"}
]

const valideActor =({name,about,gender,avatar})=>{
   if(!name.trim()) return {error:"Actor name is missing!"}
   if(!about.trim()) return {error:"About  is missing!"}
   if(!gender.trim()) return {error:"Gender is missing!"}
   if(avatar && !avatar.type?.startsWith('image')) return {error:"Invalid image!"}

   return {error: null}
}

export default function Actorform({title,btntitle,onSubmit,busy}) {
  const [actorInfo, setActorInfo] = useState({...defaultActorInfo})
  const [selectedposterforUI, setselectedposterforUI] = useState('')

  const {updateNotification}=useNotification()

  const updatePoster =(file)=>{
    const url =URL.createObjectURL(file)
    setselectedposterforUI(url)
  }

  const handlechange =({target}) =>{
    const {name,value,files} =target
    if(name === "avatar"){
      const file = files[0]
      updatePoster(file)
       return setActorInfo({...actorInfo,avatar:file})
      }
      
       setActorInfo({...actorInfo, [name]:value})

      }
      
      const handlesubmit =(e)=>{
        e.preventDefault()
        const {error}=valideActor(actorInfo)
        if(error) return updateNotification('error',error)
        setActorInfo({...defaultActorInfo})
        setselectedposterforUI('')

        onSubmit(actorInfo)
      }

      
      
      const {name,about,gender} =actorInfo
  return (
    <form onSubmit={handlesubmit} className=' dark:bg-primary bg-white w-[35rem] p-3 rounded '>
        <div className=" flex justify-between items-center mb-3 ">
            <h1 className=' font-semibold text-xl dark:text-white text-primary'>{title}</h1>
            <button type='submit' className=' px-3 py-1 bg-primary text-white dark:bg-white dark:text-primary hover:opecity-80 transition rounded'>{busy?<ImSpinner6 className=' animate-spin'/>:btntitle}</button>

        </div> 
        <div className="flex space-x-2">
            <PosterSelector name='avatar' onChange={handlechange} lable='Select avatar' accept='image/jpg,image/jpeg,image/png' selectedPoster={selectedposterforUI}  className='  w-36 h-36 aspect-square object-cover rounded'/>
          <div className=" flex-grow flex-col space-y-2">
            <input placeholder='Enter Name' name='name' value={name} onChange={handlechange} type="text" className={commanInputClasses + ' border-b-2'} />
            <textarea name='about' onChange={handlechange} value={about}  className={ commanInputClasses + " border-b-2 resize-none h-[6rem]" } placeholder='About' ></textarea>
          </div>
        </div> 
        <div className="mt-3">

        <Selector options={genderOptions} lable='Gender' name='gender' value={gender} onChange={handlechange}/>
        </div>
        </form>
  )
}
