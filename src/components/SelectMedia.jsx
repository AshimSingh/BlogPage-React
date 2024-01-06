import { Button, Modal } from 'antd'
import { useEffect, useState } from 'react'
import MediaList from './MediaList'
import { UploadOutlined } from '@ant-design/icons'
import './modalstyle.css'
import { useDispatch } from 'react-redux'
import { getMedia } from '../features/Media/mediaSlice'
import { useSelector } from 'react-redux'
import PageInition from '../components/pageInition'

const SelectMedia = ({ setMedia }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setMedia('')
        setIsModalOpen(false)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMedia({}))
    }, [])
    const totalCount = useSelector((state) => state.media.totalCount)
    const currentPage = useSelector(
        (state) => state.media.currentPage
    )
    const [pageSize, setPageSize] = useState(20)
    const onPageInitionChange = (page, pageSize) => {
        dispatch(
            getMedia({
                url: `/media?page=${page}&&limit=${pageSize}`,
            })
        )
        setPageSize(pageSize)
    }

    return (
        <div>
            <Button
                type="primary"
                className="bg-blue-500"
                onClick={showModal}
                icon={<UploadOutlined />}
            >
                Upload
            </Button>
            <Modal
                title="Select Media"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                className="modal"
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        className="bg-blue-500"
                        onClick={handleOk}
                    >
                        Submit
                    </Button>,
                ]}
                centered={true}
                style={{
                    // height:'50vh',
                    // overflowY:'scroll'
                    width: '50%',
                }}
            >
                <div className="max-h-[300px] overflow-y-scroll">
                    <MediaList
                        isSelectMediaComponent={true}
                        setMedia={setMedia}
                    />
                    <PageInition
                        currentPage={currentPage}
                        totalCount={totalCount}
                        pageSize={pageSize}
                        onPageInitionChange={onPageInitionChange}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default SelectMedia
