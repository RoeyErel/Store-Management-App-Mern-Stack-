import React,{useState, useEffect, useCallback} from 'react'
import Combobox from '../components/Combobox';
import Table from '../components/Table';
import LoadingSpinner  from '../components/LoadingSpinner';

import { fetchData } from '../utils'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import db from '../firebase'
import { collection, query } from "firebase/firestore";


const Purchased = () => {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [purchases, setPurchases] = useState([]);

    const [filter, setFilter] = useState({pid:null, cid:null, date:null})

    const [selectedProducts, setSelectedProducts] = useState(null);
    const [selectedCustomers, setSelectedCustomers] = useState(null);
    const [startDate, setStartDate] = useState(null);

    const [isTableVisible, setTableVisibility] = useState(false);
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
        getData();
    }, []);

    const getSelectedProducts = useCallback((productFromChild) => {
        if(productFromChild === "Select..."){
            setSelectedProducts(null);
        }else{
            setSelectedProducts(productFromChild);
        }
        
    }, []);

    const getSelectedCustomers = useCallback((customerFromChild) => {
        if(customerFromChild === "Select..."){
            setSelectedCustomers(null);
        }else{
            setSelectedCustomers(customerFromChild);
        }
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = startDate ? startDate.toLocaleDateString('en-GB') : null;

        setFilter({
            pid: selectedProducts,
            cid: selectedCustomers,
            date: formattedDate,
        });
        setTableVisibility(true);
    };
    
    return (
        loading ? (
            <LoadingSpinner/>
        ) : (
            <div className='flex flex-col justify-start items-center w-full h-screen'>
                <div className='w-[50%] sm:w-[75%] my-12'>
                    <form onSubmit={handleSubmit}>
                        <Combobox Data={products} handleCallback={getSelectedProducts}/>
                        <Combobox Data={customers} handleCallback={getSelectedCustomers}/>
                        <div className='flex justify-center items-center'>
                            <p className='text-[20px] pr-2'>Date:</p>
                            <DatePicker className="border border-black rounded-md p-2" dateFormat="dd/MM/yyyy" showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>

                        <div className='flex justify-center items-center my-4'>
                            <button className='my-3 bg-slate-600 px-2 py-1 rounded-md text-white hover:bg-slate-500'>Search</button>
                        </div>
                    </form>
                </div>
                {isTableVisible && !loading && (
                    <div className='w-full mx-2'>
                        <Table firstRow={customers} secondRow={products} thirdRow={purchases} filterObj={filter} Headline={headline}/>
                    </div>
                )}
            </div>
        )
    );
};


export default Purchased