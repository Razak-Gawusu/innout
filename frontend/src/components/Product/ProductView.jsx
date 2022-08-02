import React from 'react'
import {Link} from 'react-router-dom'
import {useTheme} from '../../Context/ThemeProvider'

function ProductView({ product }) {
  const theme = useTheme()
  return (
    <>
      <Link to={`/${product._id}`} className='product__card--wrapper'>
        <div className={`product__card ${theme ? 'dark' : ''}`}>
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