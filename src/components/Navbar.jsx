import React from 'react'
import { Link } from 'react-router-dom'
import { BiSolidPurchaseTag, BiSolidUser, BiSolidInbox, BiHomeAlt } from "react-icons/bi";

const Navbar = () => {
    return (
        <div id='side-bar' className='w-[15%] h-screen bg-[#ebebeb]'>
            <nav className='flex w-full h-full justify-center items-start'>
                <ul className='w-full h-full flex flex-col my-4'>
                    <li className='flex justify-center items-center w-full py-1'>
                        <Link className='flex justify-start items-center w-full  hover:bg-[#fafafa]  rounded-s-lg ml-2' to="/">
                            <BiHomeAlt className='m-2 text-xl p-0'/>
                            <p className='mx-2 text-lg'>Menu</p>
                        </Link>
                    </li>
                    <li className='flex justify-center items-center w-full py-1'>
                        <Link className='flex justify-start items-center w-full  hover:bg-[#fafafa]  rounded-s-lg ml-2' to="/products">
                            <BiSolidPurchaseTag className='m-2 text-xl p-0'/>
                            <p className='m-2 text-xl'>Products</p>
                        </Link>
                    </li>
                    <li className='flex justify-center items-center w-full py-1'>
                        <Link className='flex justify-start items-center w-full hover:bg-[#fafafa] rounded-s-lg ml-2' to="/Customers">
                            <BiSolidUser className='m-2 text-xl p-0'/>
                            <p className='m-2 text-xl'>Customers</p>
                        </Link>
                    </li>
                    <li className='flex justify-center items-center w-full py-1  '>
                        <Link className='flex justify-start items-center w-full hover:bg-[#fafafa]  rounded-s-lg ml-2' to="/Purchased">
                            <BiSolidInbox className='m-2'/>
                            <p className='m-2 text-xl'>Purchases</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar