import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPaginationData } from '../../services/helpers';
import axios from 'axios';

const initialState = {
    data: [],
    teachableData: null,
    pages: 1,
    loading: true,
    isLoading: true,
    activeTab: "Overview",
}

export const fetchTeachables = createAsyncThunk('teachable/fetchTeachables', async (page) => {
    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData)
            const response = await axios.get(`${process.env.BASE_API_URL}/users/${user.username}/teachables/?page=${page}`);
            const pages = getPaginationData(response.headers.link);
            return { data: response.data, pages, };
        }
    }
});

export const fetchTeachable = createAsyncThunk('teachable/fetchTeachable', async (url) => {
    const response = await axios.get(`${process.env.BASE_API_URL}/teachables${url}/`);
    return response.data;
});

const teachableSlice = createSlice({
    name: 'teachable',
    initialState,
    reducers: {
        setActiveTab: (state, { payload }) => {
            state.activeTab = payload;
        },
        clearTeachableData: (state) => {
            state.data = [];
        },
    },
    extraReducers: {
        [fetchTeachables.pending]: (state) => { },
        [fetchTeachables.fulfilled]: (state, { payload }) => {
            state.data = payload.data;
            state.pages = payload.pages;
            state.loading = false
        },
        [fetchTeachables.rejected]: (state) => {
            state.loading = false
        },
        [fetchTeachable.pending]: (state) => { },
        [fetchTeachable.fulfilled]: (state, { payload }) => {
            state.teachableData = payload
            state.isLoading = false
        },
        [fetchTeachable.rejected]: (state) => { },
    },
});


export const { setActiveTab, clearTeachableData } = teachableSlice.actions;
export default teachableSlice.reducer
