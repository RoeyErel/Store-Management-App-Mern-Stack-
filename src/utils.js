import React, { useState } from 'react'
import db from './firebase'
import { collection, onSnapshot, query } from "firebase/firestore"; 



const getCollection = (collectionName) => {
    const q = query(collection(db, collectionName));
    
    onSnapshot(q, (querySnapshot) => {
        
            querySnapshot.docs.map(doc => {
                return  {
                    id: doc.id,
                    ...doc.data()
                }
            })
        
    })
};


export {getCollection}