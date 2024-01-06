import { HomeOutlined, BookOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'

// eslint-disable-next-line react/prop-types
const BreadCrum = ({ slug }) => {
    return (
        <Breadcrumb
            items={[
                {
                    href: '/',
                    title: (
                        <>
                            <HomeOutlined />
                            <span>Home</span>
                        </>
                    ),
                },
                {
                    href: '/Blogs',
                    title: (
                        <>
                            <BookOutlined />
                            <span>Blogs</span>
                        </>
                    ),
                },
                {
                    title: (
                        <>
                            <span>{slug}</span>
                        </>
                    ),
                },
            ]}
        />
    )
}

export default BreadCrum
