import { useDispatch, useSelector } from 'react-redux'
import { createBlogs } from '../features/Blog/blogSlice'

import AddBlogForm from '../components/AddBlogForm'
import { useContext, useEffect } from 'react'
import { MenuContext } from './DashboardPage'
import { resetCreateBlogStatus } from '../features/Blog/blogSlice'

const AddBlog = () => {
    const dispatch = useDispatch() // Get the Redux dispatch function
    const postData = (values) => {
        dispatch(createBlogs({ data: values })) // Dispatch a Redux action to create a category
    }
    const createBlogStatus = useSelector((state)=>state.blogs.createBlogStatus)
    const {setKey} = useContext(MenuContext)
    useEffect(()=>{
        // setKey('0')
        if(createBlogStatus){
            // setKey('0')   
            
        }
        resetCreateBlogStatus()
    },[createBlogStatus])
    return (
        <div className="w-full">
            <h1 className="m-4 md:text-4xl text-2xl font-bold">
                Add Post
            </h1>
            <AddBlogForm onFinishFunction={postData} />
        </div>
    )
}
export default AddBlog
