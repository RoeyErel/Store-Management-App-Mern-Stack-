import React from 'react'
import { BeatLoader } from 'react-spinners';

const LoadingSpinner = () => {
    return (
        <div className='w-full flex justify-center items-center'>
            <BeatLoader color='#111' />
        </div>
    )
}

export default LoadingSpinner