import React from 'react'

const Card = ({items}) => {
  return (
    <div className="p-6 px-4 sm:px-8 md:px-16 lg:px-24 min-h-screen">
        <h1
          className="text-2xl font-semibold mb-4"
          style={{ color: "#002f34" }}
        >Fresh Recommendations</h1>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item)=>(
                 <div key={item.id}
                 style={{borderWidth: '1px', borderColor: "lightgray"}}
                 className="relative w-full bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200">
                    <div className='details p-1 pl-4 pr-4'>
                        <h1 style={{color: '#002f34'}} className='font-bold text-xl'>$ {item.price}</h1>
                        <p className='text-sn pt-2'>{item.category}</p>
                        <p className='pt-2'>{item.title}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Card