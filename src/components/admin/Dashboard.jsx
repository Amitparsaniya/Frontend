import React from 'react'
import AppInfoBox from '../AppInfoBox'
import LatestUploads from '../LatestUploads'



export default function Dashboard() {
  return (
      <div className="grid grid-cols-3 gap-5 my-2">
          <AppInfoBox title='Title uploads' subtitle='100' />
          <AppInfoBox title='Total reviews' subtitle='100' />
          <AppInfoBox title='Total users' subtitle='100' />

        <LatestUploads/>
         </div>
  )
}
