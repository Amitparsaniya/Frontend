import React from 'react'

export default function NextAndPreviousbutton({handlepreviousclick,handlenextclick,className=" "}) {
  const getClasses =()=>{
    return "flex justify-between items-center space-x-3 mt-5 "
  }
  return (
    <div  className={getClasses() + className} >
         
            <Button onClick={handlepreviousclick} title="Prev"/>
            <Button onClick={handlenextclick} title="Next"/>
           
         </div>
  )
}

const Button =({onClick,title})=>{
  return(
    <button type='button' onClick={onClick}  className=' text-primary dark:text-white hover:underline p-1 border border-primary dark:border-white  rounded '>{title}</button>
  )
}
