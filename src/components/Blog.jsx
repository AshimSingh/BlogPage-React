/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import UserProfileBlock from './UserProfileBlock'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
import ReactHtmlParser from 'react-html-parser'
import { useState } from 'react'
import { EditBlog } from '../pages/DashBordPostPage'
import { useContext } from 'react'
import { EditContext } from './BlogList'

const Blog = ({
    author,
    categories,
    title,
    // content,
    excerpt,
    thumbnail,
    slug,
    // tags,
    createdAt,
    featured,
    priority,
    published,
    // _id,
    wfull,
    isDashBoardComponent,
}) => {
    // const image = thumbnail?.thumbnails[2].image_url
    const image = thumbnail.image_url
    //for edit drawer
    const { showDrawer } = useContext(EditContext)
    return (
        <>
            {/* parent div having rounded corners and border */}
            <div
                className={`${
                    wfull ? 'w-full' : 'lg:w-[70%] md:w-[80%] w-[90%]'
                } bg-white flex flex-wrap justify-center items-center rounded-md my-4 shadow-2xl p-2 z-9 border overflow-hidden lg:max-h-[250px] `}
            >
                {/* Image container  */}

                <div className="max-h-[200px] min-w-[100px] w-[20%]  ">
                    {/* if imgage other wise default img */}
                    <img
                        src={
                            image
                                ? image
                                : 'http://localhost:3000/myUploads/1695713987855-23344655default_img.jpeg'
                        }
                        className="min-w-[100px] min-h-[100px] max-h-[200px] object-contain  rounded-md"
                    ></img>
                </div>

                {/* Content and all details Container */}
                <div className=" mx-[2%]  w-[70%]">
                    {/* in big scree <=470 then display all title other wise slice for better UI */}
                    {/* display when screenwidth<=470px */}
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl  font-semibold font-mont">
                            {title.slice(0,50)}
                        </h1>    
                        {isDashBoardComponent ? (
                            <div className="flex">
                                <div>
                                    <EditOutlined
                                        className="text-blue-500 text-[20px] mx-2"
                                        onClick={() =>
                                            showDrawer({
                                                author,
                                                categories,
                                                title,
                                                // content,
                                                excerpt,
                                                thumbnail,
                                                slug,
                                                // tags,
                                                createdAt,
                                                featured,
                                                priority,
                                                published,
                                                // _id,
                                                wfull,
                                                isDashBoardComponent,
                                            })
                                        }
                                    />
                                </div>
                                <Link to={`/blogs/${slug}`}>
                                    <EyeOutlined className="text-blue-500 text-[20px]" />
                                </Link>
                            </div>
                        ) : null}
                    </div>

                    {/* same logic as above */}
                    {/* displays when width>=470px */}
                    <p className="text-sm     my-2 font-mont">
                        {isDashBoardComponent
                            ? ReactHtmlParser(excerpt).slice(0, 60)
                            : ReactHtmlParser(excerpt).slice(0,100)}
                        {isDashBoardComponent ? null : (
                            <Link
                                to={`/blogs/${slug}`}
                                className="text-blue-700"
                            >
                                ...Read more
                            </Link>
                        )}
                    </p>
                    {isDashBoardComponent ? (
                        <div className="flex flex-wrap items-center ">
                            <h1 className="text-xl font-medium ">
                                Category
                            </h1>
                            <div className="flex mx-1">
                                <h1 className="w-auto p-2 px-4 rounded-md my-1 bg-black text-white">
                                    {categories.title.slice(0, 30)}
                                </h1>
                            </div>

                            <h1>
                                {featured ? (
                                    <div className="flex">
                                        <h1 className="text-green-500 text-sm mx-1">
                                            Featured
                                        </h1>
                                        <h1>
                                            Priotiry Order :{' '}
                                            {priority}
                                        </h1>
                                    </div>
                                ) : (
                                    <h1 className="text-red-500 text-sm mx-2">
                                        Not Featured
                                    </h1>
                                )}
                            </h1>

                            {published ? (
                                <>
                                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full mx-2 flex"></div>
                                    <div className="text-green-500">
                                        Published
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className=" text-red-500 mx-2 ">
                                        Not Published
                                    </div>
                                </>
                            )}

                            {}
                        </div>
                    ) : null}
                    {/* author detail container */}
                    <UserProfileBlock
                        isDashBoardComponent={isDashBoardComponent}
                        author={author}
                        time={createdAt}
                    />
                </div>
            </div>
        </>
    )
}
export default Blog
