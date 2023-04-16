import React, { useEffect, useState } from 'react'
import { getMovies } from '../../api/movie'
import { useNotification } from '../../hooks'
import UpdateMovie from '../models/UpdateMovie'
import MovieListItem from '../MovieListItem'
import NextAndPreviousbutton from '../NextAndPreviousbutton'

let cuurentpageNo =0
const limit =5
export default function Movie() {
  const [movies,setmovies] = useState([])
  const [reachToEnd,setreachedToEnd] = useState(false)
  const [showUpdateModal,setshowUpdateModal] = useState(false)
     const {updateNotification} =useNotification()

  const fetchMovies = async (PageNo)=>{
   try{
      const {error, movies} = await getMovies(PageNo,limit)
      if(error)  return updateNotification('error',error)
      if(!movies.length) {
         cuurentpageNo -= 1
         return setreachedToEnd(true)
      }
      setmovies([...movies])
      // console.log(movies);
   }catch(e){
      console.log(e);
    }
  }

  const handlenextclick =()=>{
   if(reachToEnd) return;
   cuurentpageNo += 1
   fetchMovies(cuurentpageNo)
  }
  const  handlepreviousclick=()=>{
   if(cuurentpageNo <=0) return;
   if(reachToEnd) setreachedToEnd(false) 
   cuurentpageNo -= 1
   fetchMovies(cuurentpageNo)
  }


  const handleonEditClick =(movie)=>{
   console.log(movie);
   setshowUpdateModal(true)
  }


  useEffect(()=>{
     fetchMovies()
  },[])

  return (
   
     <>

      <div className="space-x-3 p-5">
       {movies.map(movie=>{
          return <MovieListItem key={movie.id}
          movie={movie}
          onEditClick={()=>handleonEditClick(movie)}  />
       })}
                                        
       <NextAndPreviousbutton
       className=' mt-5'
       handlenextclick={handlenextclick}
       handlepreviousclick={handlepreviousclick}/>
      </div>
      <UpdateMovie visible={showUpdateModal}/>

      </>
      
  )
}