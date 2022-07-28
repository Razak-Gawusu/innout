import React from 'react'
import UserInitails from '../UserInitails'

function SingleProductView({product}) {
  let user = product.user.name
  let userInitials
  console.log(user)

  if (user){
    userInitials = user.slice().toUpperCase().split(' ').map(name=>name[0]).join('')
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
      </div>
    </>
  )
}

export default SingleProductView


