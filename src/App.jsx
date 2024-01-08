import React from 'react'
import { Route, Routes} from "react-router-dom";

import Menu from './pages/Menu';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Purchases from './pages/Purchased';
import Header from './components/Header';
import Navbar from './components/Navbar';


function App() {
    return (
        <div className='w-full h-full flex flex-col bg-[#f1f1f1]'>
            <Header/>
            <div className='w-full h-full flex flex-row'>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Menu/>} />
                    <Route path='/Products' element={<Products/>} />
                    <Route path='/Customers' element={<Customers/>} />
                    <Route path='/Purchased' element={<Purchases/>} />
                </Routes>
            </div>
        </div>
    )
}

export default App
