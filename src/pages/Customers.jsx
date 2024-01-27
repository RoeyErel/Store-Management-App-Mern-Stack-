import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import LoadingSpinner  from '../components/LoadingSpinner';
import {fetchData} from '../utils'

import db from '../firebase';
import { collection, query } from "firebase/firestore";

const Customers = () => {
    const [purchases, setPurchases] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const headline = {firstRow:"Customers", secondRow:"Products", thirdRow:"Purchases History"};

    const getData = async () => {
        try {
            const customersQuery = query(collection(db, 'Customers'));
            const productsQuery = query(collection(db, 'Products'));
            const purchasesQuery = query(collection(db, 'Purchases'));

            fetchData(setCustomers, customersQuery);
            fetchData(setProducts, productsQuery);
            fetchData(setPurchases, purchasesQuery);

            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(true);
        }
    }

    useEffect(() => {
        getData()
    }, []);

    return (
        loading ? (
            <LoadingSpinner/>
        ) : (
            <div id='main-container' className='w-full h-screen flex'>
                <Table firstRow={customers} secondRow={products} thirdRow={purchases} filterObj={{pid:null, cid:null, date:null}} isCutomerPage={true} Headline={headline}/>
            </div>
            
        )
    );
}

export default Customers;