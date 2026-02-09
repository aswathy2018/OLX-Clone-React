import { collection, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { fireStore } from "../Firebase/Firebase";

export const ItemsContext = createContext({
  items: [],
  setItems: () => {},
});

export const ItemContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItemsFromFireStore = async () => {
      try {
        const productsCollection = collection(fireStore, "products");
        const productsSnapshot = await getDocs(productsCollection);

        const productsList = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(productsList);
      } catch (error) {
        console.log("error fetching products", error);
      }
    };

    fetchItemsFromFireStore();
  }, []);

  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
};
