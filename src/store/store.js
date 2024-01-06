import { configureStore } from '@reduxjs/toolkit'
import blogSlice from '../features/Blog/blogSlice'
import authenticationSlice from '../features/Authentication/AuthenticationSlice'
import searchSlice from '../features/Search/searchSlice'
import categoriesSlice from '../features/Categories/categoriesSlice'
import singleBlogSlice from '../features/Blog/singleBlogSlice'
import mediaSlice from '../features/Media/mediaSlice'
import userSlice from '../features/User/userSlice'

export const store = configureStore({
    reducer: {
        blogs: blogSlice,
        authentication: authenticationSlice,
        search: searchSlice,
        categories: categoriesSlice,
        media: mediaSlice,
        singleBlog: singleBlogSlice,
        user: userSlice,
    },
})
