import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './authReducer';
import newsReducer from './newsSlice';

const store = configureStore({
  reducer: {
    news: newsReducer,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;