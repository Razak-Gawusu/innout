import axios from "axios";

const API_URL = '/api/allProducts/'

const getAllProducts = async (params) => {
    let response 
    if (params){
        response = await axios.get(`${API_URL}?name=${params}`)
    } else if (params === '') {
        response = await axios.get(API_URL)
    } else {
        response = await axios.get(API_URL)
    }
    return response.data
}

const getSingleProduct = async (id) => {
    const response = await axios.get(API_URL + id)
    return response.data
}

const allProductsService = {
    getAllProducts,
    getSingleProduct
}

export default allProductsService