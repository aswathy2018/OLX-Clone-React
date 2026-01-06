import React, { useState } from 'react'
import logo from '../../assets/symbol.png'
import search from '../../assets/search1.svg'
import arrow from '../../assets/arrow-down.svg'
import searchwt from '../../assets/search.svg'
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import {auth} from '../Firebase/Firebase'
import addBtn from '../../assets/addButton.png'
import { useNavigate } from "react-router-dom"



const Navbar = (props) => {
  const [user] = useAuthState(auth)
  const {toggleModal, toggleModalSell} = props
  const [openDropdown, setOpenDropdown] = useState(false)

  const navigate = useNavigate()
  
  return (
    <div>
        <nav className="fixed top-0 left-0 z-30 w-full bg-[#F5FAFF] border-b border-gray-300 px-4 py-2 flex items-center">

            <img src={logo} alt="" className='w-12'/>
            <div className="relative ml-5">
                <img src={search} alt="" className="absolute top-4 left-2 w-5"/>
                <input type="text"
                  placeholder="Search city, area and locality.."
                  className="w-[50px] sm:w-[150px] md:w-[250px] lg:w-[270px] p-3 pl-8 pr-8 border-2 border-[#002F34] rounded-md placeholder:ellipsis  ocus:outline-none focus:border-teal-300" />
                <img src={arrow} alt="" className='absolute top-4 right-3 w-5 cursor-pointer'/>
            </div>

            <div className="ml-5 mr-2 relative flex-1 main-search">
              <input type="text"
                placeholder="Find Cars, Mobile Phones, and More..."
                className="w-full p-3 border-[#002F34] border-2 border-solid rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300"/>

              <div style={{ backgroundColor: "#002f34" }}
                className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12 cursor-pointer">
                <img className="w-5 filter invert" src={searchwt} alt="Search Icon"/>
              </div>
            </div>

            <div className="mx-1 sm:ml-5 sm:mr-5 relative lang flex items-center">
            <p className="font-bold mr-1 text-sm">English</p>
            <img src={arrow} alt="" className="w-3 cursor-pointer" />
          </div>

<div className="relative ml-5">
  {!user ? (
    <p
      onClick={toggleModal}
      className="font-bold underline cursor-pointer"
      style={{ color: '#002f34' }}
    >
      Login
    </p>
  ) : (
    <>
      <p
        onClick={() => setOpenDropdown(!openDropdown)}
        className="font-bold cursor-pointer flex items-center"
        style={{ color: '#002f34' }}
      >
        {user.displayName?.split(' ')[0]}
        <img src={arrow} alt="" className="w-3 ml-1" />
      </p>

      {openDropdown && (
        <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          
          {/* User info */}
          <div className="px-4 py-3 border-b">
            <p className="font-semibold text-sm">
              {user.displayName}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user.email}
            </p>
          </div>

          {/* My Ads */}
                    <p
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("/my-ads")}
                    >
                      My Ads
                    </p>

          {/* Logout */}
          <p
            onClick={() => {
              signOut(auth)
              setOpenDropdown(false)
            }}
            className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
          >
            Logout
          </p>
        </div>
      )}
    </>
  )}
</div>



        <img
  src={addBtn}
  onClick={user ? toggleModalSell : toggleModal}
  className="w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer"
  alt="Sell"
/>

        </nav>


            <div className="w-full bg-white border-b shadow-sm mt-[80px]">
  <div className="flex items-center gap-6 px-10 sm:px-20 md:px-32 py-3 text-sm font-medium text-[#002f34]">
    
    {/* ALL CATEGORIES */}
    <div className="flex items-center cursor-pointer font-bold uppercase whitespace-nowrap ">
      <span>All Categories</span>
      <img src={arrow} alt="" className="w-4 ml-2" />
    </div>

    {/* CATEGORY LIST */}
    <ul className="flex items-center gap-6 whitespace-nowrap">
      <li className="cursor-pointer hover:text-black ml-3">Cars</li>
      <li className="cursor-pointer hover:text-black">Motorcycles</li>
      <li className="cursor-pointer hover:text-black">Mobile Phones</li>
      <li className="cursor-pointer hover:text-black">
        For sale : Houses & Apartments
      </li>
      <li className="cursor-pointer hover:text-black">Scooter</li>
      <li className="cursor-pointer hover:text-black">
        Commercial & Other Vehicles
      </li>
      <li className="cursor-pointer hover:text-black">
        For rent : Houses & Apartments
      </li>
    </ul>

  </div>
</div>


    </div>
  )
}

export default Navbar