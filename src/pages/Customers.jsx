import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import db from '../firebase';
import { collection, onSnapshot, query } from "firebase/firestore";
import {BeatLoader} from 'react-spinners'

const Customers = () => {
    const [purchases, setPurchases] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const customersQuery = query(collection(db, 'Customers'));
            const productsQuery = query(collection(db, 'Products'));
            const purchasesQuery = query(collection(db, 'Purchases'));

            onSnapshot(customersQuery, (querySnapshot) => {
                setCustomers(
                    querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                );
            });

            onSnapshot(productsQuery, (querySnapshot) => {
                setProducts(
                    querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                );
            });

            onSnapshot(purchasesQuery, (querySnapshot) => {
                setPurchases(
                    querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                );
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div id='main-container' className='w-full h-screen'>
            {loading ? (
                <div className='flex justify-center items-center'>
                    <BeatLoader color="#111" />
                </div>
            ) : (
                <Table Customers={customers} Products={products} Purchases={purchases} filteredProduct={null} filteredCustomer={null} />
            )}
        </div>
    );
}

export default Customers;