import { createSlice } from "@reduxjs/toolkit";
import { getDateInfo, getDateMovieInfo } from "./thunkAction";

const initialState = {
  releaseList: [],
  dateInfo: [],
  isLoading: false,
};

const manageCinemaSlice = createSlice({
  name: "manageCinemaSlice",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      //release date list
      .addCase(getDateInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getDateInfo.fulfilled, (state, action) => {
        state.releaseList = action.payload;
        state.isLoading = false;
      })
      .addCase(getDateInfo.rejected, (state, action) => {
        console.log("error");
      })
      //movie info date release
      .addCase(getDateMovieInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getDateMovieInfo.fulfilled, (state, action) => {
        state.dateInfo = action.payload;
        state.isLoading = false;
      })
      .addCase(getDateMovieInfo.rejected, (state, action) => {
        console.log("error");
      });
  },
});

export const manageCinemaReducer = manageCinemaSlice.reducer;
export const manageCinemaAction = manageCinemaSlice.actions;
