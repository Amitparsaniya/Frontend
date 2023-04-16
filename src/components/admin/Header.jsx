import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsFillSunFill } from 'react-icons/bs'
import { useTheme } from '../../hooks'
import AppSerchForm from '../form/AppSerchForm'

export default function Header({ onAddMovieClick, onAddActorClick }) {
    const [showOptions, setShowOptioons] = useState(false)
    const { toggleTheme } = useTheme()
    const options = [{ title: 'Add Movie', onClick: onAddMovieClick },
    { title: 'Add Actor', onClick: onAddActorClick }]
    return (
        <div className='flex items-center justify-between pb-2 relative p-3 '>
            <AppSerchForm placeholder='Serch'/>

            <div className=' flex items-center space-x-3 '>
                <button onClick={toggleTheme} className='dark:text-white p-2 dark:bg-dark-subtle bg-light-subtle rounded text-light-subtle' >
                    <BsFillSunFill />
                </button>

                <button
                    onClick={() => setShowOptioons(true)}
                    className='flex items-center space-x-2 border-secondary  text-secondary hover:opacity-80 transition font-semibold border-2 px-4 py-1 rounded  dark:border-dark-subtle border-light-subtle dark:text-white text-light-subtle  '>
                    <span>Create</span>
                    <AiOutlinePlus />
                </button>
                <CreatOptions visible={showOptions} OnClose={() => setShowOptioons(false)} options={options} />

            </div>

        </div>

    )
}

const CreatOptions = ({ options, visible, OnClose }) => {
    const container = useRef()
    const containerID = 'option-container'
    useEffect(() => {
        const handleClose = (e) => {
            // console.log(e.target);
            if (!visible) return
            const { parentElement, id } = e.target
            if (parentElement.id === containerID || id === containerID) return
            container.current.classList.remove('animate-scale')
            container.current.classList.add('animate-scale-reverse')
        }
        document.addEventListener('click', handleClose)
        return () => {
            document.removeEventListener('click', handleClose)

        }
    }, [visible])


    const handleClick =(fn)=>{
        fn()
        OnClose()
    }

    if (!visible) return null
    return (
        <div id={containerID} ref={container} className=' absolute z-50 rounded right-4 top-12 flex flex-col dark:bg-secondary space-y-2  animate-scale bg-white drop-shadow-lg p-2'
            onAnimationEnd={(e) => {
                if (e.target.classList.contains('animate-scale-reverse')) OnClose()
                e.target.classList.remove('animate-scale')

            }}>
            {/* <Options>Add Movie</Options>
            <Options>Add Actors</Options> */}
            {options.map(({ title, onClick }) => {
                return <Option key={title} onClick={()=>handleClick(onClick)}>{title}</Option>

            })}
        </div>
    )
}


const Option = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className=' dark:text-white text-secondary hover:opacity-80 transition '>{children}</button>

    )
}