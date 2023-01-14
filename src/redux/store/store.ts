import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'redux/slice/userSlice'
import authReducer from 'redux/slice/authSlice'
import logger from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] 
};

const rootReducer = combineReducers({ 
  users: userReducer, 
  auth: authReducer });

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger),
  // devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
