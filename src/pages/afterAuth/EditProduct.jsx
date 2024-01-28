import React, {useState, useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import LoadingSpinner  from '../../components/LoadingSpinner';
import Form from '../../components/Form';
import { fetchData, handleInput} from '../../utils';

//firebase
import { collection, onSnapshot, query, updateDoc, deleteDoc, doc, where, getDocs } from 'firebase/firestore';
import db from '../../firebase';


const EditProduct = () => {
    const [form, setForm] = useState({Name:"", Price:"", Quantity:""});
    const [customers, setCustomers] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const { productID } = useParams();
    const namesForComp = ["Name", "Price", "Quantity", 'Update Product:'];
    const navigate = useNavigate();

    const getData = async () => {
        try{
            // Create queries
            const customersQuery = query(collection(db, 'Customers'));
            const productQuery = query(collection(db, 'Products'));
            const purchasesQuery = query(collection(db, 'Purchases'));

            // Fetch Data with utils function
            fetchData(setCustomers, customersQuery);
            fetchData(setPurchases, purchasesQuery);

            // Fetch product data by PID
            onSnapshot(productQuery, (querySnapshot) => {
                querySnapshot.forEach((customer) => {
                    if (customer.id === productID) {
                        setForm((prevForm) => ({
                            ...prevForm,
                            ...customer.data(),
                        }));
                    }
                });
            });

            setLoading(false);

        }catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);

        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleDelete = async () => {
        try {
            // Delete Product
            await deleteDoc(doc(db, 'Products', productID));
            
            // Delete all Purchases that ProductID equal to product id
            const purchasedQuery = query(collection(db, 'Purchases'), where('ProductID', '==', productID));
            const purchasedSnapshot = await getDocs(purchasedQuery);
            const deleteProductPromises = purchasedSnapshot.docs.map(async (doc) => {
                await deleteDoc(doc.ref);
            });
            await Promise.all(deleteProductPromises);

            navigate('/products');
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, 'Products', productID), form);
            navigate('/products');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    
    return (
        loading ? (
            <LoadingSpinner/>
        ) : (
            <div className='w-full h-screen flex flex-col justify-start items-center'>
                <Form 
                    handleInput={handleInput} 
                    handleSubmit={handleSubmit} 
                    firstInput={form.Name}
                    secInput={form.Price}
                    thirdInput={form.Quantity}
                    names={namesForComp}
                    setState={setForm}
                    state={form}
                />
                <button onClick={(e) => handleDelete(e, '/products', productID)} className='bg-red-600 hover:bg-red-500 text-white mx-1 px-4 py-[1px] rounded-md font-semibold'>Delet Product</button>

                <div className='my-14'>
                    <h1 className='text-2xl font-semibold my-4'>Customers:</h1>
                    <ul className='my-2'>
                        {
                            [...new Set(
                                purchases
                                    .filter((productPurchases) => productPurchases.ProductID === productID)
                                    .map((item) => item.CustomerID)
                            )].map((customerId, index) => {
                                const customer = customers.find((customerFiltered) => customerFiltered.id === customerId);
                                if (customer) {
                                    return (
                                        <li key={customer.id}>
                                            <Link to={`/edit-customer/${customer.id}`}>
                                                {index + 1}. {customer.firstName} {customer.lastName}
                                            </Link>
                                        </li>
                                    );
                                }
                                return null;
                            })
                        }
                    </ul>


                </div>
            </div>
        )
    )
 }
 
 export default EditProduct