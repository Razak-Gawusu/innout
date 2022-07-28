import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import allProductsService from './allProductsService'

const initialState = {
    products: [],
    isLoading: false,
    isError: false, 
    isSuccess: false,
    message: ''
}

export const getAllProducts = createAsyncThunk('products/getAllProducts', async (params, thunkAPI) => {
    try {
        return await allProductsService.getAllProducts(params)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getSingleProduct = createAsyncThunk('products/getSingleProduct', async (id, thunkAPI) => {
    try {
        return await allProductsService.getSingleProduct(id)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const allProductsSlice = createSlice({
    name: 'allProducts',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllProducts.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getAllProducts.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.products= action.payload
        })
        .addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getSingleProduct.pending, (state) =>{
            state.isLoading = true
        })
        .addCase(getSingleProduct.fulfilled, (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload
        })
        .addCase(getSingleProduct.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = allProductsSlice.actions
export default allProductsSlice.reducer