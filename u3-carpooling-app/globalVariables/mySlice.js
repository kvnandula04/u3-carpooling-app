import { createSlice } from '@reduxjs/toolkit';

export const mySlice = createSlice({
  name: 'mySlice',
  initialState: {
    myUserID: 0,
  },
  reducers: {
    updateUserID: (state, action) => {
      state.myUserID = action.payload;
    },
  },
});

export const { updateUserID } = mySlice.actions;

export default mySlice.reducer;
