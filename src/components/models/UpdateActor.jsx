import React, { useState } from 'react'
import { useNotification } from '../../hooks'
import { EditActor } from '../../api/Actor'
import Actorform from '../form/Actorform'
import Modelscontainer from './Modelscontainer'

export default function UpdateActor({visible,intialstate,onSuccess,onClose}) {
    const [busy,setbusy] =useState()

    const {updateNotification}=useNotification()
    const handleSubmit = async(data)=>{
      setbusy(true)
      const {error,actor}=await EditActor(intialstate.id,data)
      setbusy(false)
      if(error) return updateNotification('error', error)
      onSuccess(actor)
      updateNotification('success', "Actor Update suceessfully!")
      onClose()
    }
    return (
      <Modelscontainer visbile={visible} onClose={onClose} ignoreContainer>
          <Actorform busy={busy} intialstate={intialstate} onSubmit={!busy?handleSubmit:null} title="Update Actor " btntitle='Update'/>
      </Modelscontainer>
    )
  }
  

