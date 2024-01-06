import { useEffect, useState, createContext,useRef } from 'react'
import DashBoardPostPage from './DashBordPostPage'
import {
    UploadOutlined,
    UserOutlined,
    HomeOutlined,
    PlusCircleOutlined,
    AppstoreAddOutlined,
    DeleteOutlined,
    BlockOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons'
import { Layout, Menu, Button, theme, ConfigProvider } from 'antd'
import CategoryList from '../components/CategoryList'
import MediaPage from './MediaPage'
import AddCategory from '.././components/AddCategoryForm'
import AddBlog from './AddBlog'
import EditUserPage from './EditUserPage'
import DeleteUserPage from './DeleteUserPage'
import SpinLoading from '../components/SpinLoading'
import Logout from '../utils/Logout'
import { Route,Routes, useNavigate } from 'react-router-dom'
// import DashBoardHomePage from './DashBordHomePage';
export const MenuContext = createContext()

const { Sider, Content } = Layout
const DashBoardPage = () => {
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: { colorBgContainer },
    } = theme.useToken()
    const items = [
        {
            key: '0',
            icon: <HomeOutlined />,
            element: <DashBoardPostPage />,
            label: 'Post',
        },
        {
            key: '1',
            icon: <PlusCircleOutlined />,
            element: <AddBlog />,
            label: 'New Post',
        },
        {
            key: 'sub1',
            icon: <UserOutlined />,
            label: 'User',
            children: [
                {
                    key: '2',
                    label: 'Edit Profile',
                    element: <EditUserPage />,
                },
                {
                    key: '3',
                    danger: true,
                    label: 'Delete Account',
                    element: <DeleteUserPage />,
                },
                {
                    key: '6',
                    danger: true,
                    label: 'Logout',
                    // element: <h1>Loging out...</h1>,
                    element: <Logout />,
                },
            ],
        },
        {
            key: 'sub2',
            label: 'Category',
            icon: <BlockOutlined />,
            children: [
                {
                    key: '4',
                    label: 'Category',
                    icon: <BlockOutlined />,
                    element: <CategoryList />,
                },
                {
                    key: '5',
                    label: 'Add Category',
                    icon: <AppstoreAddOutlined />,
                    element: <AddCategory />,
                },
            ],
        },
        {
            key: 'sub3',
            label: 'Media',
            icon: <UploadOutlined />,
            element: <MediaPage />,
        },

        // {
        //     key: '5',
        //     icon: <FileOutlined />,
        //     element: <DashBoardHomePage />,
        // },
    ]
    const [key, setKey] = useState('0')
    const HandelClick = (e) => {
        setKey(e.key)
        // useNavigate(e.key)
    }
    // useEffect(() => {
        
    //   }, [key]);
    // const menuRef = useRef(null)
    return (
        <MenuContext.Provider value={{setKey}}>
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={200} // Set the width of the sidebar
                    style={{
                        position: 'fixed',
                        height: '100vh',
                        zIndex: 1,
                    }}
                >
                    <div className="demo-logo-vertical" />
                    <ConfigProvider
                        theme={{
                            components: {
                                Menu: {
                                    iconSize: 18,
                                    collapsedIconSize: 20,
                                },
                            },
                        }}
                    >
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['0']}
                            // openKeys={[key]}
                            items={items}
                            onClick={HandelClick}
                            style={{
                                fontSize: '18px',
                                collapsedIconSize: '22',
                            }}
                        />
                    </ConfigProvider>
                </Sider>
                <Layout
                    style={{
                        marginLeft: collapsed ? 80 : 200, // Adjust left margin when collapsed
                        transition: '0.2s',
                    }}
                >
                    <Button
                        type="text"
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            position: 'fixed', // Fixed position for the button
                            top: 0, // Position at the top
                            zIndex: 1, // Make sure it's above the content
                            left: collapsed ? 80 : 200, // Adjust left margin when collapsed
                            transition: '0.2s',
                        }}
                    />
                    <Content
                        style={{
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <div className="min-h-screen">
                            {items.map((m) => {
                                return (
                                    <div
                                        className="flex w-full   justify-center"
                                        key={m.key}
                                    >
                                        {m.key === key
                                            ? m.element
                                            : null}
                                        {m.children
                                            ? m.children.map(
                                                  (children) => {
                                                      if (
                                                          children.key ===
                                                          key
                                                      ) {
                                                          return children.element
                                                      }
                                                      return null
                                                  }
                                              )
                                            : null}
                                    </div>
                                )
                            })}
                            {/* <DashContent/> */}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </MenuContext.Provider>
    )
}
export default DashBoardPage
