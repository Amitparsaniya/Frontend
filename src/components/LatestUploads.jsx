import React from 'react'

export default function LatestUploads() {
  return (
    <div className="bg-white shadow dark:shadow dark:shadow-white dark:bg-secondary p-2 rounded col-span-2">
          <h1 className=' font-semibold text-2xl mb-2 text-primary dark:text-white'>Recent Uploads</h1>
          <MovieListItem/>
    </div>
  )
}

const MovieListItem =()=>{
    return (
        <table className=" w-full border-b">
            <tbody>
                <tr>
                    <td>
                        <img className=' w-24 aspect-video' src="https://media.istockphoto.com/id/1297349747/photo/hot-air-balloons-flying-over-the-botan-canyon-in-turkey.jpg?b=1&s=170667a&w=300&k=20&c=1oQ2rt0FfJFhOcOgJ8hoaXA5gY4225BA4RdOP1RRBz4=" alt="" />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
