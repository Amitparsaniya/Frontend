import React from 'react'

export default function Modelscontainer({visbile,ignoreContainer,children,onClose}) {


    const renderChildren = () =>{
        if(ignoreContainer) return children

        return (
            <div className='dark:bg-primary bg-white rounded w-[40rem] h-[35rem] overflow-auto custom-scroll-bar'>{children}</div>
        )
    }

    const handleClick =(e)=>{
        if(e.target.id==="modal-container") onClose && onClose()
    }
    if(!visbile) return null

  return (

   <div
    id='modal-container'
     onClick={handleClick} className=' bg-primary dark:bg-white dark:bg-opacity-50 fixed flex items-center justify-center inset-0 bg-opacity-50 backdrop-blur-sm'>
    {renderChildren()}
    </div>
  )
}
