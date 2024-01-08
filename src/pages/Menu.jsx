import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    return (
        <div className='w-full h-screen'>
            <nav className='flex w-full justify-center items-start my-6'>
                <ul>
                    <li className='py-2 flex justify-center items-center px-4'>
                        <Link className='font-bold text-2xl' to="/products">Products</Link>
                    </li>
                    <li className='py-2 flex justify-center items-center px-4'>
                        <Link className='font-bold text-2xl' to="/customers">Customers</Link>
                    </li>
                    <li className='py-2 flex justify-center items-center px-4'>
                        <Link className='font-bold text-2xl' to="/Purchased">Purchases</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Menu