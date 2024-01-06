import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../config/axiosinstance'
import { message } from 'antd'

const initialState = {
    data: [],
    status: 'idel',
    error: null,
    currentPage: 1,
    totalPage: 1,
}

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getMedia.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getMedia.fulfilled, (state, action) => {
                console.log(action.payload)
                state.status = 'succeeded'
                state.data = action.payload.data
                state.currentPage = action.payload.currentPage
                state.totalCount = action.payload.totalCount
            })
            .addCase(getMedia.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(postMedia.fulfilled, (state, action) => {
                if (action.payload) {
                    console.log(action.payload, 'err')
                    state.data.pop()
                    state.data.unshift(action.payload.data[0])
                    message.success('upload successfully.')
                } else {
                    message.error('upload failed')
                }
            })

            .addCase(editMedia.fulfilled, (state, action) => {
                if (action.payload) {
                    var temp_array = state.data
                    var id = action.payload.data[0]._id
                    for (var i = 0; i < temp_array.length; i++) {
                        if (temp_array[i]._id === id) {
                            temp_array[i] = action.payload.data[0]
                        }
                    }
                    state.data = temp_array
                } else {
                    message.error('Edit failed')
                }
            })
            .addCase(postMedia.pending, () => {
                message.warning('Uploading')
            })
            .addCase(postMedia.rejected, () => {
                console.log('heyyy post media failed')
                message.error('failed to upload')
            })
            .addCase(deleteMedia.fulfilled, (state, action) => {
                var temp_array = state.data
                var id = action.payload
                var new_array = temp_array.filter(
                    (element) => element._id !== id
                )
                state.data = new_array
                message.success('Deleted successfully.')
            })
            .addCase(deleteMedia.rejected, () => {
                message.error('Problem while deleting')
            })
    },
})

export const getMedia = createAsyncThunk(
    '/media',
    async ({ url }) => {
        var requestedUrl = url ? url : '/media?limit=20'
        try {
            const response = await axios.get(requestedUrl)

            return response.data
        } catch (error) {
            console.log(error)
            return error.data
        }
    }
)

export const postMedia = createAsyncThunk(
    '/media/post',
    async ({ data }) => {
        // console.log(data, 'data to post')
        try {
            const response = await axios.post('/media', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data
        } catch (error) {
            console.log(error, 'error here')
            return error.data
        }
    }
)
export const editMedia = createAsyncThunk(
    '/media/edit',
    async ({ data, id }) => {
        console.log(data, 'data to edit')
        var requestedUrl = id ? `/media/${id}` : '/media'
        try {
            const response = await axios.patch(requestedUrl, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteMedia = createAsyncThunk(
    '/media/delete',
    async ({ id }) => {
        try {
            const response = await axios.delete(`/media/${id}`)
            console.log('id is ', id)
            return id
        } catch (error) {
            console.log(error)
        }
    }
)

export const selectAllMedia = (state) => state.media.data
export default mediaSlice.reducer
