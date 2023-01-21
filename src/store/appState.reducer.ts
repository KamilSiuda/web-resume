import { createSlice } from '@reduxjs/toolkit';

export type AppState = {
    mode: 'dark' | 'bright';
    contactFormSubmitionTimestampMS: number;
};

const initialState: AppState = { mode: 'bright', contactFormSubmitionTimestampMS: 0 };

const appStateSlice = createSlice({
    name: 'AppPreferences',
    initialState,
    reducers: {
        toggleMode (state) {
            state.mode = state.mode === 'dark' ? 'bright' : 'dark';
        },
        contactFormSubmition (state) {
            state.contactFormSubmitionTimestampMS = Date.now();
        }
    }
});

export const { reducer: appStateReducer, actions: appStateActions } = appStateSlice;
