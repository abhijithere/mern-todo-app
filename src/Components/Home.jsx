import React, {  useContext, useEffect, useState } from 'react'
import '../style/style.css'
import axios from 'axios';
import { Context, server } from '../main';
import { toast } from 'react-hot-toast';
import Todoitems from './Todoitems';
import { Navigate } from 'react-router-dom';
import Navbar from './Navbar';



function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [Tasks, setTasks] = useState([]);
  const {isAuthenticated,setIsAuthenticated} =useContext(Context)

const updateHandler= async(id)=>{
  try {
   const {data}= await axios.put(`${server}/task/${id}`,{},{
      withCredentials:true, 
    })

    toast.success(data.message)
    
  } catch (error) {
    toast.error(error.response.data.message)
  }
}

const deleteHandler=async (id)=>{
  try {
    const {data}= await axios.delete(`${server}/task/${id}`,{
       withCredentials:true, 
     })
 
     toast.success(data.message)
     
   } catch (error) {
     toast.error(error.response.data.message)
   }
}

  const submitHandeller = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const { data } = await axios.post(`${server}/task/new`, {
        title,
        description,
      },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setTitle("");
        setDescription("");
        toast.success(data.message)
        setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }
  }
  useEffect(() => {
    axios.get(`${server}/task/my`,{
      withCredentials:true,
    }).then((res)=>{
      setTasks(res.data.task)
    }).catch(e=>{
      console.log(e.response.data.message)
    })
  }, [Tasks]);


  if(!isAuthenticated) return <Navigate to={"/login"}/>
  return (
    <>
    <Navbar/>
    <div className="container flex flex-col justify-center items-center  mt-40 gap-14">
      <div className="login h-72 w-[700px] bg-white flex justify-center items-center flex-col gap-5 shadow-lg   max-[720px]:w-[550px] max-[570px]:w-[450px] max-[470px]:w-[365px] max-[470px]:h-64 max-[380px]:w-[300px]">
        <section >
          <form className='flex flex-col justify-center items-center gap-8 max-[380px]:gap-6' onSubmit={submitHandeller}>
            <input
              type="text"
              placeholder="Title"
              required
              className='h-12 w-[500px] max-[720px]:w-[450px] max-[570px]:w-[350px] max-[470px]:w-[310px] caret-green-500 border-gray-200  outline-none  border-[2px] rounded-sm text-xl px-6 max-[380px]:w-[250px]'
              value={title}
              onChange={(e) => setTitle(e.target.value)}

            />
            <input
              type="text"
              placeholder="Description"
              required
              className='h-12 w-[500px] max-[720px]:w-[450px] caret-green-500 border-gray-200  outline-none  border-[2px] rounded-sm text-xl px-6 max-[570px]:w-[350px] max-[470px]:w-[310px] max-[380px]:w-[250px]'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" disabled={loading} className='h-12 w-60  bg-green-600 text-white text-lg font-semibold cursor-pointer max-[470px]:w-32 max-[380px]:w-28 max-[380px]:w-[250px]:h-10'  >
              Add Task
            </button>
          </form>
        </section>
      </div>

<div className='flex flex-col justify-center items-center mt-5 gap-6 mb-10'>
     {
      Tasks.map((i)=>{
         return  <Todoitems title={i.title} 
           description={i.description}
           isCompleted={i.isCompleted}
           updateHandler={updateHandler}
           deleteHandler={deleteHandler}
           id={i._id}
           key={i._id}/>
      })
     }
     </div>

    </div>
    </>
  )
}

export default Home
