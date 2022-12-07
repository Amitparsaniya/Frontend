import React  from 'react'
import { ImTree } from 'react-icons/im'

export default function GenersSelector({badge,onClick}) {
    const renderBadge = () => {
        if(!badge) return null
        return (
          <span className='  dark:bg-dark-subtle bg-light-subtle w-6 h-5 rounded-full absolute top-0 right-0 text-white flex justify-center translate-y-0 translate-x-1 items-center '>
            {badge<=9?badge:  '9+'}
            </span>
        )
      }
  return (
    <button type='button' onClick={onClick} className=' relative flex items-center space-x-2 border-2 py-1 px-3 dark:border-dark-subtle border-light-subtle dark:hover:border-white transition dark:text-dark-subtle dark:hover:text-white text-light-subtle hover:text-primary rounded'>
        <ImTree/>
        <span>Select Genres</span>
        {renderBadge()}
    </button>
  )
}
