import React from 'react'

const commanPosterUI ='flex justify-center  items-center border border-dashed rounded dark:border-dark-subtle cursor-pointer aspect-video '

export default function PosterSelector({name,accept,onChange,selectedPoster,className,lable}) {
  return (
    <div>
        <input accept={accept} name={name} onChange={onChange} id={name} type="file" hidden />
        <label htmlFor={name}>
           { selectedPoster?<img className={commanPosterUI + ' object-cover ' + className} src={selectedPoster} alt="" />:<PosterUI lable={lable} className ={className}/>}
        </label>
    </div>
  )
}


const PosterUI =({lable,className})=>{
return(
    <div className={commanPosterUI + ' ' + className}>
        <span className=' dark:text-dark-subtle text-light-subtle'>{lable}</span>
    </div>
)
}