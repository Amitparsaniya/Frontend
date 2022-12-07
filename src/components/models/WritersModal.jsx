import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Modelscontainer from './Modelscontainer'

export default function WritersModal({visible,profiles=[],onClose,onremoveClick}) {
  return <Modelscontainer ignoreContainer onClose={onClose}  visbile={visible}>
    <div className="space-y-2 dark:bg-primary p-1 bg-white rounded max-w-[40rem] max-h-[30rem] overflow-auto custom-scroll-bar">
        {profiles.map(({id,name,avatar})=>{
            return(
                <div key={id} className="flex space-x-2 ">
                    <img src={avatar} alt={name} className=' w-16 h-16 rounded object-cover' />
                    <p className='dark:text-white text-primary font-semibold w-full'> {name}</p>
                    <button onClick={()=>onremoveClick(id)} className='dark:text-white text-primary hover:opacity-80 transition p-2'>
                        <AiOutlineClose/>
                    </button>
                </div>
            )   
        })}
        </div>

    </Modelscontainer>
  
}
