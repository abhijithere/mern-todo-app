import React, { useContext, useState } from 'react'
import '../style/style.css'
import { Link, NavLink, Navigate } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios'
import { toast } from 'react-hot-toast'
function Navbar() {

  const {isAuthenticated,setIsAuthenticated,loading,setloading} =useContext(Context)

  const [icon,seticon]= useState(false)

  const logouthandeller=async (e)=>{
    setloading(true);
    
 try {
     const {data} = await axios.get(`${server}/users/logout`,{
         withCredentials:true,
        })
        toast.success("logged out successfully");
        setIsAuthenticated(false)
        setloading(false)
 
 } catch (error) {
    //  toast.error(error.response.data.message);
     console.log("error")
     setIsAuthenticated(true)
     setloading(false)
 }
 };
console.log(icon)
  return (
    <div className='h-20 bg-slate-900 flex text-white  justify-between items-center fixed w-full top-0 left-0'>
        <div className='left px-8'>
            <h1 className='text-3xl font-semibold'>Todo<span className='font-bold text-green-600 text-4xl'>App</span></h1>
        </div>
        <div className={`right flex max-[600px]: max-[600px]:absolute max-[600px]:pb-7 max-[600px]:bg-slate-900 max-[600px]:top-20 max-[600px]:right-0  transition-all duration-500 ${icon?' max-[600px]:translate-x-1':'max-[600px]:translate-x-72'}`} >
            <ul className='flex gap-20 max-[700px]:gap-8 px-14 text-2xl cursor-pointer max-[600px]:flex-col ' >
                <NavLink to={"/"}  className='py-[22px] px-3'>Home</NavLink>
                <NavLink to={"/profile"}  className=' py-[22px] px-3'>Profile</NavLink>
                {/* {
                  isAuthenticated?<button disabled={loading} className='btn text white text-xl' onClick={logouthandeller} >Logout</button>:<NavLink to={"/login"}  className=' py-[14px] px-3'>Login</NavLink>
                } */}
                <button disabled={loading} className='btn py-[22px] text white text-2xl' onClick={logouthandeller} >Logout</button>
            </ul>
        </div>
        <img src='./img/menu.png' className='h-8 px-8 flex min-[600px]:hidden' onClick={()=>seticon(!icon)}></img>
    </div>
  )
}

export default Navbar
