import React from 'react'
import UserInitails from '../UserInitails'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {deleteProduct} from '../../features/products/productSlice'

function SingleProductView({product}) {
  let user = product.user.name
  let userInitials
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (user){
    userInitials = user.slice().toUpperCase().split(' ').map(name=>name[0]).join('')
  }
 
  const userExits = useSelector((state) => state.auth).user
  let loginUser = false

  if (userExits === null){
    loginUser = false
  } else{
    loginUser = userExits.name === user
  }
  

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(product._id))

    navigate('/dashboard')
  }

  return (
    <>
      <div className='single__product--primary'>
        <img className='single__product--primary__image' src={`../images/uploads/${product.productImage}`} alt="productimage" />
        <h3 className='single__product--primary__title'>{product.name}</h3>
        <p>posted on: {product.createdAt.split('T')[0]}</p>
        <p>{product.description}</p>
      </div>

      <div className='single__product--secondary'>
        <div className='single__product--secondary__price'>
          <h2>₵ {product.price}</h2>
        </div>

        <div className='single__product--secondary__supplier'>
          <UserInitails userInitials = {userInitials}/>
          <h2>{product.user.name}</h2>
          <h4>{product.user.email}</h4>
        </div>

        {loginUser ? 
          <div className='single__product--secondary__item'>
            <button className='update btn'>update</button>
            <button className='delete btn' onClick={handleDeleteProduct}>delete</button>
          </div>
          : ''
        }
      </div>
    </>
  )
}

export default SingleProductView


