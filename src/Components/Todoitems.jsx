import React from 'react'

function Todoitems({title,description,isCompleted,updateHandler,deleteHandler,id}) {
  return (
    <section className="todosContainer h-28 w-[700px] bg-white flex justify-between px-10 items-center shadow-md max-[720px]:w-[550px] max-[570px]:w-[450px] max-[470px]:w-[365px] max-[470px]:px-5 max-[380px]:w-[300px] max-[380px]:h-24" >
        <div>
          <h1 className='text-xl max-[470px]:text-lg font-bold  text-slate-700'>{title}</h1>
          <p className='text-md text-slate-600 max-[470px]:text-sm'>{description}</p>
        </div>
        <div className='flex gap-6 max-[470px]:gap-4 justify-center items-center  '>
          <input
            type="checkbox"
            className="h-7 w-7 max-[470px]:h-5 max-[470px]:w-5"
            onChange={()=>updateHandler(id)}
          />
          <button onClick={()=>deleteHandler(id)} className='h-10 w-32 bg-green-600 font-semibold text-white text-lg cursor-pointer max-[470px]:w-24 max-[470px]:h-9 max-[380px]:h-8 max-[380px]:w-20 '>Delete</button>
        </div>
      </section>
  )
}

export default Todoitems
