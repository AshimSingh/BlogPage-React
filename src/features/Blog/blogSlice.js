import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/axiosinstance'
import { message } from 'antd'

const initialState = {
    data: [],
    featuredList: [],
    featuredListStatus: 'idle',
    status: 'idle',
    currentPage: '',
    totalCount: '',
    featuredListError: null,
    error: null,
    createBlogStatus :null
}

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        resetCreateBlogStatus: (state) => {
            console.log('reset success')
            state.createBlogStatus = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.totalCount = action.payload.totalCount
                state.currentPage = action.payload.currentPage
                state.data = action.payload.data
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchFeaturedBlog.fulfilled, (state, action) => {
                state.featuredListStatus = 'succeeded'
                state.featuredList = action.payload.data
            })
            .addCase(fetchFeaturedBlog.rejected, (state, action) => {
                state.featuredListStatus = 'failed'
                state.featuredListError = action.error.message
            })
            .addCase(fetchFeaturedBlog.pending, (state) => {
                state.featuredListStatus = 'loading'
            })
            .addCase(createBlogs.pending, () => {
                message.warning('Creating Blog')
            })
            .addCase(createBlogs.fulfilled, (state, action) => {
                if (action.payload.success) {
                    message.success('Blog created successfully')
                    state.createBlogStatus = true
                } else {
                    state.error = action.payload.message
                    state.createBlogStatus = false
                    message.error(`Failed, ${action.payload.message}`)
                }
            })
            .addCase(editBlog.pending, () => {
                message.warning('Editing Blog')
            })
            .addCase(editBlog.fulfilled, (state, action) => {
                if (action.payload.success) {
                    var temp_array = state.data
                    var id = action.payload.data[0]._id
                    for (var i = 0; i < temp_array.length; i++) {
                        if (temp_array[i]._id === id) {
                            temp_array[i] = action.payload.data[0]
                        }
                    }
                    state.data = temp_array
                    state.createBlogStatus = true
                    message.success('Blog Updated')
                } else {
                    message.error(action.payload.message)
                }
            })
            .addCase(editBlog.rejected, () => {
                message.error('Update failed')
            })
            .addCase(deleteBlog.pending, () => {
                message.warning('Deleting Blog')
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                if (action.payload.success) {
                    var temp_array = state.data
                    var tem =[]
                    for(var i=0;i<temp_array.length;i++){
                        if(temp_array[i].slug !== action.payload.slug){
                            tem[i] = temp_array[i]
                        }
                    }
                    state.data = tem
                    message.success('Blog Deleted Successfully')
                } else {
                    console.log('hey')
                    message.error(action.payload.message)
                }
            })
            .addCase(deleteBlog.rejected, () => {
                message.error('Failed to delete')
            })
    },
})

export const fetchBlogs = createAsyncThunk(
    'blogs/fetch',
    async ({ limit = 3, page = 1, url }) => {
        const requestUrl = url
            ? url
            : `/blogs?limit=${limit}&&page=${page}`

        try {
            // const response = await axios.get(`/blogs`)
            const response = await axios.get(requestUrl)
            return response.data
        } catch (error) {
            return error.data
        }
    }
)

export const fetchFeaturedBlog = createAsyncThunk(
    'blog/featured',
    async () => {
        try {
            const response = await axios.get(
                '/blogs?searchby=featured&&limit=4'
            )
            return response.data
        } catch (error) {
            return error.data
        }
    }
)
export const createBlogs = createAsyncThunk(
    '/createblogs',
    async ({ data }) => {
        try {
            var postData = {}
            Object.keys(data).map((key) => {
                const value = data[key]
                if (value) {
                    postData[key] = value
                }
            })
            const response = await axios.post('/blogs', postData)
            return response.data
        } catch (error) {
            return error.response.data
        }
    }
)

export const editBlog = createAsyncThunk(
    '/edit/blogs',
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
                `/blogs/${slug}`,
                postData
            )
            return response.data
        } catch (error) {
            return error.response.data
        }
    }
)
export const deleteBlog = createAsyncThunk(
    '/delete/blogs',
    async ({ slug, author }) => {
        try {
            const response = await axios.delete(`/blogs/${slug}`, {
                data: { author },
            })
            // const response ={data:'this resp',slug,author}
            console.log('delet blog',response)
            return {...response.data,slug}
        } catch (error) {
            return error.response.data
        }
    }
)
// export const getBlog = getBlogMiddleware()
export const { addBlogs,resetCreateBlogStatus } = blogSlice.actions
export const selectAllBlogs = (state) => state.blogs.data
export default blogSlice.reducer
