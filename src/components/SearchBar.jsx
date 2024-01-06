import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchData } from '../features/Search/searchSlice'
import { search } from '../features/Search/searchSlice'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const SearchBar = ({ isSearchOpen, setSearchBox }) => {
    const [searchedQuery, setSearchedQuery] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        //dispatch when searchedQuery is changed
        if (searchedQuery.length > 3) {
            dispatch(search({ searchedQuery }))
        }
    }, [dispatch, searchedQuery])
    //data
    const data = useSelector(selectSearchData)
    const handelSearch = (e) => {
        setSearchedQuery(e.target.value)
    }
    return (
        <>
            <div
                className="w-[100%]  relative"
                style={{ zIndex: 99 }}
            >
                <form>
                    {/* search bar input */}
                    <div className="flex w-[100%]">
                        <input
                            onClick={() => setSearchBox(isSearchOpen)}
                            value={searchedQuery}
                            onChange={handelSearch}
                            className="search w-[90%] h-[40px] p-2 text-black"
                            placeholder="search"
                        ></input>
                        <Link
                            to="/search"
                            onClick={() => setSearchBox(isSearchOpen)}
                        >
                            <button className="bg-red-400 h-[40px] text-xl text-white  px-2 p-1">
                                Search
                            </button>
                        </Link>
                    </div>
                    {/* ResultBox */}
                    {isSearchOpen ? (
                        <div
                            className="h-[400px] w-[100%] p-2 min-[370px]:block absolute hidden bg-gray-100 text-black overflow-y-scroll"
                            style={{ zIndex: 99 }}
                        >
                            {/* iterating all the result by passing to SearchTile */}
                            {data
                                ? data.map((m) => {
                                      return (
                                          <SearchTile
                                              key={m._id}
                                              {...m}
                                              {...setSearchBox}
                                          />
                                      )
                                  })
                                : null}
                        </div>
                    ) : (
                        ''
                    )}
                </form>
            </div>
        </>
    )
}

const SearchTile = ({
    author,
    // categories,
    slug,
    title,
    // content,
    excerpt,
    thumbnail,
    // tags,
    createdAt,
    _id,
    setSearchBox
}) => {
    const img = thumbnail?.thumbnails[2]?.image_url
    const [characterLimit, setCharacterLimit] = useState(50) // Default character limit
    const [titleCharacterLimit, setTitleCharacter] = useState(40)

    useEffect(() => {
        // Update the character limit based on screen size
        function updateCharacterLimit() {
            if (window.innerWidth >= 768) {
                // Use 120 characters for medium and larger screens (e.g., "md")
                setCharacterLimit(80)
                setTitleCharacter(40)
            } else {
                // Use 50 characters for smaller screens
                setCharacterLimit(50)
                setTitleCharacter(20)
            }
        }

        // Initial update based on window size
        updateCharacterLimit()

        // Add a listener to update character limit when window is resized
        window.addEventListener('resize', updateCharacterLimit)

        // Clean up the listener when the component unmounts
        return () => {
            window.removeEventListener('resize', updateCharacterLimit)
        }
    }, [])

    // Use the slice method to get the specified character limit of the text
    const shortenedText = excerpt.slice(0, characterLimit)
    const shortenedTitle = title.slice(0, titleCharacterLimit)
    return (
        <Link to={`/blogs/${slug}`} onClick={()=>setSearchBox(false)}>
            <div className=" flex   my-4 min-w-[200px] w-full shadow-xl ">
                <div className=" flex justify-center items-center min-w-[100px]">
                    <img
                        // if img otherwise default img
                        src={
                            img
                                ? img
                                : 'http://localhost:3000/myUploads/1695713987855-23344655default_img.jpeg'
                        }
                        className="h-[100px] w-[100px] object-contain"
                    ></img>
                </div>

                {/* show title and excerpt and userName */}
                <div className=" p-3 text-ellipsis overflow-hidden">
                    <h1 className="sm:text-2xl text-xl font-medium font-mono text-ellipsis">
                        {title.length > 30
                            ? shortenedTitle + '...'
                            : title}
                    </h1>
                    <p className="text-clip text-sm font-poppins">
                        {shortenedText}...
                    </p>
                    <span className="font-medium">
                        Author:{' '}
                        {author ? author.firstname : 'Unknown User'}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default SearchBar
