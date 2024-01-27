import React from 'react'

const Combobox = ({Data, handleCallback}) => {
    
    return (
        <select onChange={ (e) => handleCallback(e.target.value) } className='bg-[#f1f1f1] border-2 my-4 border-black text-md sm:text-md font-semibold cursor-pointer rounded-lg block py-2 pl-2 w-full text-black' name="Products" id="Products">
            <option className='font-semibold cursor-pointer sm:text-md' >Select...</option>
            {Data.map((info) => { 
                return(
                    <option key={info.id} value={info.id} className='font-semibold cursor-pointer sm:text-md'>{info.firstName? info.firstName+" "+info.lastName:info.Name}</option>
                )
            })}
        </select>
    )
}

export default Combobox