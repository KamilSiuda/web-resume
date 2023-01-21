import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appStateReducer } from './appState.reducer';
import { enableMapSet } from 'immer';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

enableMapSet();
const rootReducerConfig = {
    key: 'root',
    storage,
    version: 1,
    debug: process.env.REACT_APP_ENV?.toLowerCase() === 'development',
};

const reducers = { appState: appStateReducer };
const rootReducer = combineReducers(reducers);

export const store = configureStore({
    reducer: persistReducer(rootReducerConfig, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.REACT_APP_ENV?.toLowerCase() === 'development' || process.env.REACT_APP_ENV?.toLowerCase() === 'local',
});

export const persistor = persistStore(store);

export type RootState = {[Name in keyof typeof reducers]: ReturnType<typeof reducers[Name]>};
export type DispatchType = typeof store.dispatch;
