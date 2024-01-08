import React, {useState, useEffect} from 'react'
import Combobox from '../components/Combobox'
import db from '../firebase'
import { addDoc, collection, onSnapshot, query } from "firebase/firestore"; 

const Products = () => {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [selected,  setSelected] = useState("");
    const [style, setStyle] = useState({id:-1, product:"", combo:false});
    
    const getSelected = (product) => {
        setSelected(product);
    };
    
    const handleSave  = async (id) => {
        let newDate = new Date()
        const obj = {CustomerID:id, Date:newDate.getDate()+"/"+(newDate.getMonth() + 1)+"/"+newDate.getFullYear(), ProductID:selected }
        if(selected.length > 1){
            await  addDoc(collection(db, 'Purchases'),obj);
        }
    };

    const getProduct = async () => {
        const q = query(collection(db, 'Products'));
        onSnapshot(q, (querySnapshot) => {
            setProducts(
                querySnapshot.docs.map(doc => {
                    return{
                        id: doc.id,
                        ...doc.data()
                    }
                })
            )
        })
    };
    
    const getCustomers = async () => {
        const q = query(collection(db, 'Customers'));
        onSnapshot(q, (querySnapshot) => {
            setCustomers(
                querySnapshot.docs.map(doc => {
                    return{
                        id: doc.id,
                        ...doc.data()
                    }
                })
            )
        })
    };
    
    const getPurchases = async () => {
        const q = query(collection(db, 'Purchases'));
        onSnapshot(q, (querySnapshot) => {
            setPurchases(
                querySnapshot.docs.map(doc => {
                    return{
                        id: doc.id,
                        ...doc.data()
                    }
                })
            )
        })
    };

    useEffect(() => {
        getCustomers();
        getProduct();
        getPurchases();
    },[]);

    return (
        <div className='w-[85%]'>
            <div id='region-1' className="flex justify-center my-4">
                <p className='text-xl'>Total Purchased Products: {purchases.length}</p>
            </div>
            <div id='region-2' className="flex flex-col mx-14 sm:mx-0 justify-center items-center my-8">
                {products.map((product) => (
                    <div id='product' key={product.id} className="w-full border-[1px] border-white flex flex-col justify-center items-center px-4 sm:px-1">
                        <div id='product-Area' className='w-full flex flex-row justify-center items-center px-4 sm:px-1 h-[350px]'>
                            <div id='product-info' className='w-[50%] h-full'>
                                <h2 className='text-4xl py-6 px-4 sm:px-1 sm:text-2xl'>
                                    <a href={`/edit-product/${product.id}`}>{product.Name}</a>
                                </h2>
                                <p className='text-xl sm:text-[15px] py-1 sm:px-1 px-4'>Price: ${product.Price}</p>
                                <p className='text-xl sm:text-[15px] py-1 sm:px-1 px-4'>Quantity: {product.Quantity}</p>
                            </div>
                            
                            <div id='customer-list' className="flex flex-col w-[50%] h-full">
                                <div className='w-full h-[10%]'>
                                    <h1 className='font-semibold pt-1 text-xl sm:text-sm w-full flex justify-center items-center'>Purchase History:</h1>
                                </div>
                                <div className='overflow-y-auto h-[90%] sm:h-[70%] w-full'>
                                    {purchases.filter((purchase) => {
                                        return(product.id == purchase.ProductID)
                                    }).map((buyProduct) => (
                                        customers.filter((customer)=> {return(buyProduct.CustomerID === customer.id)}).map((finalCustomer) => {return(
                                            <div key={finalCustomer.id} className="customer-item px-2 sm:px-0 w-full border-2 border-white/30 my-2">
                                                <div id='region2-customer-name' className='flex justify-center items-center w-full py-2'>
                                                    <p className='flex w-full sm:w-[60%] font-thin text-xl sm:text-sm pr-2 sm:pr-0 '>Name: </p>
                                                    <a className='flex w-full sm:w-[40%] font-thin text-xl sm:text-sm h-full' href={`/edit-customer/${finalCustomer.id}`}>{" "+finalCustomer.firstName +" "+ finalCustomer.lastName}</a>
                                                </div>
                                                <div id='region2-customer-purchased' className='flex justify-center items-center w-full py-2'>
                                                    <p className='flex w-full sm:w-[65%] font-thin text-xl sm:text-sm pr-1'>Purchased Date: </p>
                                                    <p className='flex w-full sm:w-[35%] font-thin text-xl sm:text-sm pr-1 '>{buyProduct.Date}</p>
                                                </div>
                                                        <div className='py-4 w-full flex justify-center items-center'>
                                                            <button onClick={()=> setStyle({id:finalCustomer.id, product:product.Name, combo:!style.combo})} className='bg-slate-600 px-2 py-1 rounded-md text-white hover:bg-slate-500'>Add</button>
                                                        </div>
                                                    {
                                                        (finalCustomer.id == style.id && style.combo && product.Name == style.product) &&
                                                        <div className='h-full w-full flex flex-col justify-center items-center'>
                                                            <Combobox Data={products} callback={getSelected}/>
                                                            <button onClick={() => handleSave(finalCustomer.id)} className='my-3 bg-slate-600 px-2 py-1 rounded-md text-white hover:bg-slate-500'>Save</button>
                                                        </div>
                                                    }
                                            </div>
                                        )})
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products
