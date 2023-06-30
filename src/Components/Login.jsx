import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Navbar from './Navbar';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {isAuthenticated,setIsAuthenticated,loading,setloading} =useContext(Context)
  const submithandeller=async (e)=>{
    setloading(true)
    e.preventDefault();
 try {
     const {data} = await axios.post(`${server}/users/login`,{
         email,
         password,
        },{
         header:{
             "Content-Type": "application/json",
         },
         withCredentials:true,
        })
        toast.success(data.message);
        setIsAuthenticated(true)
        setloading(false)

 
 } catch (error) {
     toast.error(error.response.data.message);
     console.log("error")
     setIsAuthenticated(false)
     setloading(false)
 }
 };

  if(isAuthenticated) return <Navigate to={"/"}/>

  return (
   <>
     <div className="login flex flex-col   justify-center items-center mt-28">
      <section className='h-[500px] w-[450px]  max-[475px]:w-[400px] max-[425px]:w-[360px] max-[425px]:h-[470px] max-[380px]:w-[330px] max-[350px]:w-[280px] gap-6 shadow-lg bg-white flex flex-col rounded-md  justify-center items-center'>
        <h1 className='text-4xl mb-8 text-green-600 font-bold max-[380px]:text-3xl'>Login</h1>
        <form  className='flex flex-col gap-2 justify-center items-center' onSubmit={submithandeller}>
          <input
            type="email"
            placeholder="Email"
            className='h-12 w-[350px] max-[425px]:w-[300px] max-[380px]:w-[280px] max-[350px]:w-[230px]  p-5 text-xl rounded-sm   outline-green-200 border-[2px]  caret-green-500'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            required
            placeholder="Password"
            className='h-12 w-[350px] max-[425px]:w-[300px] max-[380px]:w-[280px] max-[350px]:w-[230px] p-5 text-xl rounded-sm  outline-green-200 border-[2px] mt-2  caret-green-500'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='flex  gap-24 max-[425px]:gap-12 max-[380px]:gap-10 max-[350px]:gap-2 mt-5 justify-center items-center'>
            <div className='flex justify-center items-center gap-2 max-[425px]:gap-1'>
              <input type='checkbox' className='h-4 w-4 max-[380px]:h-3 max-[380px]:w-3'/>
              <p className=' text-gray-500 max-[380px]:text-sm'>Remember me</p>
            </div>
            <div><p className='text-md text-green-600 cursor-pointer max-[380px]:text-sm'>forgot password?</p></div>
          </div>
          <button  type="submit" disabled={loading}
          className='h-12 w-52 rounded-full  bg-green-600 text-white text-xl mt-10' >
            Login
          </button>
          <div className='flex mt-6 gap-2 justify-center items-center max-[380px]:text-sm'>
          <p className='text-md text-gray-600'>Don't have an account?</p>
          <Link to="/register"
           className='  text-green-500 flex justify-center items-center text-lg'>Register here</Link>
           </div>
        </form>
      </section>
    </div>

   </>
  )
}

export default Login
