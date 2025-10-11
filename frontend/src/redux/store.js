// store.js

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

// Import all Slices (Reducers)
import authReducer from "./authSlice.js";
import postReducer from './postSlice.js';
import socketReducer from "./socketSlice.js";
import chatReducer from "./chatSlice.js";
import rtnReducer from "./rtnSlice.js";

// 1. Redux Persist Configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    // FIX: Blacklist the 'socketio' slice to prevent non-serializable object from being persisted.
    blacklist: ['socketio', 'realTimeNotification'] 
};

// 2. Combine all Reducers
const appReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    socketio: socketReducer,
    chat: chatReducer,
    realTimeNotification: rtnReducer
});

// 3. Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, appReducer);

// 4. Configure Store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
                    // FIX: Ignore the action that dispatches the socket object
                    'socketio/setSocket' 
                ],
                // FIX: Ignore the non-serializable value in the specific 'socketio' state path.
                ignoredPaths: ['socketio.socket'], 
            },
        }),
});