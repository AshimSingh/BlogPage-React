import { useState } from 'react'
import Logo from '../assets/MervixLogo.png'
import { NavLink, useLocation, Link } from 'react-router-dom'
import { Dropdown } from 'antd'
import SearchBar from './SearchBar'
import { Button } from 'antd'

const Navbar = () => {
    const [isOpen, setOpen] = useState(false)
    const changeState = (state) => {
        setOpen(!state)
    }
    const navItem = [
        {
            name: 'Home',
            icon: 'fa-solid fa-house ',
            link: '/',
        },
        {
            name: 'Categories',
            icon: 'fa-solid fa-file-circle-plus',
            link: '/categories',
        },
        {
            name: 'DashBoard',
            icon: 'fa-solid fa-gauge',
            link: '/dashboard',
        },
        {
            name: 'SignUp',
            icon: '',
            link: '/signup',
        },
        {
            name: 'SignIn',
            icon: '',
            link: '/signin',
        },
        // {
        //     name: 'Logout',
        //     icon: '',
        //     link: '/logout',
        // },
    ]
    const location = useLocation()
    // use isActive to hilight active nav button red it returns true if location.pathname matches passed path
    const isActive = (path) => {
        return location.pathname === path
    }
    const [isSearchOpen, setisSearchOpen] = useState(false)
    const setSearchBox = () => {
        setisSearchOpen(!isSearchOpen)
    }
    const token = localStorage.getItem('token')
    return (
        <div>
            {/* div which covers whole screen with bg shadow opens when clicked on search bar and when clicked on this div it is hidden */}
            {isSearchOpen ? (
                <div
                    onClick={() => {
                        setSearchBox(isSearchOpen)
                    }}
                    className="h-screen w-[100%] fixed min-[370px]:flex hidden  top-0 bg-backgroundShadow "
                    style={{ zIndex: 5 }}
                ></div>
            ) : (
                ''
            )}
            {/* //whole container */}
            <div className="w-[100%] bg-slate-600 flex lg:flex-row flex-col  justify-center items-center px-4  shadow-md ">
                {/* middle part with width 80% */}
                <div className="lg:flex lg:justify-between justi   items-center  p-2  lg:w-[95%] md:w-[98%] w-[90%]">
                    {/* with Ham menu and profile img  in lg width is given 10 and in sm md device width is 100%*/}
                    <div className="flex justify-between lg:w-[10%] md:w-[100%]">
                        {/* logo of brand */}
                        <Link to="/">
                            <img
                                src={Logo}
                                className="sm:w-[150px] w-[100px]"
                            ></img>
                        </Link>
                        {/* ImageDropdown with profile picture */}
                        <div className="flex">
                            {/* <div className="lg:hidden flex">
                                <ImageDropdown />
                            </div> */}
                            <button
                                className="lg:hidden"
                                onClick={() => changeState(isOpen)}
                            >
                                {isOpen ? (
                                    <i className="fa-solid fa-x text-2xl"></i>
                                ) : (
                                    <i className="fa-solid fa-bars text-2xl"></i>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* list of navs */}
                    <nav
                        className={`justify-between items-center font-mono md:text-xl text-2xl text-white  lg:w-[70%] w-[100%]  ${
                            isOpen
                                ? 'flex flex-col my-8'
                                : 'hidden lg:flex '
                        }`}
                    >
                        {/* map first two element then other after search bar */}
                        {navItem.slice(0, 2).map((data, index) => {
                            return (
                                <NavLink
                                    key={index}
                                    to={`${data.link}`}
                                    className={`flex lg:flex-col md:flex-row md:justify-center md:items-center list-none md:py-0 py-4 mx-2 ${
                                        isActive(data.link)
                                            ? 'text-red-400'
                                            : ''
                                    }`}
                                >
                                    {data.icon ? (
                                        <i
                                            className={`${data.icon} lg:mx-0 mx-2`}
                                        ></i>
                                    ) : (
                                        ''
                                    )}
                                    {data.name}
                                </NavLink>
                            )
                        })}

                        {/* searchBar and search button */}
                        <div className="lg:flex hidden w-[100%]">
                            <SearchBar
                                isSearchOpen={isSearchOpen}
                                setSearchBox={setSearchBox}
                            />
                        </div>

                        {navItem
                            .slice(2, navItem.length)
                            .map((data, index) => {
                                return (
                                    <>
                                        {token ? (
                                            data.name ===
                                            'DashBoard' ? (
                                                <NavLink
                                                    key={index}
                                                    to={`${data.link}`}
                                                    className={`lg:flex md:flex flex-col md:justify-center md:items-center list-none md:py-0 py-4 mx-2 ${
                                                        isActive(
                                                            data.link
                                                        )
                                                            ? 'text-red-400'
                                                            : ''
                                                    }`}
                                                >
                                                    {data.icon ? (
                                                        <i
                                                            className={`${data.icon} md:mx-0 mx-2`}
                                                        ></i>
                                                    ) : (
                                                        ''
                                                    )}
                                                    {data.name}
                                                </NavLink>
                                            ) : null
                                        ) : data.name === 'Logout' ||
                                          data.name ===
                                              'DashBoard' ? null : (
                                            <NavLink
                                                key={index}
                                                to={`${data.link}`}
                                                className={`md:flex lg:hidden  flex-col md:justify-center md:items-center list-none md:py-0 py-4 mx-2 ${
                                                    isActive(
                                                        data.link
                                                    )
                                                        ? 'text-red-400'
                                                        : ''
                                                }`}
                                            >
                                                {data.icon ? (
                                                    <i
                                                        className={`${data.icon} md:mx-0 mx-2`}
                                                    ></i>
                                                ) : (
                                                    ''
                                                )}
                                                {data.name}
                                            </NavLink>
                                        )}
                                    </>
                                )
                            })}
                    </nav>
                    {token ? (
                        <>
                            <div className="hidden lg:flex">
                                <ImageDropdown />
                            </div>
                        </>
                    ) : (
                        <div className="lg:block hidden">
                            <Link to="/signin">
                                <Button
                                    type="primary"
                                    className="bg-blue-500 mx-2"
                                >
                                    Sign In
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button
                                    type="primary"
                                    danger
                                    className=" border text-white font-xl  mx-2"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
                {/*  profile img */}

                <div className="lg:hidden p-2 lg:w-[80%] md:w-[98%] w-[90%]">
                    <SearchBar
                        isSearchOpen={isSearchOpen}
                        setSearchBox={setSearchBox}
                    />
                </div>
            </div>
        </div>
    )
}

export const ImageDropdown = () => {
    const items = [
        {
            key: '1',
            label: (
                <div>
                    <i className="fa-solid fa-user text-blue-600 mx-2"></i>
                    <NavLink to="/editprofile">Profile</NavLink>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div>
                    <i className="fa-solid fa-gauge text-blue-600 mx-2"></i>
                    <NavLink to="/dashboard">DashBoard</NavLink>
                </div>
                
            ),
        },
        {
            key: '3',
            label: (
               <div>
                    <i className="fa-solid fa-right-from-bracket text-blue-600 mx-2"></i>
                    <NavLink to="/logout">Logout</NavLink>
               </div>
            ),
        },
    ]
    return (
        <>
            <Dropdown
                menu={{ items }}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
            >
                <div className="rounded-full mx-2 ">
                    <img
                        src={Logo}
                        className="w-[50px] h-[50px] rounded-full "
                    ></img>
                </div>
            </Dropdown>
        </>
    )
}

export default Navbar
