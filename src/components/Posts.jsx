import React from 'react'

const Posts = (data) => {
    console.log(data)
    const {
        author,
        categories,
        title,
        excerpt,
        thumbnail,
        tags,
        createdAt,
    } = data
    const { thumbnails, image_url } = thumbnail
    const postImage = thumbnails[2].image_url
    return (
        <div className="flex justify-center items-center bg-green-400">
            <div className="bg-red-500 lg:w-[80%] md:w-[90%] w-[95%]">
                {
                    // postImage?
                }
            </div>
        </div>
    )
}

export default Posts
