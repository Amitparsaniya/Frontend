import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
import { useNotification } from '../hooks'

export const SerchContext = createContext()

let timeoutId
const debounce =(func,dealy)=>{
  return(...args) =>{
  if(timeoutId) clearTimeout(timeoutId)
 timeoutId =   setTimeout(()=>{
    func.apply(null,args)
    },dealy)
  }
}

export default function Serchprovider({children}) {
     const [serching,setserching] = useState(false)
     const [results,setresults] = useState([])
     const [resultNotfound,setresultNotfound] = useState(false)

     const {updateNotification} = useNotification()

     const  serch = async(method,query,updaterFun)=>{
        const {error,results} = await method(query)
        if(error) return updateNotification('error',error)
        if(!results.length) return setresultNotfound(true)
        setresults(results)
       updaterFun && updaterFun([...results])
      }

     const  debounceFun =   debounce(serch,500)

     const handleserch =(method,query,updaterFun) =>{
        setserching(true)
        if(!query.trim()){
        updaterFun &&  updaterFun([])
            resetSerch()
        }
        debounceFun(method,query,updaterFun)
     }

     const resetSerch =()=>{
      setserching(false)
      setresults([])
      setresultNotfound(false)
     }


  return (
    <SerchContext.Provider 
    value={{handleserch,resetSerch,serching,resultNotfound,results}}>
        {children}
    </SerchContext.Provider>
  )
}
