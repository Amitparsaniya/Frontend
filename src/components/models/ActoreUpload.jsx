import React from 'react'
import { useState } from 'react'
import { CreateActor } from '../../api/Actor'
import { useNotification } from '../../hooks'
import Actorform from '../form/Actorform'
import Modelscontainer from './Modelscontainer'

export default function ActoreUpload({visible, onClose}) {
  const [busy,setbusy] =useState()

  const {updateNotification}=useNotification()
  const handleSubmit = async(data)=>{
    setbusy(true)
    const {error,actor}=await CreateActor(data)
    setbusy(false)
    if(error) return updateNotification('error', error)
    updateNotification('success', "Actor created suceessfully!")
    console.log(actor);
    onClose()
  }
  return (
    <Modelscontainer visbile={visible} onClose={onClose} ignoreContainer>
        <Actorform busy={busy} onSubmit={!busy?handleSubmit:null} title="Create New Actor " btntitle='Create'/>
    </Modelscontainer>
  )
}
