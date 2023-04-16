import React from 'react'
import Movieform from '../admin/Movieform'
import Modelscontainer from './Modelscontainer'

export default function UpdateMovie({visible}) {
  return (
    <Modelscontainer visbile={visible}>
      <Movieform/>
    </Modelscontainer>    
  )
}
