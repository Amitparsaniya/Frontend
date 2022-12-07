import React, { useState } from 'react'
import { serchActor } from '../../api/Actor'
import { useNotification, useSearch } from '../../hooks'
import { commanInputClasses } from '../../utils/theme'
import { renderItem } from '../admin/Movieform'
import LiveSearch from '../LiveSerch'

const deafultCastInfo={
    profile:{},
    roleAs:"",
    leadActor:false
}
export default function CastForm({onSubmit}) {
    const {updateNotification} =  useNotification()

    const [castInfo,setCastInfo]= useState({...deafultCastInfo})
    const [profiles,setprofiles] =useState([])
             const {handleserch,resetSerch} =  useSearch()

    const handleOnChange=({target})=>{
        const {checked,name,value} =target
        if(name==="leadActor") return setCastInfo({...castInfo, leadActor:checked })
        setCastInfo({...castInfo,[name]:value})
    }
    
    const handleprofileSelect=(profile)=>{
        setCastInfo({...castInfo,profile})
         
    }
    const handleSubmit=()=>{
        const {profile, roleAs}= castInfo
        if(!profile.name) return updateNotification('error','Cast profile is missing!')
        if(!roleAs.trim()) return updateNotification('error','Cast role is missing!')

        onSubmit(castInfo)
        setCastInfo({...deafultCastInfo,profile:{name:" "}})
        resetSerch()
        setprofiles([])
    }

    const handleprofilechange =({target}) =>{
        const {value} =target
        const {profile} =castInfo
        profile.name= value
        setCastInfo({...castInfo,...profile})
        handleserch(serchActor,value,setprofiles)
    }
    const {leadActor,profile,roleAs}= castInfo

  return (
    <div className='flex items-center space-x-2'>
        <input title='Set as lead actor' type="checkbox" name='leadActor' className='w-4 h-4' checked={leadActor} onChange={handleOnChange}/>
        <LiveSearch placeholder='Serch Profile' onChange={handleprofilechange} value={profile.name} results={profiles} onSelect={handleprofileSelect} renderItem={renderItem}/>
        <span className='dark:text-dark-subtle text-light-subtle font-semibold'>as</span>
        <div className='flex-grow'>
        <input type="text" className={commanInputClasses + " rounded p-1 text-lg border-2"} placeholder='Role As' value={roleAs} onChange={handleOnChange} name='roleAs' />
        </div>
        <button onClick={handleSubmit} type='button'  className=' bg-secondary dark:bg-white dark:text-primary text-white px-1 rounded'>Add</button>
    </div>
  )
}
