import React from 'react'
import { useNavigate } from 'react-router-dom';

const Form = ({handleInput, handleSubmit, firstInput, secInput, thirdInput, names, setState, state}) => {
    const navigate = useNavigate();
    return (
        <form onSubmit={handleSubmit} className='mx-4 my-10 flex flex-col justify-center items-center'>
            <h1 className='text-2xl my-4 font-semibold'>{names[3]}</h1>
            <div className='flex flex-col'>
                <input onChange={ (e) => {handleInput(e, setState, state)} } name={names[0]} value={firstInput} className='pl-1 my-1 w-[200px] h-8 border-2 border-black/2544'  />
                <input onChange={ (e) => {handleInput(e, setState, state)} } name={names[1]}   value={secInput}   className='pl-1 my-1 w-[200px] h-8 border-2 border-black/2544'  />
                <input onChange={ (e) => {handleInput(e, setState, state)} } name={names[2]} value={thirdInput} className='pl-1 my-1 w-[200px] h-8 border-2 border-black/2544'  />
            </div>
            <button className='bg-black hover:bg-black/80 text-white mx-1 px-4 my-4 py-[1px] rounded-md font-semibold'>Submit</button>
        </form> 
    )
}

export default Form