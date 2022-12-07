import React from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'
import Modelscontainer from './Modelscontainer'

export default function CastModal({ visible, casts = [], onClose, onremoveClick }) {
    return <Modelscontainer ignoreContainer onClose={onClose} visbile={visible}>
        <div className="space-y-2 p-1 dark:bg-primary bg-white rounded max-w-[40rem] max-h-[30rem] overflow-auto custom-scroll-bar">
            {casts.map(({ profile, leadActor,  roleAS }) => {
                const { name, avatar, id } = profile
                return (
                    <div key={id} className="flex space-x-2 ">
                        <img src={avatar} alt={name} className=' w-16 h-16 rounded object-cover' />

                        <div className="flex flex-col w-full justify-between">
                            <div> 
                            <p className='dark:text-white text-primary font-semibold '> {name}</p>
                            <p className=' text-sm dark:text-dark-subtle text-light-subtle'> {roleAS}</p>
                            </div>
                            {leadActor && (
                                <AiOutlineCheck className="text-light-subtle dark:text-dark-subtle" />
                                )}
                        
                        </div>
                        <button onClick={() => onremoveClick(id)} className='dark:text-white text-primary hover:opacity-80 transition p-2'>
                            <AiOutlineClose />
                        </button>
                    </div>
                )
            })}
        </div>

    </Modelscontainer>

}
