import axios from "axios";

const API_URL = '/api/products/'

const getProducts = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data
}


const addProduct = async (productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }

    const response = await axios.post(API_URL, productData, config)
    return response.data
}


const updateProduct = async (productData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }

    const response = await axios.post(API_URL, productData, config)
    return response.data
}

const deleteProduct = async (productId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + productId, config)
    return response.data
}


const productService = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct, 
}

export default productService