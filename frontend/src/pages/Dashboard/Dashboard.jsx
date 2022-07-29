import React, {useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {getProducts} from '../../features/products/productSlice'
import ProductView from '../../components/Product/ProductView'
import {FaPlus} from 'react-icons/fa'
import {useTheme} from '../../Context/ThemeProvider'


function Dashboard() {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { products, isError, message } = useSelector((state) => state.products)
 
  
  useEffect(() => {
    console.log('page refreshed')

    if(isError){
      console.log(message)
    }

    if (!user){
      navigate('/login')
    }

    dispatch(getProducts())

  }, [user, navigate, isError, message, dispatch, products.length])

  let userInitials 
  if (user){
    userInitials = user.name.slice().toUpperCase().split(' ').map(name=>name[0]).join('')
  }
  

  return (

    <div className={`dashboard--wrapper ${theme ? 'dark' : ''}`}>
      <div className='dashboard container'>
        <div className='dashboard--content'>

          <section className='dashboard__secondary'>
          <div className='profile'>
            <h3>{user && userInitials}</h3>
          </div>
          <h1 className='dashboard__secondary--title'>Welcome  {user && user.name}</h1>
          <Link to='/dashboard/addProduct' className='addProduct__link'> Add New Product <FaPlus className='addProduct' /></Link>
          <img src="../images/howtouse3.png" alt="" />
          </section>

          <section className='dashboard__primary'>
            <h2 className='dashboard__primary--title'>Products</h2>
            <div className='dashboard__primary--main'>
              {products.map((product) => (
                <ProductView 
                key={product._id}
                product={product}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Dashboard