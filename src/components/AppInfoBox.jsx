import React from 'react'

export default function ({title,subtitle}) {
  return (
    <div className="bg-white shadow dark:shadow dark:shadow-white dark:bg-secondary p-2 rounded">
    <h1 className=' font-semibold text-2xl mb-2 text-primary dark:text-white'>{title}</h1>
    <p className='  text-xl  text-primary dark:text-white'>{subtitle}</p>
   </div>
  )
}
