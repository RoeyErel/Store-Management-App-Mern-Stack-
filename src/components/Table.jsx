import React,{useEffect, useState} from 'react'

const Table = ({Customers, Products, Purchases, filteredProductId, filteredCustomerId}) => {
    const [filterProduct, setFilterProduct] = useState([]);
    const [filterCustomer, setFilterCustomer] = useState([]);
    const [filterPurchases, setFilterPurchases] = useState([]);
    const filterData = async () => {
        if (filteredProductId && filteredProductId != 'Select...' ) {
            setFilterProduct(
                Products.filter((product) => product.id === filteredProductId)
            );
            setFilterPurchases(Purchases.filter((purchase) => purchase.ProductID === filteredProductId));
        } else if (filteredProductId == 'Select...' || filteredProductId == null){
            setFilterProduct(Products);
            setFilterPurchases(Purchases);
        }

        if (filteredCustomerId && filteredCustomerId != 'Select...') {
            setFilterCustomer(
                Customers.filter((customer) => customer.id === filteredCustomerId)
            );
        } else if(filteredCustomerId == 'Select...' || filteredCustomerId == null){
            setFilterCustomer(Customers);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await filterData();
        };

        fetchData();
    }, [filteredProductId, filteredCustomerId, Products, Customers]);

    return (
        <table className='w-full leading-normal p-4 h-full'>
            <thead>
                <tr className='h-[70px]'>
                    <th className='px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-bold text-gray-700 uppercase tracking-wider'>Customer Name</th>
                    <th className='px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-bold text-gray-700 uppercase tracking-wider'>Products</th>
                    <th className='px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md font-bold text-gray-700 uppercase tracking-wider'>Purchases</th>
                </tr>
            </thead>
            <tbody>
                {filterCustomer.map((Customer) => (
                    <tr key={Customer.id} className='h-fit'>
                        <td className="font-semibold px-5 border-b border-gray-200 bg-white text-sm">{Customer.firstName +" "+ Customer.lastName}</td>
                        
                        <td className='h-full'>
                            <ul className='h-full font-semibold px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {filterPurchases.filter((purchaseByID) => {
                                    return(purchaseByID.CustomerID === Customer.id)
                                }).map((selectedPurchase) => {
                                    return(
                                        filterProduct.filter((listProduct) => {
                                            return(selectedPurchase.ProductID === listProduct.id)
                                        }).map((finalProduct) => {
                                            return(
                                                <li className='py-2 list-disc' key={finalProduct.id}>{finalProduct.Name}</li>
                                            )
                                        })
                                    )}
                                )}
                            </ul>
                        </td>

                        <td className='h-full'>
                            <ul className='h-full font-semibold px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                            {
                                filterPurchases.filter((purchaseByID) => {
                                    return(purchaseByID.CustomerID === Customer.id)
                                }).map((finalProduct) =>{
                                    return(
                                        <li className='py-2 list-disc' key={finalProduct.id}>{finalProduct.Date}</li>
                                    )
                                })
                            }
                            </ul>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table