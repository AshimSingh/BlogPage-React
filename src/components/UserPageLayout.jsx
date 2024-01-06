import { Empty, Divider } from 'antd'
import BlogList from './BlogList'
import UserProfileBlock from './UserProfileBlock'
import UserEdit from './UserEdit'
import ReactHtmlParser from 'react-html-parser'

const UserPageLayout = ({
    blogData,
    blogCount,
    blogError,
    blogStatus,
    userData,
    usersData,
    isDashBoardComponent,
}) => {
    const { firstname, lastname, aboutme } = userData
    console.log(blogData.length)
    return (
        <div className="h-full min-h-[400px] w-[100%] flex  items-center flex-col ">
            {/* background */}
            <div className="w-full h-32 bg-gradient-to-r from-green-300 to-blue-500"></div>
            {/* user name & pic */}
            <div className="md:w-[90%] w-[98%]  flex sm:flex-row flex-col">
                {/* user profile pic */}
                <div className="relative  h-[100px] w-[160px]">
                    <img
                        className="h-[150px] w-[150px] rounded-full absolute top-[-50px]"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                    ></img>
                </div>
                {/* user name */}
                <div className="flex m-2">
                    <div>
                        <h1 className="text-3xl font-bold font-poppins">
                            {firstname + ' '}
                            {lastname}
                        </h1>
                        <h4 className="text-base font-semibold text-gray-300">
                            Joined Aug 5 2023
                        </h4>
                    </div>
                    {/* edit profile button */}
                    {/* <Button className="mx-2" icon={<EditOutlined/>}>Edit</Button> */}
                    {isDashBoardComponent ? <UserEdit /> : null}
                </div>
            </div>
            {/* main content */}
            <div className="md:w-[90%] w-[98%]  grid md:grid-cols-12 grid-cols-1 mt-2">
                <div
                    className={`${
                        usersData ? 'col-span-7' : 'col-span-12'
                    }   lg:p-5 p-2`}
                >
                    {/* aboutme */}
                    <div className=" p-3">
                        <p className="text-base font-semibold ">
                            {aboutme ? (
                                ReactHtmlParser(aboutme)
                            ) : (
                                <>
                                    <h2>About Me</h2>
                                    <p>
                                        Hello there! 👋 I'm{' '}
                                        {firstname}. I'm on a journey
                                        to explore and contribute to
                                        the ever-evolving world of
                                        technology.
                                    </p>
                                    <h3>Skills & Expertise</h3>
                                    <ul>
                                        <li>- Singing 🎤🎶</li>
                                        <li>- Dancing 💃🕺</li>
                                        <li>- Programming 💻👨‍💻🖥️</li>
                                    </ul>
                                </>
                            )}
                        </p>
                    </div>
                    <Divider style={{ height: '5px' }} />
                    {/* activities */}
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold font-poppins">
                            Activities
                        </h1>
                        {/* container */}
                        <div className="flex mt-2 justify-evenly">
                            {/* total blogs */}
                            <div className="flex">
                                <i className="fa-solid fa-book text-2xl bg-gray-200 p-2 px-4 rounded-md"></i>
                                <div className="flex flex-col ml-2">
                                    <span className="text-xl font-semibold">
                                        {blogCount ? blogCount : 0}
                                    </span>
                                    <span className="text-gray-400">
                                        Blogs
                                    </span>
                                </div>
                            </div>
                            {/* likes */}
                            <div className="flex">
                                <i className="fa-solid fa-heart text-2xl text-blue-500 bg-gray-200 p-2 px-4 rounded-md"></i>
                                <div className="flex flex-col ml-2">
                                    <span className="text-xl font-semibold">
                                        72
                                    </span>
                                    <span className="text-gray-400">
                                        Likes
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* more Blogs from user */}
                    <div className="w-full mt-12 flex flex-col ">
                        <h1 className="md:text-3xl text-2xl font-poppins font-semibold ">
                            Blogs From {firstname}
                        </h1>
                        {blogData.length > 0 ? (
                            <>
                                <BlogList
                                    key={1}
                                    data={blogData}
                                    status={blogStatus}
                                    isDashBoardComponent={
                                        isDashBoardComponent
                                    }
                                    error={blogError}
                                    wfull={true}
                                />
                            </>
                        ) : (
                            <Empty />
                        )}
                    </div>
                </div>
                {/* if users data is given then show  */}
                {usersData ? (
                    <div className="col-span-5 ">
                        <h1 className="md:text-3xl text-2xl font-poppins font-semibold ">
                            Other Users
                        </h1>
                        {usersData.map((data) => {
                            return (
                                <UserProfileBlock
                                    key={data._id}
                                    author={data}
                                />
                            )
                        })}
                    </div>
                ) : null}
            </div>
        </div>
    )
}
export default UserPageLayout
