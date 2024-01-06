/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import backgroundImage from '../assets/background.png'
import UserProfileBlock from './UserProfileBlock'
import LoadingBox from './LoadingBox'
import CategoryBlock from './CategoryBlock'
import SmallFeatureBlock from './SmallFeatureBlock'
import ReactHtmlParser from 'react-html-parser'
const FeaturedBlog = ({ data, status, error }) => {
    var content
    if (status == 'succeeded') {
        content = (
            <>
                {/* main Feature Block */}

                <MainFeatureBlock {...data[0]} />

                {/* second Block where 3 blogs are shown */}
                <div className=" col-span-7 flex flex-col md:p-2">
                    <div className="w-full">
                        {data.slice(1, 4).map((info) => {
                            return (
                                <SmallFeatureBlock
                                    key={info._id}
                                    {...info}
                                />
                            )
                        })}
                    </div>
                </div>
            </>
        )
    } else if (status === 'loading') {
        content = (
            <>
                <div className="col-span-5 flex flex-col md:p-2">
                    <LoadingBox />
                </div>
                <div className="col-span-7 flex flex-col md:p-2">
                    <LoadingBox />
                </div>
            </>
        )
    } else {
        content = <h1>{error}</h1>
    }
    return (
        <div
            className="h-[100%] w-full flex flex-col justify-center items-center "
            style={{
                background: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* //Stories and Blog or title and sub title  */}
            <div className="flex justify-center flex-col items-center mt-12 ">
                <h4 className="text-gray-300">Our Blog</h4>
                <h1 className="font-mont font-black md:text-4xl text-2xl leading-normal">
                    Featured Blogs
                </h1>
            </div>
            {/* main Layout */}
            <div className=" lg:w-[70%] md:w-[80%] w-[90%]  my-4 grid lg:grid-cols-12 grid-cols-1">
                {content}
            </div>
        </div>
    )
}

const MainFeatureBlock = ({
    author,
    categories,
    title,
    // content,
    excerpt,
    thumbnail,
    // tags,
    createdAt,
    // _id,
    slug,
    timetoRead,
}) => {
    const image = thumbnail?.image_url
    return (
        <div className=" min-h-[450px] col-span-5 md:p-2 flex justify-center items-center ">
            <div className="border border-black rounded-md bg-white mx-3 pt-0 pb-2 px-3  flex justify-center items-start flex-col">
                {/* Image block of height half  */}
                <img
                    src={
                        image
                            ? image
                            : 'http://localhost:3000/myUploads/1695713987855-23344655default_img.jpeg'
                    }
                    className="w-full object-contain mb-2 max-h-[250px] pt-2"
                ></img>
                {/* this is Category Blog */}
                <CategoryBlock
                    title={categories?.title}
                    timetoRead={timetoRead}
                />
                {/* title */}
                <h1 className="font-bold font-mont md:text-2xl text-xl my-2">
                    {title?.slice(0, 50)}
                </h1>
                {/* this is excerpt */}
                <p>
                    {ReactHtmlParser(excerpt).slice(0,100)}
                    <Link
                        className="text-blue-600"
                        to={`/blogs/${slug}`}
                    >
                        {' '}
                        Readmore ...
                    </Link>
                </p>
                {/* userprofile */}
                <UserProfileBlock author={author} time={createdAt} />
            </div>
        </div>
    )
}

export default FeaturedBlog
