import React, { useState } from 'react'
import { serchActor } from '../../api/Actor';
import { useNotification, useSearch } from '../../hooks';
import genres from '../../utils/genres';
import { languageOptions, statusOptions, typeOptions } from '../../utils/options';
import { commanInputClasses } from '../../utils/theme'
import TagsInput from '../auth/TagsInput'
import CastForm from '../form/CastForm';
import Submit from '../form/submit';
import GenersSelector from '../GenersSelector';
import LiveSerch from '../LiveSerch'
import CastModal from '../models/CastModal';
import GenresModal from '../models/GenresModal';
import Modelscontainer from '../models/Modelscontainer';
import WritersModal from '../models/WritersModal';
import PosterSelector from '../PosterSelector';
import Selector from '../Selector';



const defaultMovieInfo = {
  title: "",
  storyline: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  relaseDate: "",
  poster: null,
  geners: [],
  type: "",
  language: "",
  status: ""

}
export const renderItem = (result) => {
  return (
    <div className="flex rounded overflow-hidden">
      <img src={result.avatar} alt="" className="w-16 h-16 object-cover" />
      <p className="dark:text-white font-semibold">{result.name}</p>
    </div>
  );
};
const validteMovie =(movieInfo)=>{
  const {title,storyline,language,type,status,geners,relaseDate,tags,cast}= movieInfo

  if(!title.trim()) return {error:"Title is missing!"}
  if(!storyline.trim()) return {error:"storyline is missing!"}
  if(!language.trim()) return {error:"language is missing!"}
  if(!relaseDate.trim()) return {error:"relaseDatee is missing!"}
  if(!status.trim()) return {error:"status is missing!"}
  if(!type.trim()) return {error:"type is missing!"}
  // validation fr geners is an array or not
  if(!geners.length) return {error:"geners are missing!"}
  for(let gen of genres){
    if(!gen.trim()) return {error:"Invalid geners!"}
  }
  if(!tags.length) return {error:"Tags are missing!"}
  for(let tag of tags){
    if(!tag.trim()) return {error:"Invalid tags!"}
  }
  if(!cast.length) return {error:"Cast are missing!"}
  for(let c of cast){
    if(typeof c !=="object") return {error:"Invalid cast!"}
  }
  return {error:null}
}

export default function Movieform({onSubmit}) {
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo })
  const [showWritersModal, setshowWritersModal] = useState(false)
  const [showCastModal, setshowCastModal] = useState(false)
  const [showGenresModal, setShowGenresModal] = useState(false)
  const [selectedPosterUI, setSelectedPosterUI] = useState('')
  const [writersname, setwritersname] = useState(" ")
  const [writersProfille, setwritersProfile] = useState([])
  const [directorProfille, setdirectorProfile] = useState([])

  const { updateNotification } = useNotification()
         const {handleserch,resetSerch,serching,resultNotfound,results}  = useSearch()

  const updatePoster =(file)=>{
    const url =URL.createObjectURL(file)
    setSelectedPosterUI(url)
  }

  const handlechange = ({ target }) => {
    const { value, name,files } = target
    if(name ==='poster') {
      const poster= files[0]
      updatePoster(poster)
    return   setMovieInfo({ ...movieInfo, poster })
    }
    setMovieInfo({ ...movieInfo, [name]: value })
  }


  
  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags })
  }
  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile })
    setdirectorProfile([])
    resetSerch()
  }
  const updateWriters = (profile) => {
    const { writers } = movieInfo
    for (let writer of writers) {
      if (writer.id === profile.id) {
        try {
          console.log(profile.id && writer.id);
          return updateNotification("warning", 'you allready  selected this profile')
        } catch (e) {
          console.log(e);
        }
      }
    }
    setMovieInfo({ ...movieInfo, writers: [...writers, profile] })
    setwritersname(" ")
  }

  const handleWritersRemove =(profileId)=>{
      const  {writers} =movieInfo
      const newwriters =  writers.filter((({id})=>id !== profileId))
      if(!newwriters.length) setshowWritersModal(false)
      setMovieInfo({...movieInfo,writers: [...newwriters]})
  }
  const handleCastRemove =(profileId)=>{
      const  {cast} =movieInfo
      const newcast =  cast.filter((({profile})=>profile.id !== profileId))
      if(!newcast.length) setshowCastModal(false)
      setMovieInfo({...movieInfo,cast: [...newcast]})
  }

  const handleprofilechange = ({target})=>{
         const {name,value} =target
         if(name === "director"){
           setMovieInfo({...movieInfo,director:{name:value}})
           handleserch(serchActor, value,setdirectorProfile)
         }
         if(name==='writers')  {
           setwritersname(value)
           handleserch(serchActor, value,setwritersProfile)
        }
          

  }

  const updateCast =(castInfo)=>{
    const {cast} =movieInfo
     setMovieInfo({...movieInfo,cast:[...cast,castInfo]}) 

  }

  const updateGenres =(geners)=>{
     setMovieInfo({...movieInfo,geners}) 
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {error}= validteMovie(movieInfo)
    if(error) return updateNotification('error',error)

    const {tags,geners,cast,writers,director,poster} =movieInfo
    
    const finalMovieInfo ={...movieInfo}
    const formData = new FormData()
   finalMovieInfo.tags=JSON.stringify(tags)
   console.log(tags);
   finalMovieInfo.geners=JSON.stringify(geners)

   const finalcast = cast.map((c)=>({
    actor:c.profile.id,
    roleAs: c.roleAs,
    leadActor:c.leadActor
   }))
   console.log(finalcast);

   finalMovieInfo.cast =JSON.stringify(finalcast)

   if(writers.length){
    const finalWriters = writers.map(w=>w.id)
    finalMovieInfo.writers =JSON.stringify(finalWriters)
   }

   if(director.id){
    finalMovieInfo.director= director.id
   }
   

   if(poster){
    finalMovieInfo.poster =poster
   }

   for (let key in finalMovieInfo) {
        formData.append(key,finalMovieInfo[key])    
   }
   console.log(movieInfo);
    onSubmit(formData)
  }

  

  
  const { title, storyline, director,  writers, cast,tags,geners,type,language,status,relaseDate} = movieInfo
  return (
    <>
    <form onSubmit={handleSubmit} className='flex space-x-3 p-1'>
      <div className="w-[70%]  space-y-3 ">
        <div>
          <Label htmlFor='title'>Title</Label>
          <input value={title} id='title' onChange={handlechange} name='title' placeholder='Titanic'
            type="text" className={commanInputClasses + ' border-b-2 font-semibold  text-xl'} />
        </div>
        <div>
          <Label htmlFor="storyline">Story line</Label>
          <textarea value={storyline} onChange={handlechange} name='storyline' id="storyline" placeholder='Movie story line' className={commanInputClasses + " resize-none h-24 border-b-2"} ></textarea>
        </div>

        <div>
          <Label htmlFor="tags">Tags</Label>
          <TagsInput value={tags} name='tags' onChange={updateTags} />
        </div>

        <div>
          <Label htmlFor="director">Director</Label>
          <LiveSerch results={directorProfille} name='director'
            value={director.name}
            placeholder="Search profile"
            renderItem={renderItem}
            onSelect={updateDirector} 
            onChange={handleprofilechange}
            visible ={directorProfille.length}
            
             />
        </div>
        <div>
          <div className='flex justify-between  '>
            <LabelWithBadge badge={writers.length} htmlFor="writers">Writers</LabelWithBadge>
           <ViewAllBtn onClick={()=>{setshowWritersModal(true)}} visible={writers.length} >ViewAll</ViewAllBtn>
          </div>

          <div>
          <LiveSerch  name='writers'
            placeholder="Search profile"
            renderItem={renderItem}
            onSelect={updateWriters}
            onChange={handleprofilechange}
            results={writersProfille}
            value={writersname}
            visible={writersProfille.length}
             />
            </div>

        </div>

            <div>
            <div className='flex justify-between  '>
            <LabelWithBadge badge={cast.length} >Add Cast & Crew</LabelWithBadge>
           <ViewAllBtn  onClick={()=> setshowCastModal(true)}  visible={cast.length} >ViewAll</ViewAllBtn>
          </div>
            <CastForm  onSubmit={updateCast}/>
               </div>
               <input type='date' value={relaseDate} className={commanInputClasses + " border-2 rounded p-1 w-auto "} onChange={handlechange} name='relaseDate'  />

                
                <Submit value='upload' onClick={handleSubmit}  type="button"/>
                
      </div>

      <div className="w-[30%] space-y-3 ">
          <PosterSelector name='poster' accept='image/jpg,image/jpeg,image/png' onChange={handlechange}        selectedPoster={selectedPosterUI} lable='Select poster' />
          <GenersSelector badge={geners.length}  onClick={()=>{setShowGenresModal(true)}}/>
          <Selector onChange={handlechange} name='type'value={type} options={typeOptions} lable='Type'/>
          <Selector onChange={handlechange} name='language' value={language} options={languageOptions} lable='Language'/>
          <Selector onChange={handlechange} name='status'value={status} options={statusOptions} lable='Status'/>
      </div>

    </form>
    
  <WritersModal onremoveClick={handleWritersRemove} visible={showWritersModal} onClose={()=>setshowWritersModal(false)}  profiles={writers}   />
    
  <CastModal
   onremoveClick={handleCastRemove}  visible={showCastModal} onClose={()=>setshowCastModal(false)} casts={cast}   />

   <GenresModal onSubmit={updateGenres} visible={showGenresModal} previousSelection={geners} onClose={()=>{setShowGenresModal(false)}}/>

    </>
  )
}

const Label = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className='  dark:text-dark-subtle text-light-subtle font-semibold' >{children}</label>
  )

}
const LabelWithBadge = ({ children, htmlFor, badge =0 }) => {
  const renderBadge = () => {
    if(!badge) return null
    return (
      <span className='  dark:bg-dark-subtle bg-light-subtle w-6 h-5 rounded-full absolute top-0 right-0 text-white flex justify-center translate-x-8 items-center '>
        {badge<=9?badge:  '9+'}
        </span>
    )
  }
  return (
    <div className=" relative">
      <Label htmlFor={htmlFor}> {children}</Label>
      {renderBadge()}
    </div>

  )

}


const ViewAllBtn=({visible,children,onClick})=>{
  if(!visible) return null
  return(
    <button type="button" onClick={onClick} className=' dark:text-white text-primary hover:underline transition'>{children}</button>
  )
}