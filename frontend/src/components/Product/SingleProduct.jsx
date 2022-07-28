import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link , useParams} from 'react-router-dom'
import { getSingleProduct, reset } from '../../features/allProducts/allProductsSlice'
import SingleProductView from './SingleProductView'

function SingleProduct() {
    const {productId} = useParams()
    const dispatch = useDispatch()

    const {products, isError, message} = useSelector((state) => state.allProducts)

    useEffect(() => {

        if(isError){
            console.log(message)
        }

        dispatch(getSingleProduct(productId))

        return () => {
            dispatch(reset())
        }
    }, [productId, dispatch, message, isError])

    console.log(products )
    
  return (
    <div className='single__product--wrapper'>
        <div className='container'>
            <Link className='btnBack' to='/'>Back</Link>
            <div className="single__product">
                {products.map((product) => (
                <SingleProductView
                    key={product._id}
                    product={product}
                />
                ))}
            </div>
            
        </div>
        
    </div>
  )
}

export default SingleProduct