import { Link } from 'react-router-dom'
import { Skeleton } from 'antd'

const Sidebar = ({ data, status, heading }) => {
    var content
    if (data.length > 0) {
        content = data.map((info) => {
            return <SideBarTile key={info._id} {...info} />
        })
    } else {
        content = [0, 1, 2, 3, 4].map((key) => {
            return (
                <Skeleton key={key} avatar paragraph={{ rows: 0 }} />
            )
        })
    }
    return (
        <div className="w-full flex flex-col justify-center items-center mt-5 p-2">
            {/* heading of sideBar */}
            <h1 className="font-mont text-2xl font-bold">
                {heading}
            </h1>
            {content}
        </div>
    )
}

const SideBarTile = ({
    title,
    thumbnail,
    description,
    _id,
    slug,
}) => {
    const image = thumbnail?.thumbnails[0]?.image_url
    return (
        <Link to={`/category/${slug}`} className="w-full">
            <div className="w-full flex justify- items-center border hover:bg-slate-100  rounded-md p-1 my-3">
                {/* image div */}
                <div className="h-[50px] w-[50px]   ">
                    {/* if imgage other wise default img */}
                    <img
                        src={
                            image
                                ? image
                                : 'http://localhost:3000/myUploads/1695713987855-23344655default_img.jpeg'
                        }
                        // src={
                        //     'http://localhost:3000/myUploads/1695713987855-23344655default_img.jpeg'
                        // }
                        className="h-full w-full object-cover  rounded-full"
                    ></img>
                </div>
                <div className="font-mont text-xl mx-3 text-overflow: ellipsis">
                    {title.length > 8
                        ? title.slice(0, 8) + '...'
                        : title}
                </div>
            </div>
        </Link>
    )
}
export default Sidebar
