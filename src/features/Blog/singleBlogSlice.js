import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/axiosinstance'

var initialState = {
    data: [],
    comments:[],
    status: 'idle',
}

const singleBlogSlice = createSlice({
    name: 'singleBlog',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchSingleBlog.fulfilled, (state, action) => {
                console.log(action.payload.data[0])
                state.data = action.payload.data[0]
                state.status = 'succeded'
            })
            .addCase(fetchSingleBlog.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchSingleBlog.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(fetchComments.fulfilled,(state,action)=>{
                state.comments = action.payload.data
            })
            .addCase(fetchComments.rejected,(state)=>{
                state.comments = []
            })
    },
})

export const fetchSingleBlog = createAsyncThunk(
    'blog/single',
    async ({ slug }) => {
        try {
            const response = await axios.get(`/blogs/${slug}`)
            return response.data
        } catch (error) {
            return error.data
        }
    }
)

export const fetchComments = createAsyncThunk(
    'blog/comments',
    async ({id,url})=>{
        try {
            const requestUrl = url ? url :`/blogs/comments/${id}`
            const response = await axios.get(requestUrl)
            return response.data
        } catch (error) {
            return error.data
        }
    }
)

export const singleBlogData = (state) => state.singleBlog.data
export default singleBlogSlice.reducer
