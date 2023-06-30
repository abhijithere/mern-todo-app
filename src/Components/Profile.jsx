import React, { useContext } from 'react'
import { Context } from '../main'
import { Navigate } from 'react-router-dom'
import Navbar from './Navbar'


function Profile() {

  const {user} =useContext(Context)
  const {isAuthenticated} =useContext(Context)
  if(!isAuthenticated) return <Navigate to={"/login"}/>
  return (
    <>
    <Navbar/>
    <div className=' text-black mt-44 max-[370px]:mt-52 flex flex-col justify-center items-center'>
    <img src='./img/man.png' className='h-72 max-[370px]:h-60'></img>
  
    <h1 className='text-5xl text-green-600 mt-5'>{user?.name}</h1>
    <p className='text-xl text-gray-500 mt-4'>{user?.email}</p>
  </div>
  </>
  );
};

export default Profile
