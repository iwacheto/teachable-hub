import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loader: {
        show: false,
        message: null,
    },
}

const defaultSlice = createSlice({
    name: 'default',
    initialState,
    reducers: {
        setLoader: (state, { payload }) => {
            state.loader = payload;
        },
    },
});


export const { setLoader, } = defaultSlice.actions;
export default defaultSlice.reducer
