import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { generatePath } from 'react-router-dom'
import genres from '../../utils/genres'
import Submit from '../form/submit'
import Modelscontainer from './Modelscontainer'

export default function GenresModal({visible , onClose,onSubmit,previousSelection}) {
    const [selectedGenres,setSelectedGenres]= useState([])

    const handleGenresSelector =(gen)=>{
        let newGeners =[]
        if(selectedGenres.includes(gen))
        newGeners= selectedGenres.filter((genre)=> genre !==gen)
        else newGeners =[...selectedGenres, gen]
        setSelectedGenres([...newGeners])
    }

    const handleSubmit=()=>{
       onSubmit(selectedGenres)
       onClose()
    }
    const handleClose=()=>{
       setSelectedGenres([previousSelection])
       onClose()
    }
    
    useEffect(()=>{
        setSelectedGenres(previousSelection)
    },[])
  return (
    <>
    <Modelscontainer visbile={visible} onClose={handleClose} >
        <div className=' flex flex-col justify-between h-full'>
            <div>
        <h1 className=' dark:text-white text-primary text-2xl font-semibold text-center'>Select Geners</h1>
        <div className=" space-y-2">
        {genres.map((gen)=>{
            return(
                <Genres key={gen} onClick={()=>handleGenresSelector(gen)} selected={selectedGenres.includes(gen)} >{gen}</Genres>
                )
            })}
     </div>         
            </div>
            <div className="w-64 self-end">
                <Submit value='select' type='button' onClick={handleSubmit}/>
            </div>
        </div>
    </Modelscontainer>
    </>
  )
}

const Genres =({children,selected , onClick})=>{

   const getSelectedStyle =()=>{
    return selected? " dark:bg-white dark:text-primary bg-light-subtle text-white  ": " text-primary dark:text-white" 
   }

    return  <button onClick={onClick} className={(getSelectedStyle()) +  ' border-2 dark:border-dark-subtle border-light-subtle  p-1 mr-2'}>{children}</button>
}
