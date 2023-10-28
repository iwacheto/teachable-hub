import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEnvironment = createAsyncThunk('predictman/fetchEnvironment', async (data) => {
    const urlData = data.data;
    const responseEnvironment = await axios.get(`${process.env.BASE_API_URL}/${data.url}/`);
    const responseDeployment = await axios.get(`${process.env.BASE_API_URL}/teachables/${urlData.user}/${urlData.teachable}/deployments/?page=${urlData.page}&environment=${urlData.environment}&usable=${urlData.usable}&dropdown=${urlData.dropdown}`);
    return { environmentData: responseEnvironment.data, deploymentData: responseDeployment.data }
});

const initialState = {
    environmentData: null,
    deploymentData: null,
    selectedDeployment: null,
    selectedSample: null,
    selectedSampleData: null,
    sampleResult: null,
    isLoading: true,
    showNoResult: false,
    showTime: false,
    time: {
        start: null,
        end: null,
    }
}

const predictmanSlice = createSlice({
    name: 'predictman',
    initialState,
    reducers: {
        setLoader: (state, { payload }) => {
            state.loader = payload;
        },
        setSelectedSample: (state, { payload }) => {
            state.sampleResult = null;
            state.time = { start: null, end: null };
            state.showTime = false;
            state.selectedSample = payload;
        },
        updateSelectedDeployment: (state, { payload }) => {
            state.selectedSampleData = payload;
        },
        setPredictTime: (state, { payload }) => {
            const type = payload.type;
            state.time[type] = payload.value;
            if (type === 'end') state.showTime = true;
        },
        clearPredictTime: (state) => {
            state.time = { start: null, end: null };
            state.showTime = false;
        },
        setSelectedDeployment: (state, { payload }) => {
            state.selectedDeployment = payload;
        },
        setSampleResult: (state, { payload }) => {
            state.sampleResult = payload;
        },
    },
    extraReducers: {
        [fetchEnvironment.pending]: (state) => { },
        [fetchEnvironment.fulfilled]: (state, { payload }) => {
            if (payload.deploymentData.length === 0){
                state.showNoResult = true;
            }else{
                state.showNoResult = false;
            }
            state.environmentData = payload.environmentData;
            state.deploymentData = payload.deploymentData;
            state.isLoading = false;
        },
        [fetchEnvironment.rejected]: (state) => { },
    },
});


export const {
    setLoader,
    setSelectedDeployment,
    setSelectedSample,
    setPredictTime,
    clearPredictTime,
    setSampleResult,
    updateSelectedDeployment
} = predictmanSlice.actions;
export default predictmanSlice.reducer
