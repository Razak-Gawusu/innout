import React from 'react'
import {Link} from 'react-router-dom'

function ProductView({ product }) {
  return (
    <>
      <Link to={`/${product._id}`} className='product__card--wrapper'>
        <div className='product__card'>
            <div className='product__card--image'>
              <img src={`../images/uploads/${product.productImage}`} alt="product" />
            </div>
            <div className='product__card--info'>
              <div>{product.name}</div>
              <div>₵ {product.price}</div>
            </div>
        </div>
      </Link>
    </>
  )
}

export default ProductView