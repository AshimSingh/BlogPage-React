import Sidebar from '../components/Sidebar'

const HomeLayout = ({
    contentComponent,
    sideBarComponent,
    sideBarTitle,
    isSingleBlog,
}) => {
    return (
        <div className="grid lg:grid-cols-12 grid-cols-1  w-full ">
            {/* //side bar content */}
            <div
                className={`w-full border ${
                    isSingleBlog ? 'col-span-3 p-2' : 'col-span-2'
                }  hidden lg:flex flex-col items-center`}
            >
                {sideBarTitle ? (
                    <h1 className="text-2xl font-poppins font-medium text-ellipsis overflow-hidden">
                        {sideBarTitle}
                    </h1>
                ) : null}
                {sideBarComponent
                    ? sideBarComponent.map((component, index) => {
                          return (
                              <div
                                  className="w-full flex justify-center items-center"
                                  key={index}
                              >
                                  {component}
                              </div>
                          )
                      })
                    : null}
            </div>

            {/* //main Content */}
            <div
                className={`w-[100%] flex flex-col justify-center items-center ${
                    isSingleBlog ? 'col-span-9' : 'col-span-10'
                } `}
            >
                {contentComponent.map((component, index) => {
                    return (
                        <div
                            className="w-full flex justify-center items-center"
                            key={index}
                        >
                            {component}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HomeLayout
