import React from 'react'
import {FaPlus} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function AdvertProduct() {
  return (
    <div className='advertProduct'>
        <div className='advertProduct__top'>
            Got something to sell?
        </div>
        <div className='advertProduct__middle'>
            <Link to ='/addProduct' className='advertProduct__middle--link'> <FaPlus className='advertProduct__middle--icon' /> </Link>
        </div>
        <div className='advertProduct__bottom'>
            Post an advert for free!
        </div>
    </div>
  )
}

export default AdvertProduct