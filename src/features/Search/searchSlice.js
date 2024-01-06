import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../config/axiosinstance'

const initialState = {
    data: [],
    searchedQuery: '',
    // fromdate:'',
    // todate:'',
    status: 'idle',
    currentPage: '',
    totalCount: '',
    error: null,
}

const searchSlice = createSlice({
    name: 'searchResults',
    initialState,
    reducers: {
        addSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload.searchedQuery
            state.fromdate = action.payload.fromdate
            state.todate = action.payload.todate
        },
    },
    extraReducers(builder) {
        builder
            .addCase(search.fulfilled, (state, action) => {
                state.data = action.payload.data
                state.status = 'succeeded'
                state.totalCount = action.payload.totalCount
                state.currentPage = action.payload.currentPage
                state.fromdate = ''
                state.todate = ''
            })
            .addCase(search.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(search.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export const search = createAsyncThunk(
    'search',
    async (
        {
            searchedQuery = '',
            fromdate = '',
            todate = '',
            limit = '',
            page = '',
        },
        { dispatch }
    ) => {
        try {
            console.log(searchedQuery, todate, fromdate)
            dispatch(
                addSearchedQuery({ searchedQuery, todate, fromdate })
            )
            const response = await axios.get(
                `/blogs?search=${searchedQuery}&&fromdate=${fromdate}&&todate=${todate}&&limit=${limit}&&page=${page}`
            )
            return response.data
        } catch (error) {
            console.log(error)
            return error.data
        }
    }
)
export const { addSearchedQuery } = searchSlice.actions
export default searchSlice.reducer
export const selectSearchData = (state) => state.search.data
