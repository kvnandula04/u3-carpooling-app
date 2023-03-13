import { createSlice } from '@reduxjs/toolkit';

export const mySlice = createSlice({
  name: 'mySlice',
  initialState: {
    myUserID: 0,
    myUserRole: 0,
  },
  reducers: {
    updateUserID: (state, action) => {
      state.myUserID = action.payload;
    },
    updateUserRole: (state, action) => {
      state.myUserRole = action.payload;
    },
  },
});

export const { updateUserID, updateUserRole } = mySlice.actions;

export default mySlice.reducer;
