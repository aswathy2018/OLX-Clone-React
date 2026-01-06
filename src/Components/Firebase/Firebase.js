import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD__qSHanCpYCFKf1RxbVJvI4sxktH3OUg",
  authDomain: "olx-clone-c43e2.firebaseapp.com",
  projectId: "olx-clone-c43e2",
  storageBucket: "olx-clone-c43e2.firebasestorage.app",
  messagingSenderId: "883390666962",
  appId: "1:883390666962:web:b107b575ea1086f798350b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage()
const fireStore = getFirestore()




const FetchFromFireStore = async() => {
    try {

        const productsCollection = collection(fireStore, 'products')
        const productSnapshot = await getDocs(productsCollection)
        const productList = productSnapshot.docs.map(doc=>({
            id: doc.id,
            ...doc.data()
        }))

        console.log("Fetched products from firestorage", productList);
        return productList

    } catch (error) {

        console.error("Error infetching products from firestore", error)
        return []

    }
}


export{
    auth,
    provider,
    storage,
    fireStore,
    FetchFromFireStore
}