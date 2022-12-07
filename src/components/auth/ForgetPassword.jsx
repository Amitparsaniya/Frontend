import React from 'react'
import Container from '../container'
import FormInput from '../form/forminput'
import Submit from '../form/submit'
import Title from '../form/title'
import Coustomlink from '../Coustomlink'
import FormContainer from '../form/FormContainer'
import { commonModelClasses } from '../../utils/theme'
import { useState } from 'react'
import { useNotification } from '../../hooks'
import { forgetPassword } from '../../api/auth'


const validateUserEmail = (email) => {
  const isvalidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
 
  if (!email.trim()) return { ok: false, error: "Email is missing" }
  if (!isvalidEmail.test(email)) return { ok: false, error: "Email is invalid!" }

  return { ok: true }

}


export default function ForgetPassword() {
  const [email,setEmail]  =useState('')

    const {updateNotification} = useNotification()

  const handlechange = ({ target }) => {
    const { value } = target
    setEmail(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok =  validateUserEmail(email)
    if(!ok) return updateNotification('error',"Invalid Email!")

    const { error,message } =  await forgetPassword(email)
    if (error) return updateNotification('error',error);
    updateNotification('success',message);
  
  }
  return (
    <FormContainer>
      <Container>
      <form onSubmit={handleSubmit} className={commonModelClasses +" w-96"}>
      <Title>please Enter your Email</Title>
                <FormInput label="Email" onChange={handlechange} value={email} placeholder="amit@gmail.com" name="email" />
                 <Submit value="Send link" />

                 <div className="flex justify-between">
                  <Coustomlink to="/auth/signin">Sign in</Coustomlink>
                  <Coustomlink to="/auth/signup">Sign up </Coustomlink>
                 </div>
        </form>

      </Container>
      </FormContainer>
    

  )
}
