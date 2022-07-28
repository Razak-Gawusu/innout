import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
    products : [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

export const addProduct = createAsyncThunk('products/addProduct', async (productData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.addProduct(productData, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Get user Products
export const getProducts = createAsyncThunk('products/getUserProducts', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.getProducts(token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})
// Delete user Product
export const deleteProduct = createAsyncThunk('products/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.deleteProduct(id, token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        reset: (state) => {
            state.products = []
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(addProduct.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(addProduct.fulfilled, (state, action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.products.push(action.payload)
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getProducts.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteProduct.pending, (state) =>{
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) =>{
                state.isLoading = false
                state.isSuccess = true
                state.products = state.products.filter((product) => product._id !== action.payload.id)
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            
    }
})

export const { reset } = productSlice.actions
export default productSlice.reducer