import { createSlice } from "@reduxjs/toolkit";

export const mySlice = createSlice({
    name: "mySlice",
    initialState: {
        myUserID: 0,
        myUserRole: 0,
        startLocation: {
            latitude: 51.38156107044501,
            longitude: -2.359066572043425,
        },
        gDestination: {
            latitude: 51.37943205963418,
            longitude: -2.3256547832841625,
        },
        gJourneyDuration: 0,
        gETA: 0,
        gJourneyDistance: 0,
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
        updateJourneyDuration: (state, action) => {
            state.gJourneyDuration = action.payload;
        },
        updateETA: (state, action) => {
            state.gETA = action.payload;
        },
        updateJourneyDistance: (state, action) => {
            state.gJourneyDistance = action.payload;
        },
    },
});

export const {
    updateUserID,
    updateUserRole,
    updateStartLocation,
    updateDestination,
    updateJourneyDuration,
    updateJourneyDistance,
    updateETA,
} = mySlice.actions;

export default mySlice.reducer;
