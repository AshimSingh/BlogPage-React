import { Spin } from 'antd'

function SpinLoading() {
    return (
        <div className="absolute h-full w-full bg-[#fafafab5] flex justify-center items-center top-0 left-0 z-99">
            <div className=" h-16 w-full">
                <Spin tip="Loading" size="large">
                    <div className="content"></div>
                </Spin>
            </div>
        </div>
    )
}

export default SpinLoading
