import React from 'react'
import Navbar from './components/user/Navbar'
import { Routes ,Route} from 'react-router-dom'
import Home from './components/user/Home'
import Signin from './components/auth/signin'
import Signup from './components/auth/Signup'
import EmailVerification from './components/auth/EmailVerification'
import ForgetPassword from './components/auth/ForgetPassword'
import ConfirmPassword from './components/auth/ConfirmPassword'
import NotFound from './components/NotFound'
import { useAuth } from './hooks'
import Adminnavigator from './navigator/Adminnavigator'



export default function App() {
  const {authInfo} =useAuth()
  const isAdmin =authInfo.profile?.role === 'admin'

  if(isAdmin) return  <Adminnavigator/>
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/signin" element={<Signin />} />
      <Route path="/auth/Signup" element={<Signup />} />
      <Route path="/auth/verification" element={<EmailVerification />} />
      <Route path="/auth/forget-password" element={<ForgetPassword />} />
      <Route path="/auth/reset-password" element={<ConfirmPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}
