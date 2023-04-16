import React from 'react'
import { ImSpinner3 } from 'react-icons/im'
import Modelscontainer from './Modelscontainer'

export default function ConfirmModal({visible,busy,onConfirm,onCancle,title,Subtitle}) {

    const commanClass = " px-2 py-1 text-white rounded"
  return (
    <Modelscontainer visbile={visible} ignoreContainer>
     <div className=' dark:bg-primary bg-white rounded p-2 '>
        <h1 className=' text-red-600 font-semibold text-lg'>{title}</h1>
        <p className=' text-secondary dark:text-white text-sm'>{Subtitle}</p>

        <div className=' flex items-center space-x-3 mt-2 '>
            {busy?
           ( <p className=' flex items-center space-x-2'>
            <ImSpinner3 className=' animate-spin  dark:text-white'/>
            <span className=' dark:text-white'>Please Wait</span>
            </p>):
            <>
            <button onClick={onConfirm} type='button' className={commanClass +" bg-red-600"}>Confirm</button>
            <button onClick={onCancle} type='button' className={commanClass +" bg-blue-600"}>Cancle</button>
            </>
            }

        </div>
     </div>
    </Modelscontainer>
  )
}
