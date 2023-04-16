import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, useNotification } from '../../hooks'
import  {commonModelClasses}  from '../../utils/theme'
import Container from '../container'
import Coustomlink from '../Coustomlink'
import FormContainer from '../form/FormContainer'
import FormInput from '../form/forminput'
import Submit from '../form/submit'
import Title from '../form/title'


const validateUserInfo = ({  email, password }) => {
  const isvalidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
 

  if (!email.trim()) return { ok: false, error: "Email is missing" }
  if (!isvalidEmail.test(email)) return { ok: false, error: "Email is invalid!" }

  if (!password.trim()) return { ok: false, error: "password is missing" }
  if (password.length < 8) return { ok: false, error: "password must be 8 characters long" }

  return { ok: true }

}

export default function Signin() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })
    // const navigate=useNavigate()
    
  const {updateNotification} =  useNotification()
    const {handlelogin,authInfo}=useAuth()
    const {isPending,isLoggedin}= authInfo

    
  const handlechange = ({ target }) => {
    const { value, name } = target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { ok, error } = validateUserInfo(userInfo);
    if (!ok) return updateNotification('error',error);
    handlelogin(email,password)
  }


  // useEffect(()=>{
  //   // we want to move to move our user somewhere else
  //     if(isLoggedin) navigate('/')
  // },[isLoggedin])

  const {email,password}= userInfo


  return (
    <FormContainer>
        <Container>
            <form onSubmit={handleSubmit} className={commonModelClasses + " w-72"}>
                <Title>Sign in</Title>
                <FormInput label="Email"   value={email}  onChange={handlechange}placeholder="Email" name="email" />
                 <FormInput label="Password"  value={password}  onChange={handlechange} placeholder="*******" type='password' name="password" /> 
                 <Submit value="Sign in" busy={isPending} />

                 <div className="flex justify-between">
                  <Coustomlink to="/auth/forget-password">Forget password</Coustomlink>
                  <Coustomlink to="/auth/signup">Sign up </Coustomlink>
                 </div> 
            </form>
        </Container>
    </FormContainer>
  )
}
