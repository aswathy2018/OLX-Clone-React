import { collection ,getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { fireStore } from "../Firebase/Firebase";


const Context =createContext(null)
export const ItemsContext =()=>useContext(Context)
export const ItemContextProvider =({children})=>{
    const [items,setItems] =useState(null)

    useEffect(()=>{
        const fetchItemsFromFireStore =async ()=>{
            try {
                const productsCollection = collection(fireStore,'products')
                const productsSnapshot = await getDocs(productsCollection)
                const productsList =productsSnapshot.docs.map(doc=>({
                    id:doc.id,
                    ...doc.data()
                }))
                setItems(productsList)
            } catch (error) {
                console.log('error feching products',error);
            }
        }
        fetchItemsFromFireStore()
    },[])

    return(
        <>
        <Context.Provider value={{items,setItems}}>
            {children}
        </Context.Provider>
        </>
    )
}