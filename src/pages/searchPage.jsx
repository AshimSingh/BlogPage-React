import BlogList from '../components/BlogList'
import FilterTile from '../components/FilterTile'
import HomeLayout from '../layout/homeLayout'
import PageInition from '../components/pageInition'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { search } from '../features/Search/searchSlice'

const SearchPage = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.search.data)
    const status = useSelector((state) => state.search.status)
    const error = useSelector((state) => state.search.error)
    const searchedQuery = useSelector(
        (state) => state.search.searchedQuery
    )
    const fromdate = useSelector((state) => state.search.fromdate)
    const todate = useSelector((state) => state.search.todate)
    const onPageInitionChange = (page, pageSize) => {
        console.log(page, pageSize)
        dispatch(
            search({
                limit: pageSize,
                page,
                searchedQuery,
                fromdate,
                todate,
            })
        )
    }
    const totalCount = useSelector((state) => state.search.totalCount)
    const currentPage = useSelector(
        (state) => state.search.currentPage
    )
    // eslint-disable-next-line no-unused-vars
    const [selectedButton, setSelectedButton] = useState('title')
    const contentComponents = [
        <FilterTile key={1} setSelectedButton={setSelectedButton} />,
        <BlogList
            key={2}
            data={data}
            status={status}
            error={error}
        />,
        <PageInition
            key={3}
            totalCount={totalCount}
            currentPage={currentPage}
            onPageInitionChange={onPageInitionChange}
        />,
    ]
    const sideBarComponents = [
        // <FilterTile key={1} setSelectedButton={setSelectedButton} />,
    ]
    return (
        <>
            <HomeLayout
                contentComponent={contentComponents}
                sideBarComponent={sideBarComponents}
            ></HomeLayout>
        </>
    )
}

export default SearchPage
