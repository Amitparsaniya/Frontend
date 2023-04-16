import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'; 
import { resendEmailverificationToken, verifyUserEmail } from '../../api/auth';
import { useAuth, useNotification } from '../../hooks';
import { commonModelClasses } from '../../utils/theme'
import Container from '../container'
import FormContainer from '../form/FormContainer'
import Submit from '../form/submit'
import Title from '../form/title'

const OTP_LENGTH = 6
// otp length used for numer of input field it will be custmized....

const isValidOTP =(otp)=>{
    let valid =false
    for(let val of otp){
      valid =!isNaN(parseInt(val))
      if(!valid) break
    }
    return valid
}

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''))
  const [activeOtpindex, setActiveOtpindex] = useState(0)
  const inputRef = useRef()

 const {isAuth,authInfo} =useAuth()
 const {isLoggedin, profile} = authInfo
 const isVerified = profile?.isVerified


      const {state}= useLocation()
      const user =state?.user

      const navigate = useNavigate()
      const { updateNotification } =useNotification()

  const focusNextInputField = (index)=>{
    setActiveOtpindex(index+1)
  }
  const focusPrevInputField = (index)=>{
    let nextIndex;
    const diff = index-1
    nextIndex = diff !==0 ? diff:0
    setActiveOtpindex(nextIndex)
  }
  const handleOtpchange = ({ target }, index) => {
    const { value } = target
    const newotp = [...otp]
    newotp[index] = value.substring(value.length - 1, value.length)
    if(!value)focusPrevInputField(index)
    else  focusNextInputField (index)
    setOtp([...newotp])
  }

  const  handleOTPResend= async()=>{
      const {error,message}=await resendEmailverificationToken(user.id)
      if(error) return  updateNotification('error',error)
      updateNotification('success',message)


  }
// e.key  ----it gives the value of key which key we press
  const  handlekeyDown  =({ key }, index)=>{
    if (key=== "Backspace"){
      focusPrevInputField(index)
    }
  }
  const  handleSubmit = async(e)=>{
      e.preventDefault()
      if(!isValidOTP(otp)) return updateNotification('error' ,'Invalid OTP');

       const {error,message, user:useresponse} =await verifyUserEmail({ 
        otp:otp.join(""),
         userId: user.id
        })
        if(error) return updateNotification('error',error)
       
        updateNotification('success', message)

       localStorage.setItem('auth-token',useresponse.token)
       isAuth()
  }
  useEffect(() => {
    inputRef.current?.focus()
    // console.log(inputRef);
  }, [activeOtpindex])

  useEffect(()=>{
      if(!user) navigate('/not-found')
      if(isLoggedin && isVerified) navigate('/')
        // eslint-disable-next-line; react-hooks/exhaustive-deps
  }, [user,isLoggedin,isVerified])


  return (
    <FormContainer>
      <Container>
        <form onSubmit={  handleSubmit} className={ commonModelClasses }>
          <div>
            <Title>please Enter the OTP to verify your account </Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">OTP has been sent to your email</p>
          </div>
          <div className="flex justify-center items-center space-x-4">
                 {/* above div use for seprate inuput box put map method inside above div */}
            {otp.map((_, index) => {
              return <input
                ref={activeOtpindex === index ? inputRef : null}
                key={index}
                type="number"
                value={otp[index] || ""}
                onChange={(e) => handleOtpchange(e, index)}
                onKeyDown ={(e)=> handlekeyDown(e,index)}
                className="w-12 h-12 border-2 rounded dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary bg-transparent outline-none text-center  dark:text-white text-light-subtle font-semibold text-xl spin-button-none " />
            })}
          </div>
          <div>
          <Submit value="Verify Account" />
          <button type='button'onClick={handleOTPResend} className='dark:text-white text-blue-500 font-semibold hover:underline mt-2'>I don't have OTP</button>
          </div>


        </form>

      </Container>
    </FormContainer>
  )
}



