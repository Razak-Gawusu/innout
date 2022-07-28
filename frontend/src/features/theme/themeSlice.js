import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import toggleService from './themeService'

const theme = false

export const toggleTheme = createAsyncThunk( async (theme) => {
    return await toggleService.toggleTheme(theme)
})

export const themeSlice = createSlice({
    name: 'theme',
    theme,
    extraReducers: (builder) => {
        builder
            .addCase(toggleTheme.fulfilled, (state, action) =>{
                state = action.payload
            })
    }
})

export default themeSlice.reducer
