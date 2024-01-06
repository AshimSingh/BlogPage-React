import { Skeleton } from 'antd'

const LoadingBox = () => {
    return (
        <div className="lg:w-[60%] md:w-[80%] w-[90%] bg-white rounded-md my-4 shadow-2xl border flex justify-center items-center flex-col overflow-hidden p-4">
            <Skeleton.Image active={true}></Skeleton.Image>
            <br />
            <div className="w-full">
                <br />
                <Skeleton
                    paragraph={{ rows: 4 }}
                    active={true}
                ></Skeleton>
                <br />
                <Skeleton
                    avatar
                    paragraph={{ rows: 0 }}
                    active={true}
                ></Skeleton>
            </div>
        </div>
    )
}

export default LoadingBox
