import React,{useState, useEffect, useCallback} from 'react'
import Combobox from '../components/Combobox';
import db from '../firebase'
import { collection, onSnapshot, query } from "firebase/firestore";
import Table from '../components/Table';
import {BeatLoader} from 'react-spinners'

const Purchased = () => {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [isTableVisible, setTableVisibility] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const fetchData = async () => {
        try{
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
                setLoading(false);
            });

            onSnapshot(productsQuery, (querySnapshot) => {
                setProducts(
                    querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                );
                setLoading(false);
            });

            onSnapshot(purchasesQuery, (querySnapshot) => {
                setPurchases(
                    querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                );
                setLoading(false);
            });
        }catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const getSelectedProducts = useCallback((productFromChild) => {
        setSelectedProducts(productFromChild);
    }, []);

    const getSelectedCustomers = useCallback((customerFromChild) => {
        setSelectedCustomers(customerFromChild);
    }, []);

    return (
        <div className='flex flex-col justify-start items-center w-full'>
            <div className='w-[50%] my-12'>
                {loading ? (
                    <div className='flex justify-center items-center'>
                        <BeatLoader color="#111" />
                    </div>
                ) : (
                    <div>
                        <Combobox Data={products} handleCallback={getSelectedProducts}/>
                        <Combobox Data={customers} handleCallback={getSelectedCustomers}/>
                        <div className='flex justify-center items-center my-4'>
                            <button
                                onClick={() => setTableVisibility(true)}
                                className='my-3 bg-slate-600 px-2 py-1 rounded-md text-white hover:bg-slate-500'
                            >
                                Search
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {isTableVisible && !loading && (
                <div className='w-full mx-2'>
                    <Table Customers={customers} Products={products} Purchases={purchases} filteredProductId={selectedProducts} filteredCustomerId={selectedCustomers}/>
                </div>
            )}
        </div>
    );
};


export default Purchased