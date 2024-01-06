import LoadingBox from './LoadingBox'
import Blog from './Blog'
import { createContext } from 'react'
import { useState } from 'react'
import { EditBlog } from '../pages/DashBordPostPage'

// eslint-disable-next-line react/prop-types
export const EditContext = createContext(null)
const BlogList = ({
    data,
    status,
    error,
    wfull,
    isDashBoardComponent,
}) => {
    //for edit form
    const [open, setOpen] = useState(false)
    const [dataToEdit, setDataToEdit] = useState({})
    const showDrawer = (data) => {
        setDataToEdit(data)
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }
    var contextValue = { showDrawer, open }
    var content
    if (status == 'loading') {
        content = [1, 2, 3].map((item, index) => (
            <LoadingBox key={index} />
        ))
    } else if (status == 'succeeded') {
        // eslint-disable-next-line react/prop-types
        content = (
            <EditContext.Provider value={contextValue}>
                {data.map((m) => {
                    return (
                        <Blog
                            key={m.id}
                            {...m}
                            wfull={wfull}
                            isDashBoardComponent={
                                isDashBoardComponent
                            }
                        />
                    )
                })}
            </EditContext.Provider>
        )
    } else {
        content = <h1>{error}</h1>
    }
    return (
        <div className="w-full flex flex-col justify-center items-center ">
            {content}
            <EditBlog
                onClose={onClose}
                open={open}
                data={dataToEdit}
            />
        </div>
    )
}

export default BlogList
