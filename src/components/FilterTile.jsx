import { useState, useEffect } from 'react'
import { DatePicker } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { search } from '../features/Search/searchSlice'

// eslint-disable-next-line react/prop-types
const FilterTile = () => {
    const dispatch = useDispatch()
    // const defaultColor ='bg-white text-black border border-black'
    // const clickedColor = 'bg-blue-500 text-white '
    // const [buttonState,setButtonState] = useState({
    //     title:clickedColor,
    //     author: defaultColor,
    //     content:defaultColor

    // })

    const [fromdate, setFromdate] = useState('')
    const [todate, setTodate] = useState('')
    const buttonList = [
        {
            displayname: 'Author',
            value: 'author',
        },
    ]
    const handleClick = (e) => {
        //     console.log(e.target.name,'hey')
        //     e.preventDefault()
        //     setSelectedButton(e.target.name)
        //     setButtonState({
        //         ...buttonState,
        //         [e.target.name]:buttonState[e.target.name]===clickedColor?defaultColor:clickedColor
        // })
    }
    const searchedQuery = useSelector(
        (state) => state.search.searchedQuery
    )
    const handelDateChange = (date, dateString, dateInputName) => {
        if (dateInputName === 'from') {
            setFromdate(dateString)
        } else {
            setTodate(dateString)
        }
        //if any filter is changed then dispatch
        // console.log(fromdate, todate, 'hey date')
        // dispatch(search({ searchedQuery, fromdate, todate }))
    }
    useEffect(() => {
        // Log the updated fromDate and toDate whenever they change

        // Dispatch the search action when either fromdate or todate changes
        if (fromdate || todate) {
            dispatch(search({ searchedQuery, fromdate, todate }))
        }
    }, [fromdate, todate])

    return (
        //appluing filters
        // <div className="w-full grid grid-cols-2 p-2" lg:w-[60%] md:w-[80%] w-[90%]>
        <div className=" w-full flex justify-center items-center flex-col p-2 ">
            <div className="w-full">
                <h1 className="text-2xl font-medium">Filters:</h1>
            </div>
            <div className="w-full flex flex-wrap justify-evenly items-center  p-2">
                {/* <button className={`${buttonState.title} font-medium p-2 rounded-md m-1 `} name="titleBtn" onClick={handleClick}>Title</button> */}
                {
                    // buttonList.map((data,index)=>{
                    //     return(
                    //         <button key={index} className={`${buttonState[data.value]} font-medium p-2 px-4 rounded-md m-1 `} name={data.value} onClick={handleClick}>{data.displayname}</button>
                    //     )
                    // })
                }
                <div>
                    {/* from to date picker when change it calls handelDateChange */}
                    <h4>From: </h4>
                    <DatePicker
                        onChange={(date, dateString) =>
                            handelDateChange(date, dateString, 'from')
                        }
                        name="from"
                    />
                </div>
                <div>
                    <h4>To: </h4>
                    <DatePicker
                        onChange={(date, dateString) =>
                            handelDateChange(date, dateString, 'to')
                        }
                        name="to"
                    />
                </div>
            </div>
        </div>
    )
}
export default FilterTile
