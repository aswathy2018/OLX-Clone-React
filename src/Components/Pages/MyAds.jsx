import React, { useEffect, useState } from "react"
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, fireStore } from "../Firebase/Firebase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from "../Navbar/Navbar"
import Login from "../Modal/Login"
import Sell from "../Modal/Sell"
import { ItemsContext } from "../Context/Item"
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

const MyAds = () => {
    const [user] = useAuthState(auth)

    const [openModal, setModal] = useState(false)
    const [openModalSell, setModalSell] = useState(false)

    const itemsCont = ItemsContext()

    const toggleModal = () => setModal(!openModal)
    const toggleModalSell = () => setModalSell(!openModalSell)

    const [myAds, setMyAds] = useState([])
    const [loading, setLoading] = useState(true)

    const [editItem, setEditItem] = useState(null);


    useEffect(() => {
        const fetchMyAds = async () => {
            if (!user) return

            const q = query(
                collection(fireStore, "products"),
                where("userId", "==", user.uid)
            )

            const snapshot = await getDocs(q)
            const ads = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            setMyAds(ads)
            setLoading(false)
        }

        fetchMyAds()
    }, [user])


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this ad?"
        );

        if (!confirmDelete) return;

        try {
            await deleteDoc(doc(fireStore, "products", id));
            setMyAds(prev => prev.filter(ad => ad.id !== id));
        } catch (error) {
            alert("Failed to delete the ad");
        }
    };



    const handleEdit = (ad) => {
        setEditItem(ad);
        toggleModalSell();
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar
                toggleModalSell={toggleModalSell}
                toggleModal={toggleModal}
            />

            <Login toggleModal={toggleModal} status={openModal} />

            <div className="pt-5 px-5 sm:px-15 md:px-30 lg:px-40">
                <h2 className="text-2xl font-bold mb-6">My Ads</h2>

                {loading ? (
                    <p>Loading your ads...</p>
                ) : myAds.length === 0 ? (
                    <p>You haven't posted any ads yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {myAds.map(ad => (
                            <div key={ad.id} className="relative border bg-white p-3 rounded-md shadow-sm">

                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(ad)}
                                        className="
                            bg-blue-400/30
                            hover:bg-blue-500/40
                            text-blue-700
                            w-8 h-8
                            rounded-full
                            flex items-center justify-center
                            transition-all duration-200"
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} size="xs" />
                                    </button>


                                    <button
                                        onClick={() => handleDelete(ad.id)}
                                        className="
                            bg-gray-400/30
                            hover:bg-red-400/40
                            text-gray-600
                            hover:text-red-700
                            w-8 h-8
                            rounded-full
                            flex items-center justify-center
                            transition-all duration-200"
                                    >
                                        <FontAwesomeIcon icon={faTrash} size="xs" />
                                    </button>


                                </div>

                                <img
                                    src={ad.imageUrl}
                                    alt={ad.title}
                                    className="h-40 w-full object-cover mb-2"
                                />
                                <p className="font-bold">₹ {ad.price}</p>
                                <p className="text-sm">{ad.category}</p>
                                <p className="text-xs text-gray-500">{ad.title}</p>
                            </div>

                        ))}
                    </div>
                )}
            </div>

            <Sell
                setItems={itemsCont.setItems}
                toggleModalSell={toggleModalSell}
                status={openModalSell}
                editItem={editItem}
                setEditItem={setEditItem}
            />

        </div>
    )
}

export default MyAds
