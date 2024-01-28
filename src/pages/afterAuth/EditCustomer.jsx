import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'
import Form from '../../components/Form';
import LoadingSpinner  from '../../components/LoadingSpinner';
import { fetchData, handleInput} from '../../utils';

//firebase
import { collection, onSnapshot, query, updateDoc, deleteDoc, doc, where, getDocs } from 'firebase/firestore';
import db from '../../firebase';

const EditCustomer = () => {
    const [form, setForm] = useState({ firstName: '', lastName: '', city: '' });
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    const { userID } = useParams();
    const navigate = useNavigate();
    const uniqueProductIds = [];
    const namesForComp = ["firstName", "lastName", "city", 'Update Product:'];

    const getData = async () => {
        try {
            // Create queries
            const customersQuery = query(collection(db, 'Customers'));
            const productsQuery = query(collection(db, 'Products'));
            const purchasedQuery = query(collection(db, 'Purchases'));

            fetchData(setProducts, productsQuery);
            fetchData(setPurchases, purchasedQuery);
            
            // Fetch customer by id
            onSnapshot(customersQuery, (querySnapshot) => {
                querySnapshot.forEach((customer) => {
                    if (customer.id === userID) {
                        setForm((prevForm) => ({
                            ...prevForm,
                            ...customer.data(),
                        }));
                    }
                });
            });

            // Fetch customer purchased products 
            onSnapshot(purchasedQuery, (querySnapshot) => {
                const purchasedProductsArray = querySnapshot.docs.map((purchase) => purchase.data());
                const userPurchasedProducts = purchasedProductsArray.filter((purchase) => purchase.CustomerID === userID);
                setPurchasedProducts(userPurchasedProducts);
            });
            
            setLoading(false);

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);

        }
    };

    const handleDelete = async () => {
        try {
            // Delete Customer
            await deleteDoc(doc(db, 'Customers', userID));
            // Delete all Purchases that CustomerID equal to customer id
            const purchasedQuery = query(collection(db, 'Purchases'), where('CustomerID', '==', userID));
            const purchasedSnapshot = await getDocs(purchasedQuery);
            const deleteProductPromises = purchasedSnapshot.docs.map(async (doc) => {
                await deleteDoc(doc.ref);
            });
            await Promise.all(deleteProductPromises);

            navigate('/customers');
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };
    /**
     * 
     * @param {*} e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, 'Customers', userID), form);
            navigate('/customers');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    useEffect(() => {
        getData();
    }, [userID]);

    return (
        loading ? (
            <LoadingSpinner/>
        ) : (
            <div className='w-full h-screen flex flex-col justify-start items-center'>
                <Form
                    handleInput={handleInput}
                    handleSubmit={handleSubmit}
                    firstInput={form.firstName}
                    secInput={form.lastName}
                    thirdInput={form.city}
                    names={namesForComp}
                    setState={setForm}
                    state={form}
                />
                <div className=' flex justify-center items-center w-full'>
                    <button onClick={handleDelete} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold'>Delete Customer</button>
                </div>
                <div className='mt-8 flex flex-col justify-center items-center w-full'>
                    <h2 className='text-2xl font-semibold mb-4'>Purchased Products</h2>
                    <ul>
                        {[
                            ...new Set(
                                purchases
                                    .filter((customerPurchases) => customerPurchases.CustomerID === userID)
                                    .map((item) => item.ProductID)
                            )
                        ].map((productId, index) => {
                            const product = products.find((productFiltered) => productFiltered.id === productId);
                            if (product) {
                                return (
                                    <li key={product.id}>
                                        <Link to={`/edit-customer/${product.id}`}>
                                            {index + 1}. {product.Name}
                                        </Link>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </div>
            </div>
        )
    );
};

export default EditCustomer;