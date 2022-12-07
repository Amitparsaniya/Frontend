import React from 'react'
import {ImSpinner6} from 'react-icons/im'
export default function Submit({value,busy,type,onClick}) {
  return (
    <button type={type || "submit"} onClick={onClick}
   className=" w-full rounded dark:bg-white bg-secondary dark:text-secondary text-white hover:bg-opacity-90 transition text-lg font-semibold cursor-pointer h-10 flex items-center justify-center" >
      {busy?<ImSpinner6 className=' animate-spin'/>:value}</button>
  )
}
