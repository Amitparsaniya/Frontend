import React from 'react'
import {BsTrash,BsPencilSquare,BsBoxArrowUpRight} from "react-icons/bs"

export default function MovieListItem() {
  return (
     MovieListItem =({movie,onDeleteClick,onEditClick,onOpenClick})=>{
        const {poster,title,genres=[],status}= movie
        return (
            <table className=" w-full border-b">
                <tbody>
                    <tr>
                        <td>
                            <div  className='w-24'>
                            <img className=' w-24 aspect-video' src={poster} alt={title}/>
                            </div>
                        </td>
                        <td className=' w-full pl-5'>
                            <div>
                                <h1 className=' text-lg font-semibold font-serif
                                  text-primary dark:text-white'>{title}</h1>
                                  <div className=' space-x-1'>
                                {
                                    genres.map((g,index)=>{
                                       return <span key={g +index} className=' text-xs text-primary dark:text-white'>{g}</span>
                                    })
                                }
                                  </div>
                            </div>
                        </td>
                        <td className=' px-5'>
                            <p className='  text-xs text-primary dark:text-white'>{status}</p>
                        </td>
                        <td>
                            <div className=' flex items-center space-x-3  text-primary dark:text-white text-lg'>
                                <button  onClick={onDeleteClick} type='button'><BsTrash/></button>
                                <button onClick={onEditClick} type='button'> <BsPencilSquare/>  </button>
                                <button onClick={onOpenClick}  type='button' > <BsBoxArrowUpRight/> </button>
                            </div>
                        </td>
                      
                    </tr>
                </tbody>
            </table>
        )
    }
    )
}