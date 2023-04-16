import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function AppSerchForm({placeholder,onSubmit,showresetIcon,onReset}) {
    const [value,setValue] =useState('')

    const handleSubmit =(e)=>{
        e.preventDefault()
        onSubmit(value)
    }
    const handlereset =()=>{
        setValue('')
        onReset()
    }
  return (
    <form onSubmit={handleSubmit} className=" relative" >
        <input type="text"
                className=" border-2 dark:border-dark-subtle border-light-subtle  dark:focus:border-white focus:border-primary  dark:text-white transition bg-transparent rounded text-lg p-1 outline-none" placeholder={placeholder}
                value={value}
                onChange={({target})=>setValue(target.value)} />
            
            {showresetIcon?<button
            onClick={handlereset} 
            type='button' 
            className=' absolute top-1/2 -translate-y-1/2 right-2 text-secondary dark:text-white '>
                <AiOutlineClose/>
            </button>:null}
    </form>
  )
}
