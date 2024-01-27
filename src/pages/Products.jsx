import React, {useState, useEffect, useCallback} from 'react'
import LoadingSpinner  from '../components/LoadingSpinner';
import Combobox from '../components/Combobox'
import {fetchData} from '../utils'
import db from '../firebase'
import { collection, query } from "firebase/firestore"; 
import { handleBuy } from '../utils';
import Table from '../components/Table'

const Products = () => {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [selected,  setSelected] = useState();
    const [loading, setLoading] = useState(true);
    const headline = {firstRow:"Products", secondRow:"", thirdRow:""};

    const getSelectedProducts = useCallback((productFromChild) => {
        setSelected(productFromChild);
    }, []);

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
            <div className='w-full h-full'>
                <div id='region-1' className="flex justify-center my-4">
                    <p className='text-xl'>Total Purchased Products: {purchases.length}</p>
                </div>

                <div id='region-2' className="flex flex-col sm:mx-4 justify-center items-center my-8">
                    <Table firstRow={products} secondRow={customers} thirdRow={purchases} filterObj isCutomerPage={false} isProductPage={true} Headline={headline}/>
                </div>
            </div>
    ))
}

export default Products
