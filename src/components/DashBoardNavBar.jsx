const DashboardNavBar = ({
    onSearchBarChange,
    searchQuery,
    // handelSearchForChange,
}) => {
    return (
        // <div className="h-[8%] min-h-[50px]  w-full flex items-center lg:p-4 p-2 justify-between  ">
        <div className="min-h-[30px] h-full flex shadow-lg min-w-[100px] bg-white rounded-md">
            <form className="w-full bg-transparent">
                <input
                    type="text"
                    placeholder={`Search `}
                    onChange={onSearchBarChange}
                    value={searchQuery}
                    className=" w-full rounded-md outline-none px-2 min-h-[30px] h-full"
                ></input>
            </form>
            {/* option to change search for */}
            {/* <select
                    className="rounded-r-md bg-gray-50 outline-none"
                    onChange={handelSearchForChange}
                >
                    <option value={'blog'}>Blog</option>
                    <option value={'category'}>Category</option>
                </select> */}
        </div>
        // </div>
    )
}
export default DashboardNavBar
