import React, { useEffect, useState } from 'react'
import { BsPencilSquare, BsTrash } from 'react-icons/bs'
import { DeleteActor, getActors,serchActor } from '../../api/Actor'
import { useNotification, useSearch } from '../../hooks'
import AppSerchForm from '../form/AppSerchForm'
import ConfirmModal from '../models/ConfirmModal'
import UpdateActor from '../models/UpdateActor'
import NextAndPreviousbutton from '../NextAndPreviousbutton'


let currentPageNo=0
const  limit =5
export default function Actors() {
  const {updateNotification} = useNotification()
  const {handleserch,resetSerch,resultNotfound} = useSearch()


  const [actors,setactors] =useState([])
  const [results,setresults] =useState([])
  const [reachToEnd,setreachedToEnd] =useState(false)
  const [busy,setbusy] =useState(false)
  const [showUpdateMOdal,setshowUpdateModal] =useState(false)
  const [showConformModal,setshowConformModal] =useState(false)
  const [selectedProfile,setselectedProfile] =useState(null)
  
  const fetchActors = async(pageNo) =>{

      const {profiles,error}= await getActors(pageNo,limit)
      if(error) return updateNotification('error',error)
      
      if(!profiles.length){
        currentPageNo =pageNo -1
        return setreachedToEnd(true)
      }
      setactors([...profiles])
      // console.log(profiles);
    
  }

  const handlenextclick =() =>{
        if(reachToEnd) return;
        currentPageNo += 1
        fetchActors(currentPageNo)

  }
  const handlepreviousclick =() =>{
    if(currentPageNo <=0) return;  
    // reachToend will be use bcs of when we press previous btn & w r in 1st page at that time we change setreachedtoend into false bcs we use true at line no 22
    if(reachToEnd) setreachedToEnd(false)
    currentPageNo -= 1
    fetchActors(currentPageNo)

  }

  const handleOnEditClick =(profile)=>{
    setshowUpdateModal(true)
    setselectedProfile(profile)

  }

  const handleserchSubmit =(value)=>{
    handleserch(serchActor ,value,setresults )
  }
  const handleserchrest =()=>{
    resetSerch()
    setresults([])
  }

const handleOnDeleteClick =(profile)=>{
  setselectedProfile(profile)
  setshowConformModal(true)
}
const handleOnDeleteConfirm =async()=>{
       setbusy(true)
       const {error,message}  =await  DeleteActor(selectedProfile.id)
       setbusy(false)

       if(error) return updateNotification("error",error)
       updateNotification("success",message)
       hideConfirmModal()
      //  fetchActors method use bcs after delete actor that in frontend not be remain blank
       fetchActors(currentPageNo)

  // setselectedProfile(profile)
  // console.log(profile);
  // setshowConformModal(true)
}

const hideConfirmModal =()=>{
  setshowConformModal(false)
}


  useEffect(()=>{
    fetchActors(currentPageNo)
  },[])

  const handleOnActorSuccess =(profile)=>{
   const UpdatedActor =actors.map((actor)=>{
      if(profile.id ===actor.id){
        return profile
      }
      return actor
    })

     setactors([...UpdatedActor])
  }
  
  
  return( 
    <>
  <div className=' p-2'>
    <div className=' flex justify-end mb-3'>
    <AppSerchForm placeholder='Serch Actor' 
    onReset={handleserchrest}
    onSubmit={handleserchSubmit}
    showresetIcon={results.length || resultNotfound}/>
    </div>
  {resultNotfound?<h1 className=' font-semibold text-xl  text-secondary dark:text-white text-center py-3'>
    Result not found!</h1>:(
  <div className=' grid grid-cols-3 gap-3 '>
  { results.length || resultNotfound ? results.map((actor,id)=>(
       <ActorProfile 
       profile={actor} 
       key={id} 
       onEditClick={()=>handleOnEditClick(actor)}
       onDeleteClick={()=>handleOnDeleteClick(actor)}/>
    ))  :
   actors.map((actor,id)=>(
       <ActorProfile profile={actor}
        key={id} 
       onEditClick={()=>handleOnEditClick(actor)}
       onDeleteClick={()=>handleOnDeleteClick(actor)}
       />
    ))}
  </div>)}
      {!results.length && !resultNotfound?<NextAndPreviousbutton className=' mt-5' 
      handlenextclick={handlenextclick} 
      handlepreviousclick={handlepreviousclick}/>:null}
    </div>

    <ConfirmModal visible={showConformModal}
    title="Are you Sure!"
    Subtitle="This action will remove profile permanently!"
     busy={busy}
     onConfirm={handleOnDeleteConfirm}
     onCancle={hideConfirmModal}/>


    <UpdateActor visible={showUpdateMOdal} onClose={()=>setshowUpdateModal(false)}
    intialstate={selectedProfile}  onSuccess={handleOnActorSuccess}/>
    </>

   )}
  
  const ActorProfile =({profile,onEditClick,onDeleteClick})=>{
    const [showOptions,setshowOptions] =useState(false)
    const acceptedNamelength = 15

    const getName =() =>{
      if(name.length <= acceptedNamelength) return name
       return name.substring(0,acceptedNamelength) + " ..."
    }
    const {name,avatar,about=" " } =profile
    if(!profile) return null;
  return (
          <div className="bg-white shadow dark:shadow dark:bg-secondary h-20 overflow-hidden rounded">
              <div onMouseEnter={()=>setshowOptions(true)} onMouseLeave={()=>{setshowOptions(false)}} className=' flex cursor-pointer relative'>
                <img src={avatar} alt={name} className=' w-20  aspect-square rounded object-cover' />
              <div className=' px-2 '>
                <h1 className=' text-xl text-primary dark:text-white'>{getName(name)}</h1>
                <p className='  text-primary dark:text-white opacity-60'>
                  {about.substring(0,50)}</p>
              </div>
            <Options visible={showOptions} onDeleteClick={onDeleteClick} onEditClick={onEditClick}/>          
         </div>
          </div>

  )
  }
  
  const Options =({visible,onDeleteClick,onEditClick}) =>{
    if(!visible) return null
    return (
      <div className='  flex justify-center items-center space-x-4  absolute inset-0 bg-primary bg-opacity-20 backdrop-blur-sm '>
  <button onClick={onDeleteClick} className='p-2 rounded-full bg-white text-primary hover:opecity-80 transition' type='button'><BsTrash/></button>
  <button onClick={onEditClick} className='p-2 rounded-full bg-white text-primary hover:opecity-80 transition' type='button'><BsPencilSquare/></button>
</div>
)
}
