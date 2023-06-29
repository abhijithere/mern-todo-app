import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {isAuthenticated,setIsAuthenticated,loading,setloading} =useContext(Context)


const submithandeller=async (e)=>{
  setloading(true)
   e.preventDefault();
try {
    const {data} = await axios.post(`${server}/users/new`,{
        name,
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
    <div className="login flex flex-col  justify-center items-center mt-28 max-[475px]:mt-40">
      <section className='h-[500px] w-[450px] max-[475px]:w-[400px] max-[425px]:w-[360px] max-[425px]:h-[470px] max-[380px]:w-[300px] gap-2 shadow-lg bg-white flex flex-col rounded-md  justify-center items-center'>
      <h1 className='text-4xl mb-8 text-green-600 font-bold mt-1 max-[380px]:text-3xl'>Signup</h1>
        <form  className='flex flex-col gap-5 justify-center items-center' onSubmit={submithandeller}> 
        <input
            type="text"
            placeholder="Name"
            className='h-12 w-[350px] max-[425px]:w-[300px] max-[380px]:w-[200px]  p-5 text-xl rounded-sm   outline-green-200 border-[2px]  caret-green-500'
            required
            value={name}
             onChange={(e) => setName(e.target.value)}

          />
          <input
            type="email"
            placeholder="Email"
            className='h-12 w-[350px] max-[425px]:w-[300px] max-[380px]:w-[200px]  p-5 text-xl rounded-sm  outline-green-200 border-[2px] mt-2  caret-green-500'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            required
            placeholder="Password"
            className='h-12 w-[350px] max-[425px]:w-[300px] max-[380px]:w-[200px]  p-5 text-xl rounded-sm  outline-green-200 border-[2px] mt-2  caret-green-500'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}
            className='h-12 w-52 rounded-full  bg-green-600 text-white text-xl mt-5' >Sign Up</button>
          <div className='flex mt-4 gap-2 justify-center items-center max-[380px]:text-sm'>
          <p className='text-md text-gray-600'>Already have an account?</p>
          <Link to="/login" className=' text-green-500 flex justify-center items-center text-lg' >Log In</Link>
          </div>
        </form>
      </section>
    </div>
    

  )
}

export default Register
