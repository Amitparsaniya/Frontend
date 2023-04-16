import React from 'react'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Actors from '../components/admin/Actors'
import Dashboard from '../components/admin/Dashboard'
import Header from '../components/admin/Header'
import Movie from '../components/admin/Movie'
import Movieupload from '../components/admin/Movieupload'
import Navbaradmin from '../components/admin/Navbaradmin'
import ActoreUpload from '../components/models/ActoreUpload'
import NotFound from '../components/NotFound'

export default function Adminnavigator() {
  const [showMovieModal ,setshowMovieModal ]= useState(false)
  const [showActorModal ,setshowActorModal ]= useState(false)


  return (
    <>
    <div className=' flex  dark:bg-primary bg-white'>
      <Navbaradmin />
      <div className=" flex-1  max-w-screen-xl">
        <Header onAddMovieClick={()=>setshowMovieModal(true)} onAddActorClick={()=>setshowActorModal(true)}/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Movie" element={<Movie />} />
          <Route path="/Actors" element={<Actors />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
    <Movieupload visible={showMovieModal} onClose={()=>{setshowMovieModal(false)}} />
    <ActoreUpload visible={showActorModal} onClose={()=>{setshowActorModal(false)}} />
    </>
  )
}
