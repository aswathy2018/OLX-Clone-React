import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../Navbar/Navbar'
import Login from '../Modal/Login'
import Sell from '../Modal/Sell'
import Card from '../Card/Card'
import { ItemsContext } from '../Context/Item'
import { FetchFromFireStore } from '../Firebase/Firebase'
import Footer from '../Footer/Footer'

const Home = () => {

  const [openModal, setModal] = useState(false)
  const [openModalSell, setModalSell] = useState(false)

  const toggleModal = () => {
    setModal(!openModal)
  }
  const toggleModalSell = () => {
    setModalSell(!openModalSell)
  }

  const itemsCtx = useContext(ItemsContext)

  useEffect(()=>{
    console.log('Updated Items: ', itemsCtx.items);
  }, [itemsCtx.items])
  
  return (
    <div>
      <Navbar toggleModal = {toggleModal} toggleModalSell = {toggleModalSell}/>
      <Login toggleModal = {toggleModal} status = {openModal}/>
      <Sell setItems = {(itemsCtx).setItems} toggleModalSell = {toggleModalSell} status = {openModalSell}/>
      <Card items = {(itemsCtx).items || []}/>
      <Footer/>
    </div>
  )
}

export default Home