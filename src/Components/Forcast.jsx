import React from 'react'
import { iconUrlFromCode } from '../services/weatherService'

function Forcast({title,items}) {
  return (
    <div>
        <div className='flex items-center justify-center mt-6'>
            <p className='text-white font-medium uppercase'>{title}</p>
        </div>
        <hr className='my-2'></hr>

        <div className='flex items-center justify-between flex-row text-white'>

            {items.map(item=>(
                <div className='flex items-center justify-center flex-col'>
                    <p className='font-light text-sm'>{item.title}</p>
                    <img src={iconUrlFromCode(item.icon)} 
                    className=''w-12 my-1 />
                    <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>
                </div>
            ))}         
        </div>

    </div>
  )
}

export default Forcast;