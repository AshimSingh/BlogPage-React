import UserProfileBlock from './UserProfileBlock'
import { Link } from 'react-router-dom'

const SmallFeatureBlock = ({
    author,
    // categories,
    title,
    // content,
    // excerpt,
    thumbnail,
    // tags,
    createdAt,
    // _id,
    slug,
    // timetoRead,
}) => {
    const image = thumbnail?.thumbnails[1]?.image_url
    return (
        <Link to={`/blogs/${slug}`}>
            <div className="lg:w-[100%]  bg-white flex flex-wrap items-center rounded-md my-4 shadow-2xl p-1 z-9 border ">
                {/* Image container  */}
                <div className="md:max-h-[150px]  w-[30%] ">
                    {/* if imgage other wise default img */}
                    <img
                        src={
                            image
                                ? image
                                : 'http://localhost:3000/myUploads/1695713987855-23344655default_img.jpeg'
                        }
                        className="  h-auto max-h-[150px] w-full object-fill rounded-md"
                    ></img>
                </div>

                {/* Content and all details Container */}
                <div className="w-[70%] md:px-4 px-1 ">
                    {/* in big scree <=470 then display all title other wise slice for better UI */}
                    {/* display when screenwidth<=470px */}
                    <h1 className="lg:text-2xl md:text-xl text-sm my-2 overflow-hidden text-ellipsis  font-semibold font-mont">
                        {title.slice(0, 50)}
                    </h1>

                    {/* author detail container */}
                    <UserProfileBlock
                        author={author}
                        time={createdAt}
                    />
                </div>
            </div>
        </Link>
    )
}
export default SmallFeatureBlock
