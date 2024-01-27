import React from 'react'
import { Route, Routes} from "react-router-dom";

import Header from './components/Header';
import Navbar from './components/Navbar';

import Menu from './pages/Menu';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Purchases from './pages/Purchased';


import EditProduct from './pages/afterAuth/EditProduct';
import EditCustomers from './pages/afterAuth/EditCustomer'

function App() {
    return (
        <div className='w-full h-screen flex flex-col bg-[#f1f1f1]'>
            <Header/>
            <div className='w-full h-full flex flex-row'>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Menu/>} />
                    <Route path='/products' element={<Products/>} />
                    <Route path='/customers' element={<Customers/>} />
                    <Route path='/purchased' element={<Purchases/>} />
                    {/* Login */}
                    <Route path='/edit-customer/:userID' element={<EditCustomers/>} />
                    <Route path='/edit-product/:productID' element={<EditProduct/>} />
                </Routes>
            </div>
        </div>
    )
}

export default App
