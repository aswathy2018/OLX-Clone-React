import React, { useEffect, useState } from "react"
import { collection, query, where, getDocs } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, fireStore } from "../Firebase/Firebase"
import Card from "../Card/Card"
import Navbar from "../Navbar/Navbar"
import Login from "../Modal/Login"
import Sell from "../Modal/Sell"
import { ItemsContext } from "../Context/Item"

const MyAds = () => {
  const [user] = useAuthState(auth)

  const [openModal, setModal] = useState(false)
  const [openModalSell, setModalSell] = useState(false)

  const itemsCont = ItemsContext()

  const toggleModal = () => setModal(!openModal)
  const toggleModalSell = () => setModalSell(!openModalSell)

  const [myAds, setMyAds] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ NAVBAR (same as Details page) */}
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
              <div key={ad.id} className="border bg-white p-3 rounded-md shadow-sm">
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="h-40 w-full object-cover mb-2"
                />
                <p className="font-bold">₹ {ad.price}</p>
                <p className="text-sm">{ad.title}</p>
                <p className="text-xs text-gray-500">{ad.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Sell
        setItems={itemsCont.setItems}
        toggleModalSell={toggleModalSell}
        status={openModalSell}
      />
    </div>
  )
}

export default MyAds
