const CategoryBlock = ({ title, timetoRead }) => {
    return (
        <div className="flex flex-wrap justify-start overflow-hidden text-ellipsis items-center">
            <div className="bg-black text-white rounded-full p-1 px-4 ">
                {title ? title.slice(0, 10) + '...' : 'News'}
            </div>
            <h4 className="text-gray-400 mx-3">
                {timetoRead ? timetoRead : ''}
            </h4>
        </div>
    )
}

export default CategoryBlock
