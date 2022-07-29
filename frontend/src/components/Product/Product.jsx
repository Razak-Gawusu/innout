import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {addProduct} from '../../features/products/productSlice'
import { Link } from 'react-router-dom'

function Product() {
    
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        image: ''
    })   
    
    const [file, setFile] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setProductData(prevState => (
          {
            ...prevState,
            [e.target.name]: e.target.value,
            
          }
        ))
      }
    const handleImageChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        productData.image = file
        console.log(productData)

        dispatch(addProduct(productData))
        navigate('/dashboard')    
    }


  return (
    <>
        <div className={`product__form--wrapper`}>
            <Link className='btn back' to='/dashboard'>Back</Link>
            <div className='product--form__container'>
            <form onSubmit={handleSubmit} className='product--form'>
                <div className='product--form__item'>
                    <div className="form__group">
                        <label htmlFor="name">name</label>
                        <input 
                            name='name'
                            type="text" 
                            value={productData.name} 
                            id='name' 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="price">price</label>
                        <input 
                            name='price'
                            type="text" 
                            id='price' 
                            value={productData.price}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                
                <div className="product--form__item">
                    <div className="form__group">
                        <label htmlFor="desc">description</label>
                        <textarea name="description" id="desc" cols="30" rows="10" value={productData.description} onChange={handleChange}></textarea>
                    </div>

                    <div className="form__group">
                        <label>Add a photo</label>
                        <input 
                            name='image'
                            type="file" 
                            className='uploadInput' 
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                
                <button type='submit' className='btn btn--createAd'>create Ad</button>
            </form>
        </div>
        </div>
        
    </>
  )
}

export default Product