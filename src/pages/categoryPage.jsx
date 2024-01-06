import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    getCategories,
    getCategory,
} from '../features/Categories/categoriesSlice'
import {
    fetchBlogs,
    selectAllBlogs,
} from '../features/Blog/blogSlice'
import BlogList from '../components/BlogList'
import PageInition from '../components/pageInition'

const CategoryPage = () => {
    const dispatch = useDispatch()
    const { slug } = useParams()
    var data = useSelector((state) => state.categories.data)
    const { image, title, _id } = data
    console.log(_id)
    useEffect(() => {
        dispatch(getCategory({ url: `/blogs/categories/${slug}` }))
        dispatch(
            fetchBlogs({
                url: `/blogs?searchby=categories&&search=${_id}`,
            })
        )
    }, [_id, slug, dispatch])

    var blogData = useSelector(selectAllBlogs)
    const blogStatus = useSelector((state) => state.blogs.status)
    const blogError = useSelector((state) => state.blogs.error)

    return (
        <div className="flex flex-col justify-center items-center my-4">
            {/* // category image and title block */}
            <div className="flex items-center">
                <img
                    src={
                        image
                            ? image
                            : 'http://localhost:3000/myUploads/1695713987855-23344655default_img.jpeg'
                    }
                    className="h-[50px] w-[50px]  object-cover  rounded-full"
                ></img>
                <h1 className="lg:text-3xl md:text-2xl ml-2">
                    {title}
                </h1>
            </div>

            <BlogList
                data={blogData}
                status={blogStatus}
                error={blogError}
            />
        </div>
    )
}

export default CategoryPage
