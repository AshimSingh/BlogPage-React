import { Pagination } from 'antd'

const PageInition = ({
    currentPage,
    totalCount,
    onPageInitionChange,
    pageSize = 3,
}) => {
    // const dispatch = useDispatch()
    // const totalCount = useSelector((state) => state.blogs.totalCount)
    // const currentPage = useSelector(
    //     (state) => state.blogs.currentPage
    // )

    return (
        <div className="my-8 ">
            {/* <Pagination defaultCurrent={1} total={500} pageSize={3} responsive={true} pageSizeOptions={[10, 20, 50, 100]} /> */}
            <Pagination
                defaultCurrent={1}
                total={totalCount}
                pageSize={pageSize}
                responsive={true}
                pageSizeOptions={[10, 20, 50, 100]}
                current={currentPage}
                showSizeChanger={true}
                onChange={(page, pageSize) =>
                    onPageInitionChange(page, pageSize)
                }
            />
        </div>
    )
}

export default PageInition
