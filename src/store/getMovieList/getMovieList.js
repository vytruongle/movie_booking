import { createSlice } from "@reduxjs/toolkit";
import { getBannerList, getMovieList, getMovieInfo } from "./thunkAction";

const initialState = {
  movieList: [],
  bannerList: [],
  comingList: [],
  movieInfo: [],
  isLoading: false,
};

const manageMovieSlice = createSlice({
  name: "manageMovieSlice",
  initialState,
  reducer: {},

  extraReducers: (builder) => {
    builder
      // movie list
      .addCase(getMovieList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMovieList.fulfilled, (state, action) => {
        state.movieList = action.payload.currentList;
        state.comingList = action.payload.comingList;
        state.isLoading = false;
      })
      .addCase(getMovieList.rejected, (state, action) => {
        console.log("error");
      })
      //banner list
      .addCase(getBannerList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getBannerList.fulfilled, (state, action) => {
        state.bannerList = action.payload;
        state.isLoading = false;
      })
      .addCase(getBannerList.rejected, (state, action) => {
        console.log("error");
      })
      // movie list
      .addCase(getMovieInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getMovieInfo.fulfilled, (state, action) => {
        state.movieInfo = action.payload;
        state.isLoading = false;
      })
      .addCase(getMovieInfo.rejected, (state, action) => {
        console.log("error");
      });
  },
});

export const manageMovieReducer = manageMovieSlice.reducer;
export const manageMovieAction = manageMovieSlice.actions;
