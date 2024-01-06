import { claculateTime } from '../utils/calculateTime'
import { Link } from 'react-router-dom'

const UserProfileBlock = ({ author, time, isDashBoardComponent }) => {
    var calculatedTime = claculateTime(time)
    return (
        <div className="flex flex-wrap md:flex-row flex-col w-full md:justify-between md:items-center items-start ">
            {isDashBoardComponent ? null : (
                <div className="flex items-center">
                    <Link
                        to={`${
                            author?.slug
                                ? `/user/${author.slug}`
                                : '#'
                        }`}
                    >
                        <img
                            className="w-[50px] h-[50px] rounded-full"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                            alt="user image"
                        ></img>
                    </Link>
                    {author ? (
                        <Link
                            to={`${
                                author?.slug
                                    ? `/user/${author.slug}`
                                    : '#'
                            }`}
                        >
                            <span className="font-semibold mx-2">
                                {author.firstname} {author.lastname}
                            </span>
                        </Link>
                    ) : (
                        <h1 className="font-semibold mx-2">
                            Unknown author
                        </h1>
                    )}
                </div>
            )}
            <span className="text-gray-400 my-2">
                {time ? `${calculatedTime}` : null}
            </span>
        </div>
    )
}

export default UserProfileBlock
