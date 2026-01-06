import React from 'react'
import { Link } from 'react-router-dom'
import favorite from '../../assets/favorite.svg'

const Card = ({items}) => {
  return (
    <div className="pt-8 p-6 px-4 sm:px-8 md:px-16 lg:px-24 min-h-screen">


        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item)=>(
                <Link to={'/details'} state={{item}} key={item.id}
                style={{borderWidth: '1px', borderRadius: '5px'}}>
                <div key={item.id}
                 style={{borderWidth: '1px', borderRadius: '5px'}}
                 className="relative w-full bg-[#F5FAFF] rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200">

                    <div className='w-full flex justify-center p-2 overflow-hidden'>
                        <img 
                        className='h-36 object-contain'
                        src={item.imageUrl || 'https://placehold.co/300x200?text=No+Image'} alt={item.title}/>
                    </div>
                    <div className='details p-1 pl-4 pr-4'>
                        <h1 style={{color: '#002f34'}} className='font-bold text-xl'>₹ {item.price}</h1>
                        <p className='text-sn pt-2 font-bold'>{item.category}</p>
                        <p className='pt-2'>{item.title}</p>

                            <div className='absolute flex justify-center items-center p-2 bg-white rounded-full top-3 right-3 cursor-pointer'>
                                <img className='w-5' src={favorite} alt="" />
                            </div>
                    </div>
                </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Card