import React,{ useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function TagsInput({name,value,onChange}) {
   const [tag,setTag] =useState('')
   const [tags,setTags] =useState([])

   const handleOnchange=({target})=>{
     const {value} =target
        if(value !== ',')setTag(value)
        onChange(tags)
   }

   const input= useRef()
   const focusInput= useRef()

   const handlekeyDown=({key})=>{
        if(key === "," || key === 'Enter'){
            if(!tag) return 

            if(tags.includes(tag)) return setTag("")

            setTags([...tags,tag])
            setTag('')
        }

        if(key==='Backspace'&& !tags  && tags.length ){
        const newTags= tags.filter((_,index)=> index !==tags.length-1)
        setTags([...newTags])
    }
   }

   const removeTag =(tagtoRemove)=>{
        const newTags= tags.filter((tag)=> tag !== tagtoRemove)
        setTags([...newTags])
   }
    
   useEffect(()=>{
     if(value.length)setTags(value)
    },[value])
    
    useEffect(()=>{
      input.current.scrollIntoView(false)
    },[tag])

    // useEffect(()=>{
    //  onChange(tags)
    //  setTag(value)
    // },[tags])
   return (
    <div>
      <div
      ref={focusInput}
        onKeyDown={handlekeyDown}
        className="border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full text-white flex items-center space-x-2 overflow-x-auto custom-scroll-bar "
      >
        {tags.map((t) => (
          <Tag onClick={()=>removeTag(t)} key={t}>{t}</Tag>
        ))}
        <input ref={input} id={name} type="text" className="h-full flex-grow bg-transparent outline-none dark:text-white text-primary "
          placeholder="Tag one, Tag two"value={tag}  onChange={handleOnchange} />
      </div>
    </div>
  );
}


const Tag =({children,onClick})=>{
    return(
        <span className=' dark:bg-white bg-primary dark:text-primary text-white whitespace-nowrap  items-center text-sm px-1'>{children}
            <button onClick={onClick} type='button'>
                <AiOutlineClose size={12}/>
            </button>
        </span>
    )
}

