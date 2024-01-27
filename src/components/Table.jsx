import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Combobox from './Combobox';
import { handleBuy } from '../utils';
const stylerClass = 'px-2 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-md sm:text-[12px] font-bold text-gray-700 uppercase tracking-wider';

const Table = ({ firstRow, secondRow, thirdRow, filterObj, isCutomerPage, isProductPage, Headline }) => {
	const [filterFirstRow, setFilterFirstRow] = useState([]);
	const [filterSecondRow, setFilterSecondRow] = useState([]);
	const [filterThirdRow, setFilterThirdRow] = useState([]);
	const [selectedSecondRows, setSelectedSecondRows] = useState();
	const [style, setStyle] = useState({ id: -1, style: false });

	useEffect(() => {
		const filteredSecondRows = secondRow.filter((SecondRow) => !filterObj.pid || SecondRow.id === filterObj.pid);
		const filteredFirstRows = firstRow.filter((FirstRow) => !filterObj.cid || FirstRow.id === filterObj.cid);

		const filteredThirdRow = thirdRow.filter((purchase) => {
			return (!filterObj.pid || purchase.ProductID === filterObj.pid) && (!filterObj.cid || purchase.CustomerID === filterObj.cid) && (!filterObj.date || purchase.Date === filterObj.date);
		});

		setFilterSecondRow(filteredSecondRows);
		setFilterFirstRow(filteredFirstRows);
		setFilterThirdRow(filteredThirdRow);
	}, [filterObj, firstRow, secondRow, thirdRow]);

	const getSelectedSecondRows = useCallback((SecondRowFromChild) => {
		if (SecondRowFromChild === 'Select...') {
			setSelectedSecondRows(null);
		} else {
			setSelectedSecondRows(SecondRowFromChild);
		}
	}, []);

	return (
		<table className='w-full leading-normal p-4 h-fit'>
			<thead>
				<tr className='h-[70px]'>
					<th className={stylerClass}>{Headline.firstRow}</th>
					{!isProductPage && <th className={stylerClass}>{Headline.secondRow}</th>}
					{!isProductPage && <th className={stylerClass}>{Headline.thirdRow}</th>}
					{(isCutomerPage || isProductPage) && <th className={stylerClass}>Buy</th>}
				</tr>
			</thead>

			<tbody>
				{filterFirstRow.map((stRow) => (
					<tr key={stRow.id} className='h-fit'>

						{stRow.firstName ? 
							(<td className='font-semibold sm:font-thin px-5 border-b border-gray-200 bg-white text-sm sm:text-[12px]'>
									<h1>{stRow.firstName + ' ' + stRow.lastName}</h1>	
							</td>)
							:
							(<td className='font-semibold sm:font-thin px-5 border-b border-gray-200 bg-white text-sm sm:text-[12px]'>
								<h1 className='text-3xl font-semibold'><Link to={'/edit-product/'+stRow.id}>{stRow.Name}</Link></h1>
								<p className='font-thin text-xl'>Price: {stRow.Price}$</p>
								<p className='font-thin text-xl'>Quantity: {stRow.Quantity}</p>
							</td>)
						}

						{!isProductPage && (
							<td className='h-full'>
								<ul className='h-full flex flex-col sm:text-[12px] font-semibold sm:font-thin px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                {filterThirdRow.filter((purchaseByID) => {
                                    return(purchaseByID.CustomerID === stRow.id)
                                }).map((selectedPurchase) => {
                                    return(
                                        filterSecondRow.filter((listProduct) => {
                                            return(selectedPurchase.ProductID === listProduct.id)
                                        }).map((finalProduct) => {
                                            return(
                                                <li className='py-2 list-disc' key={finalProduct.id} ><Link to={'/edit-product/'+finalProduct.id} >{finalProduct.Name}</Link></li>
                                            )
                                        })
                                    )}
                                )}
								</ul>
							</td>
						)}

						{!isProductPage && (
							<td className='h-full'>
								<ul className='h-full sm:text-[12px] font-semibold sm:font-thin px-5 py-5 border-b border-gray-200 bg-white text-sm'>
									{filterThirdRow
										.filter((purchaseByID) => {
											return purchaseByID.CustomerID === stRow.id;
										})
										.map((finalSecondRow) => {
											return (
												<li className='py-2 list-disc' key={finalSecondRow.id}>
													{finalSecondRow.Date}
												</li>
											);
										})}
								</ul>
							</td>
						)}

						{isCutomerPage && (
							<td className='font-semibold sm:font-thin px-5 border-b border-gray-200 bg-white text-sm sm:text-[12px]'>
								<div className='flex flex-col justify-center items-center'>
									<Combobox Data={secondRow} handleCallback={getSelectedSecondRows} />
									<button onClick={() => handleBuy(stRow.id, selectedSecondRows)} className='my-3 bg-slate-600 px-2 py-1 rounded-md text-white hover:bg-slate-500'>
										Buy
									</button>
								</div>
							</td>
						)}
						{isProductPage && (
							<td className='h-[250px] bg-white w-[40%]'>
								<ul className='h-full sm:text-[12px] overflow-auto font-semibold sm:font-thin border-b border-gray-200 bg-white text-sm'>
									{thirdRow.filter((purchase) => stRow.id == purchase.ProductID)
										.map((PurchasedProduct) =>
											secondRow.filter((customer) => PurchasedProduct.CustomerID === customer.id)
												.map((finalCustomer) => (
													<li className='px-2 border-[1px] my-1' key={PurchasedProduct.id}>
														<div className='w-full'>
															<h1>Name: <Link to={'/edit-customer/'+finalCustomer.id} >{finalCustomer.firstName} {finalCustomer.lastName}</Link></h1>
															<h1>Date: {PurchasedProduct.Date}</h1>
														</div>
														<button
															onClick={() =>
																setStyle((prevStyle) => ({
																	...prevStyle,
																	id: PurchasedProduct.id,
																	style: !prevStyle.style
																}))
															}
															className='my-3 bg-slate-600 px-2 py-1 rounded-md text-white hover:bg-slate-500'>
															Add
														</button>
														{PurchasedProduct.id === style.id && style.style && (
															<div className='flex flex-col justify-center items-center overflow-auto'>
																<Combobox Data={firstRow} handleCallback={getSelectedSecondRows} />
																<button onClick={() => handleBuy(finalCustomer.id, selectedSecondRows)} className='my-3 bg-slate-600 px-2 py-1 rounded-md text-white hover:bg-slate-500'>
																	Buy
																</button>
															</div>
														)}
													</li>
												)
											)
										)}
									</ul>
							</td>
						)}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
