import React from 'react'
import { NavLink } from 'react-router-dom'
import myImage from '../assets/coding.png'
import SignUpBtn from '../Components/SignUpComponents/SingUpBtn'


function SignUpPage() {
  return (
    <>
<div className="grid grid-cols-2">
    <div className="bg-[#23155B] h-[750px]">
    <img src={myImage} alt="" className='ml-40 mt-32'/>
</div>
<div className="bg-white p-14 mr-16 mt-16 ml-16 mb-16  rounded-2xl shadow">
    <h1 className="text-[#8053FF] text-3xl text-center mb-10">Join Coders Now!</h1>
  <div className="flex flex-col-1 text-center">
         <SignUpBtn />
      </div>

              <div className="text-center text-lg">Already have an account? <NavLink to="/signin">Login</NavLink></div>
              </div>
      </div>
    </>
  )
}

export default SignUpPage