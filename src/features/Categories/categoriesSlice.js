import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../config/axiosinstance'
import { message } from 'antd'

const initialState = {
    data: [],
    status: 'idle',
    currentPage: null,
    pageCount: null,
    error: null,
}

const categoriesSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getCategories.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                console.log('fulfilled fromadd')
                state.status = 'succeeded'
                state.data = action.payload.data
                state.totalCount = action.payload.totalCount
                state.currentPage = action.payload.currentPage
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload.data
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(createCategory.fulfilled, () => {
                message.success('Category Created')
            })
            .addCase(createCategory.rejected, () => {
                message.error('Cannot create category')
            })
            .addCase(editCategories.fulfilled, (state, action) => {
                var temp_array = state.data
                var id = action.payload.data[0]._id
                for (var i = 0; i < temp_array.length; i++) {
                    if (temp_array[i]._id === id) {
                        temp_array[i] = action.payload.data[0]
                    }
                }
                state.data = temp_array
                message.success('Category Updated')
            })
            .addCase(editCategories.rejected, () => {
                message.error('Update Failed')
            })
            .addCase(deleteCategory.pending, () => {
                message.warning('Deleting Category')
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                var tempData = state.data
                var newData = []
                for (var i = 0; i < tempData.length; i++) {
                    if (tempData[i]._id != action.payload.id) {
                        newData.push(tempData[i])
                    }
                }
                state.data = newData
                message.success('Successfully deleted')
            })
    },
})

export const getCategories = createAsyncThunk(
    '/category/list',
    async ({ url }) => {
        var requestedUrl = url ? url : '/blogs/categories?limit=2'
        try {
            const response = await axios.get(requestedUrl)
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            return error.data
        }
    }
)
export const getCategory = createAsyncThunk(
    '/category',
    async ({ url }) => {
        try {
            const response = await axios.get(url)
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
            return error.data
        }
    }
)

export const createCategory = createAsyncThunk(
    '/category/create',
    async ({ data }) => {
        try {
            var postData = {}
            Object.keys(data).map((key) => {
                const value = data[key]
                if (value) {
                    postData[key] = value
                }
            })
            const response = await axios.post(
                '/blogs/categories',
                postData
            )
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const editCategories = createAsyncThunk(
    '/category/edit',
    async ({ data, slug }) => {
        try {
            var postData = {}
            Object.keys(data).map((key) => {
                const value = data[key]
                if (value) {
                    postData[key] = value
                }
            })
            const response = await axios.patch(
                `/blogs/categories/${slug}`,
                postData
            )
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteCategory = createAsyncThunk(
    '/delete/categories',
    async ({ slug, id }) => {
        try {
            const response = await axios.delete(
                `/blogs/categories/${slug}`
            )
            return { data: response.data, id }
        } catch (error) {
            console.log(error)
            return error.data
        }
    }
)
export const selectAllCategories = (state) => state.categories.data
export default categoriesSlice.reducer
