import logo from '../assets/MervixLogo.png'

const Footer = () => {
    const companyList = [
        {
            name: 'About Us',
            link: '/aboutus',
        },
        {
            name: 'Contact Us',
            link: '/contactus',
        },
        {
            name: 'Leadership',
            link: '/leadership',
        },
    ]
    return (
        // background div
        <div className="bg-primaryColor flex justify-center items-center">
            {/* one component in sm device two in md and 4 in lg */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:w-[90%] w-[100%] justify-center  md:my-12 lg:my-6">
                <Tile
                    logo={logo}
                    title={'Company'}
                    sublist={companyList}
                />
                <Tile title={'Contact Us'} sublist={companyList} />
                <Tile title={'Contact Us'} sublist={companyList} />
                <Tile title={'Contact Us'} sublist={companyList} />
            </div>
        </div>
    )
}

const Tile = ({ title, sublist, logo }) => {
    return (
        <>
            <div className="flex flex-col justify-center items-center  m-2">
                <div className=" h-[50px] w-[120px]">
                    {logo ? (
                        <img
                            src={logo}
                            className="w-[100%] h-[100%]"
                        ></img>
                    ) : (
                        ''
                    )}
                </div>
                <div className=" flex flex-col justify-center items-center  m-2">
                    <h1 className="text-slate-50 text-2xl font-semibold m-2">
                        {title}
                    </h1>
                    {sublist
                        ? sublist.map((m, index) => {
                              return (
                                  <a
                                      key={index}
                                      className="text-slate-300 hover:text-slate-50 text-xl"
                                      href={m.link}
                                  >
                                      {m.name}
                                  </a>
                              )
                          })
                        : ''}
                </div>
            </div>
        </>
    )
}
export default Footer
