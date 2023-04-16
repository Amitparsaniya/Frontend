import React from 'react'
import MovieListItem from './MovieListItem'

export default function LatestUploads() {
  return (
    <div className="bg-white shadow dark:shadow dark:shadow-white dark:bg-secondary p-2 rounded col-span-2">
          <h1 className=' font-semibold text-2xl mb-2 text-primary dark:text-white'>Recent Uploads</h1>
          <MovieListItem  movie={{poster:"poster",title:"loreffferfree", status:"public",genres:["comdey","Action"]}}/>
    </div>
  )
}




