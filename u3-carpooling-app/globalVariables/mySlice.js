import { createSlice } from '@reduxjs/toolkit';

export const mySlice = createSlice({
  name: 'mySlice',
  initialState: {
    myUserID: 0,
    myUserRole: 0,
    startLocation: {latitude: 0, longitude: 0},
    gDestination: {latitude: 0, longitude: 0},
  },
  reducers: {
    updateUserID: (state, action) => {
      state.myUserID = action.payload;
    },
    updateUserRole: (state, action) => {
      state.myUserRole = action.payload;
    },
    updateStartLocation: (state, action) => {
      state.startLocation = action.payload;
    },
    updateDestination: (state, action) => {
      state.gDestination = action.payload;
    },
  },
});

export const { updateUserID, updateUserRole, updateStartLocation, updateDestination} = mySlice.actions;

export default mySlice.reducer;
