import React from 'react'
import {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Container from '../container'
import FormInput from '../form/forminput'
import Submit from '../form/submit'
import Title from '../form/title'
import Coustomlink from '../Coustomlink'
import { commonModelClasses } from '../../utils/theme'
import FormContainer from '../form/FormContainer'
import { useState } from 'react'
import { createUser } from "../../api/auth";
import { useAuth, useNotification } from '../../hooks';

const validateUserInfo = ({ name, email, password }) => {
  const isvalidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const isvalidName = /^[a-z A-Z]+$/


  if (!name.trim()) return { ok: false, error: "name is missing" }
  if (!isvalidName.test(name)) return { ok: false, error: "Invalid name!" }

  if (!email.trim()) return { ok: false, error: "Email is missing" }
  if (!isvalidEmail.test(email)) return { ok: false, error: "Email is invalid!" }

  if (!password.trim()) return { ok: false, error: "password is missing" }
  if (password.length < 8) return { ok: false, error: "password must be 8 characters long" }

  return { ok: true }

}

export default function Signup() {

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: ""
  })

     const navigate =useNavigate()
     const {authInfo}= useAuth()
     const {isLoggedin} = authInfo

     const {updateNotification} =  useNotification()

  const handlechange = ({ target }) => {
    const { value, name } = target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification('error',error);
    const response = await createUser(userInfo)
    if(response.error) return updateNotification('error',response.error)

    navigate('/auth/verification', 
    {state:{user: response.user},
    replace:true})
    console.log(response.user);
  }

  useEffect(()=>{
    // we move to move our user somewhere else
      if(isLoggedin) navigate('/')
  },[isLoggedin])

  const { name, email, password } = userInfo

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModelClasses + " w-72"}>
          <Title>Sign up</Title>
          <FormInput value={name} onChange={handlechange} label="Name" placeholder="Amit Patel" name="name" />
          <FormInput value={email} label="Email" placeholder="Email" name="email" onChange={handlechange} />
          <FormInput value={password} label="Password" placeholder="*******" name="password" type="password" onChange={handlechange} />
          <Submit value="Sign up" />

          <div className="flex justify-between">
            <Coustomlink to="/auth/forget-password">Forget password</Coustomlink>
            <Coustomlink to="/auth/">Sign in </Coustomlink>
          </div>
        </form>
      </Container>
    </FormContainer>
  )
}


