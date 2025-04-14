import React from 'react'
import myImage from '../assets/coding.png'
import SignInBtn from '../Components/SignInComponents/SignInBtn'

function SingInPage() {
  return (
    <>
<div className="grid grid-cols-2">
    <div className="bg-[#23155B] h-[750px]">
    <img src={myImage} alt="" className='ml-40 mt-32'/>
</div>

  <div className="bg-white p-14 mr-16 mt-32 ml-16 mb-32 rounded-2xl shadow">
    <SignInBtn />
  </div>
</div>
    </>
  )
}

export default SingInPage