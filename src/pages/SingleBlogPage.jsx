/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import CategoryBlock from '../components/CategoryBlock'
import HomeLayout from '../layout/homeLayout'
import { claculateTime } from '../utils/calculateTime'
import './SingleBlog.css'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchComments,
    fetchSingleBlog,
    singleBlogData,
} from '../features/Blog/singleBlogSlice'
import { useParams } from 'react-router-dom'
import { fetchBlogs } from '../features/Blog/blogSlice'
import SpinLoading from '../components/SpinLoading'
// import Sidebar from '../components/Sidebar'
import SmallFeatureBlock from '../components/SmallFeatureBlock'
import BreadCrum from '../components/BreadCurms'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import {
    HeartOutlined,
    HeartFilled,
    DislikeOutlined,
    DislikeFilled,
} from '@ant-design/icons'
import addComment from '../utils/addComment'
import { socket } from '../main'
import { fetchUser } from '../features/User/userSlice'
import ReactHtmlParser from 'react-html-parser'

const SingleBlogPage = () => {
    const dispatch = useDispatch()
    var { slug } = useParams() || 'ashim'
    var data = useSelector(singleBlogData)
    var state = useSelector((state) => state.singleBlog.status)
    var blogStage = useSelector((state) => state.blogs.status)
    var blogData = useSelector((state) => state.blogs.data)
    const userId = localStorage.getItem('userId')
    useEffect(() => {
        if (blogStage == 'idle') {
            dispatch(fetchBlogs({}))
        }
    }, [dispatch, state, blogStage])
    useEffect(() => {
        dispatch(fetchSingleBlog({ slug }))

        if (userId) {
            dispatch(fetchUser({ url: `/users/${userId}` }))
        }
    }, [dispatch, slug, userId])
    //using useprams to send it to bread crums

    var contentComponent
    var sideBarComponent
    if (state === 'succeded' && blogStage === 'succeeded') {
        contentComponent = [
            <div key={2} className=" w-[98%] ml-[2%]">
                {/* {
                console.log(slug)
            } */}
                <BreadCrum key={2} slug={slug} />
            </div>,
            <SingleBlog {...data} key={1} />,
        ]
        sideBarComponent = blogData.map((data) => {
            return (
                <SmallFeatureBlock
                    key={data._id}
                    {...data}
                ></SmallFeatureBlock>
            )
        })
    } else {
        contentComponent = [
            <div key={1} className="min-h-[400px]">
                <SpinLoading />
            </div>,
        ]
    }
    return (
        <HomeLayout
            sideBarTitle={'Similar Blogs'}
            isSingleBlog={true}
            sideBarComponent={sideBarComponent}
            contentComponent={contentComponent}
        ></HomeLayout>
    )
}

const SingleBlog = ({
    author,
    categories,
    title,
    content,
    // excerpt,
    thumbnail,
    tags,
    createdAt,
    timetoRead,
    _id,
}) => {
    const image = thumbnail?.image_url
    const [commentData, setCommentData] = useState([])
    const [comment, setComment] = useState([])
    const [isSomeoneTyping, setIsSomeOneTyping] = useState(false)
    const authorData = useSelector((state) => state.user.data)
    var comments = useSelector((state) => state.singleBlog.comments)
    var room = _id
    socket.emit('join room', room)
    //getting isSomeOneTyping reciving data from socket
    socket.on('Typing', (isOn) => {
        // console.log(isOn, 'here')
        setIsSomeOneTyping(isOn)
    })
    const handelCommentChange = (e) => {
        setComment(e.target.value)
        if (e.target.value) {
            //send to emmit someone is typing
            socket.emit('Typing', true, room)
        } else {
            //emmiting false if input field is empty
            socket.emit('Typing', false, room)
        }
    }

    socket.on('Comment', (author, comment, timestamp) => {
        // defaultData.push({  author,comment,createdAt:timestamp })
        console.log(comment, 'here is err')
        var newArr = [
            { author, text:comment, createdAt: timestamp },
            ...commentData,
        ]
        setCommentData(newArr)
        console.log(commentData,newArr, 'comment data')
    })
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchComments({ id: _id }))
    }, [_id, dispatch])
    useEffect(() => {
        if (comments) {
            setCommentData(comments)
        }
    }, [comments])
    return (
        // main container

        <div className="w-full flex justify-center items-center overflow-hidden relative ">
            <div className="bg-circle"></div>
            <div className="lg:w-[70%] md:w-[80%] w-[90%] flex flex-col justify-center items-center">
                {/* title */}
                <h1 className="md:my-10 my-5 lg:text-5xl md:text-3xl text-2xl font-mont w-full font-extrabold overflow-hidden text-ellipsis">
                    {title}
                    {/* Supercharge Your React Skills: 4 Advanced Patterns to
                Master in 2023 */}
                </h1>
                <div className="w-full">
                    <UserProfileForBlog
                        author={author}
                        time={createdAt}
                    />
                </div>
                {/* image container */}
                <div className="w-full max-h-[400px] my-2">
                    <img
                        src={
                            image
                                ? image
                                : import.meta.env.VITE_DEFAULT_IMG
                        }
                        className="w-full h-full object-contain max-h-[400px]"
                    ></img>
                </div>
                {/* category block */}
                <div className="w-full my-3">
                    <CategoryBlock
                        title={categories.title}
                        timetoRead={timetoRead}
                    />
                </div>
                <div className="flex flex-wrap w-full text-2xl font-poppins">
                    <Tags tags={tags} />
                </div>
                <div>
                    <p className="my-3 font-poppins text-xl leading-loose text-[#242424]">
                        {ReactHtmlParser(content)}
                    </p>
                </div>
                <div className="flex flex-col justify-center items-start w-full p-3">
                    <h1 className="lg:text-4xl md:text-2xl text-xl font-bold font-poppins">
                        User Comments
                    </h1>
                    <div className="flex w-full my-2">
                        {/* comment section */}
                        <form
                            className="bg-gray-100 w-[80%]"
                            onSubmit={(e) => {
                                e.preventDefault()
                                //commenting and set null after complete
                                addComment({
                                    author: authorData,
                                    comment,
                                    room,
                                })
                                socket.emit('Typing', false, room)
                                setComment('')
                            }}
                        >
                            <input
                                placeholder="Add Comment"
                                className="h-[40px] p-2 bg-gray-100 w-full focus:outline-none"
                                value={comment}
                                onChange={handelCommentChange}
                            ></input>
                        </form>
                        <button
                            onClick={() => {
                                addComment({
                                    author: authorData,
                                    comment,
                                    room,
                                })
                                socket.emit('Typing', false, room)
                                setComment('')
                            }}
                            className="bg-blue-500 p-2 text-white"
                        >
                            Submit
                        </button>
                    </div>
                    <div className="flex w-full justify-center">
                        {isSomeoneTyping ? (
                            <h1 className="text-blue-700">
                                ... someone is commenting
                            </h1>
                        ) : null}
                    </div>
                    {commentData?.map((data, index) => {
                        return (
                            <UserComment
                                key={index}
                                {...data}
                            ></UserComment>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
const Tags = ({ tags }) => {
    return tags.map((tag, index) => {
        return (
            <h4 key={index} className="text-2xl font-poppins">
                {`#${tag}\u00A0`}
            </h4>
        )
    })
}

const UserProfileForBlog = ({ author, time }) => {
    var calculatedTime = claculateTime(time)
    return (
        <>
            <Link to={`/user/${author.slug}`}>
                <div className="flex  ">
                    <img
                        className="w-[60px] h-[60px] rounded-full"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                        alt="user image"
                    ></img>
                    <div className="flex-col flex items-center justify-start mx-2">
                        {author ? (
                            <span className="font-semibold ">
                                {author.firstname} {author.lastname}
                            </span>
                        ) : (
                            <h1 className="font-semibold ">
                                Unknown author
                            </h1>
                        )}
                        <span className="text-gray-400 ">
                            {calculatedTime}
                        </span>
                    </div>
                </div>
            </Link>
        </>
    )
}

const UserComment = ({ author, createdAt, text }) => {
    var calculatedTime = claculateTime(createdAt)
    return (
        <Link
            to={` ${author ? `/user/${author.slug}` : '/'}`}
            className="w-full"
        >
            <div className="flex w-full bg-gray-100 p-2 rounded-md my-2">
                <img
                    className="w-[60px] h-[60px] rounded-full"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                    alt="user image"
                ></img>
                <div className="flex-col flex items-start  justify-start mx-2">
                    {author ? (
                        <span className="font-semibold ">
                            {author.firstname} {author.lastname}
                        </span>
                    ) : (
                        <h1 className="font-semibold ">
                            Unknown author
                        </h1>
                    )}
                    <span className="text-gray-400 ">
                        {calculatedTime}
                    </span>
                    <p>{text}</p>
                    {/* reaction buttons */}
                    <div className="w-full my-3">
                        <button
                            className="bg-transparent mx-3"
                            onClick={() => {
                                console.log('hello ashim')
                            }}
                        >
                            <HeartOutlined className="text-red-500 text-2xl" />{' '}
                            Like
                        </button>
                        <button
                            className="bg-transparent mx-3"
                            onClick={() => {
                                console.log('hello ashim')
                            }}
                        >
                            <DislikeOutlined className="text-blue-500 text-2xl" />{' '}
                            Dislike
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}
export default SingleBlogPage
