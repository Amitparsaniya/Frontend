import React, { createContext, useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { getisAuth, SignInUser } from '../api/auth'
import { useNotification } from '../hooks'

export const AuthContext= createContext()

  const defaultAuthInfo={
    profile:null,
    isLoggedin: false,
    isPending: false,
    error :''
  }
  
  export default function Authprovider({children}) {
    
  const [authInfo,setAuthInfo]= useState({...defaultAuthInfo})
  const {updateNotification} =useNotification()
  
  const navigate = useNavigate()

  // navigte to after login
  
  
  
  const handlelogin= async(email,password)=>{
    setAuthInfo({...authInfo,isPending:true})
    const {error,user} = await SignInUser({email,password})
    console.log(user);
    if(error){
      updateNotification('error',error)
      return setAuthInfo({...authInfo,isPending:false,error})
    } 
    navigate('/',{replace: true})

      setAuthInfo({profile:{...user},isPending:false, isLoggedin:true,error:''})

      localStorage.setItem("auth-token",user.token)
    }
       const isAuth =async()=>{
        const token= localStorage.getItem('auth-token')
        if(!token) return;

        setAuthInfo({...authInfo,isPending:true})
        const {error,user}= await getisAuth(token)
        if(error){
          console.log(error);
          updateNotification('error',error)
          return setAuthInfo({...authInfo,isPending:false,error})
        } 
        setAuthInfo({profile:{...user},isPending:false,isLoggedin:true,error:''})
       }

       const handlelogout=()=>{
          localStorage.removeItem("auth-token")
          setAuthInfo({...defaultAuthInfo})
       }

        useEffect(()=>{
            isAuth()
        },[])

  return (
    <AuthContext.Provider value={{authInfo,handlelogin,handlelogout,isAuth}}>
            {children}
    </AuthContext.Provider>
  )
}
