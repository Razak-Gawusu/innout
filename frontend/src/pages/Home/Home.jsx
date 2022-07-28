import React, {useEffect} from 'react'
import Search from '../../components/Search'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {getAllProducts, reset} from '../../features/allProducts/allProductsSlice'
import AdvertProduct from '../../components/Product/AdvertProduct'
import ProductView from '../../components/Product/ProductView'

function Home() {
    const dispatch = useDispatch()

    const {products} = useSelector((state) => state.allProducts)
    const {user} = useSelector((state) => state.auth)

    console.log(products)

    useEffect(() => {
        dispatch(reset())
        
        dispatch(getAllProducts())
    }, [dispatch])

    let to 
    if(user){
        to = '/addProduct'
    } else {
        to ='/login'
    }
  return (
    <>
    <div className='home--wrapper'>
        <div className="home">
            <Search getAllProducts = {getAllProducts} />

            <div className='home__page--main'>
                <div className='container'>
                    <h2 className='home__page--main__title'>All Products</h2>
                    <div className='home__page--products'>
                        {products.map((product) => (
                            <ProductView 
                            key={product._id}
                            product={product}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Home