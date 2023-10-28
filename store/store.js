import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import defaultReducer from './default/defaultSlice';
import authReducer from './auth/authSlice';
import teachableReducer from './teachable/teachableSlice';
import predictmanReducer from './predictman/predictmanSlice';

export const store = configureStore({
    reducer: {
        default: defaultReducer,
        auth: authReducer,
        teachable: teachableReducer,
        predictman: predictmanReducer,
    },
});