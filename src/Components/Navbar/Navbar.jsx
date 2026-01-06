import React from 'react'
import './Navbar.css'
import logo from '../../assets/symbol.png'
import search from '../../assets/search1.svg'
import arrow from '../../assets/arrow-down.svg'
import searchwt from '../../assets/search.svg'


const Navbar = (props) => {
  const {toggleModal, toggleModalSell} = props
  return (
    <div>
        <nav className="fixed top-0 left-0 z-30 w-full bg-[#F5FAFF] border-b border-gray-300 px-4 py-2">
            <img src={logo} alt="" className='w-12'/>
            <div className="relative ml-5">
                <img src={search} alt="" className="absolute top-4 left-2 w-5"/>
                <input type="text"
                  placeholder="Search city, area and locality.."
                  className="w-[50px] sm:w-[150px] md:w-[250px] lg:w-[270px] p-3 pl-8 pr-8 border-2 border-black rounded-md placeholder:ellipsis  ocus:outline-none focus:border-teal-300" />
                <img src={arrow} alt="" className='absolute top-4 right-3 w-5 cursor-pointer'/>
            </div>

            <div className="ml-5 mr-2 relative flex-1 main-search">
              <input type="text"
                placeholder="Find Cars, Mobile Phones, and More..."
                className="w-full p-3 border-black border-2 border-solid rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300"/>

              <div style={{ backgroundColor: "#002f34" }}
                className="flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12 cursor-pointer">
                <img className="w-5 filter invert" src={searchwt} alt="Search Icon"/>
              </div>
            </div>

            <div className="mx-1 sm:ml-5 sm:mr-5 relative lang flex items-center">
            <p className="font-bold mr-1 text-sm">English</p>
            <img src={arrow} alt="" className="w-3 cursor-pointer" />
          </div>
          <p onClick={toggleModal}>Login</p>
          <br/>
          <p onClick={toggleModalSell}>Sell</p>
        </nav>
    </div>
  )
}

export default Navbar