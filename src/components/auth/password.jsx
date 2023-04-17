import React from 'react'
import {FaSpinner} from 'react-icons/fa'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useNotification } from '../../hooks'
import { commonModelClasses } from '../../utils/theme'
import Container from '../container'
import FormContainer from '../form/FormContainer'
import FormInput from '../form/forminput'
import Submit from '../form/submit'
import Title from '../form/title'
import { resetpassword, verfiypasswordResetToken } from '../../api/auth'
import { useEffect } from 'react'

export default function ConfirmPassword() {
 const [password,setpassword] =useState({
   P1:'',
   cP2:''
 })
 const [isVerifying,setIsVerifying] = useState(false)
 const [isValid,setIsValid] = useState(false)
 const [serchparamas ] =useSearchParams()
 const token= serchparamas.get('token')
 const id=serchparamas.get('id')
 
 const {updateNotification} = useNotification()
 const navigate = useNavigate()
 // isvalidid,isVerfying,!isvalid

 useEffect(()=>{
     isvalidToken()
 },[])

 const isvalidToken = async()=>{
    const {error,valid}=await verfiypasswordResetToken(token,id)
    setIsVerifying(false)
    if(error) {
      navigate('/auth/reset-password',{replace:true})
      return updateNotification("error",error)
    }
    
    if(!valid) {
      setIsValid(false)
      return navigate('/auth/reset-password',{replace:true})
     }
     setIsValid(true)
 }

 const handlechange =({target})=>{
   const {name,value} = target
   setpassword({...password,[name]:value})
 }

 const handleSubmit= async(e) =>{
   e.preventDefault()
   if(!P1.trim()) return updateNotification('error','password is missing!')
   if(P1.trim().length<8) return updateNotification('error','password must be 8 charactors long!')
   if(P1 !== cP2) return updateNotification('error', "passwrod do not match!")

  const {error,message} = await resetpassword({newpassword: P1,userId:id,token})
  if(error) return updateNotification("error",error)

  updateNotification("success",message)
  navigate('/auth/signin',{replace:true})
 }

 const {P1,cP2} =password
 if(isVerifying)
 return (
   <FormContainer>
     <Container>
       <div className='flex space-x-2 items-center'>
           <h1 className=' dark:text-white text-primary font-semibold  text-4xl'>
           Please wait we are verifying your token!</h1>
           <FaSpinner className=' animate-spin text-4xl  dark:text-white text-primary'/>
       </div>
     </Container>
   </FormContainer>
 )
 if(!isValid)
 return (
   <FormContainer>
     <Container>
           <h1 className=' dark:text-white text-primary font-semibold  text-4xl'>
           Sorry the token is invalid!</h1>
     </Container>
   </FormContainer>
 )
 
 return (
   <FormContainer>
     <Container>
     <form onSubmit={handleSubmit} className={ commonModelClasses +" w-96"}>
     <Title>Enter new password </Title> 
               <FormInput label="New password" onChange={handlechange}  value={P1} placeholder="********" name="P1" type= "password" />
               <FormInput label="confirm password"  onChange={handlechange} value={cP2} placeholder="********" name="cP2" type="password" />
                <Submit value="Confirm password" />
       </form>

     </Container>
     </FormContainer>
 )   
}
