import React from 'react'
import { Link } from 'react-router-dom'
import { BiSolidPurchaseTag, BiSolidUser, BiSolidInbox, BiHomeAlt } from "react-icons/bi";

const Navbar = () => {
    return (
        <div id='side-bar' className='w-[250px] sm:w-[80px] bg-[#ebebeb]'>
            <nav className='flex w-full justify-center items-start'>
                <ul className='w-full h-full flex flex-col my-4'>
                    <li className='flex justify-center items-center w-full py-1'>
                        <Link className='flex justify-start items-center w-full  hover:bg-[#fafafa]  rounded-s-lg ml-2' to="/">
                            <BiHomeAlt className='m-2 text-xl p-0 sm:text-2xl'/>
                            <p className='mx-2 text-lg sm:hidden'>Menu</p>
                        </Link>
                    </li>
                    <li className='flex justify-center items-center w-full py-1'>
                        <Link className='flex justify-start items-center w-full  hover:bg-[#fafafa]  rounded-s-lg ml-2' to="/products">
                            <BiSolidPurchaseTag className='m-2 text-xl p-0 sm:text-2xl'/>
                            <p className='m-2 text-xl sm:hidden'>Products</p>
                        </Link>
                    </li>
                    <li className='flex justify-center items-center w-full py-1'>
                        <Link className='flex justify-start items-center w-full hover:bg-[#fafafa] rounded-s-lg ml-2' to="/Customers">
                            <BiSolidUser className='m-2 text-xl p-0 sm:text-2xl'/>
                            <p className='m-2 text-xl sm:hidden'>Customers</p>
                        </Link>
                    </li>
                    <li className='flex justify-center items-center w-full py-1  '>
                        <Link className='flex justify-start items-center w-full hover:bg-[#fafafa]  rounded-s-lg ml-2' to="/Purchased">
                            <BiSolidInbox className='m-2 text-xl p-0 sm:text-2xl '/>
                            <p className='m-2 text-xl sm:hidden'>Purchases</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar