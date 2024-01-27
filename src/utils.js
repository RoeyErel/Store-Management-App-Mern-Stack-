//firebase
import { onSnapshot, addDoc, collection } from 'firebase/firestore';
import db from './firebase'

/**
 * This function handles the purchase of product for a given customer.
 * it creates a new purchase entry in the "Purchases" collection in Firestore.
 * @param {*} id - The customer ID for whom the purchase is being made.
 * @param {*} selected - The product ID for the purchased product. 
 */
const handleBuy  = async (id, selected) => {
    if(selected){
        let newDate = new Date()
        const obj = {
            CustomerID:id,
            Date:newDate.getDate()+"/"+(newDate.getMonth() + 1)+"/"+newDate.getFullYear(),
            ProductID:selected
        }
        await addDoc(collection(db, 'Purchases'),obj);
    }
};

/**
 * This function sets up a real-time listener using Firestore's 'onSnapshot' to fetch and update the state based on changes in the provided Firestore query.
 * @param {*} setState - The state setter function to update the state with the fetched data.
 * @param {*} query - The Firestore query for which the real-time listener is set up.
 */
const fetchData = (setState, query) => {
    onSnapshot(query, (querySnapshot) => {
        setState(
            querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        );
    });
};

/**
 * This function handles input changes. It updates the state by merging the current state with the new input values.
 * @param {*} e - The event object representing the input change.
 * @param {*} setState - The state setter function to update the state with the new input values.
 * @param {*} state - The current state object.
 */
const handleInput = (e, setState, state) => {
    e.preventDefault();
    setState({
        ...state,
        [e.target.name]: e.target.value,
    });
};

export { fetchData, handleInput, handleBuy}