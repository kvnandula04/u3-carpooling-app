import { configureStore } from '@reduxjs/toolkit';
import myReducer from './mySlice';

const store = configureStore({
  reducer: {
    mySlice: myReducer,
  },
});

export default store;
