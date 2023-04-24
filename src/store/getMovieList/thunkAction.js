import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageMovie } from "../../services/manageMovie";

export const getMovieList = createAsyncThunk(
  "manageMovie/getMovieList",
  async (payload, thunkApi) => {
    const res = await manageMovie.getMovieList(payload.movieList);
    const coming = await manageMovie.getMovieList(payload.comingList);
    return {
      currentList: res.data.content,
      comingList: coming.data.content,
    };
  }
);

export const getBannerList = createAsyncThunk(
  "manageMovie/getBannerList",
  async (payload, thunkApi) => {
    const res = await manageMovie.getBannerList();
    return res.data.content;
  }
);

export const getMovieInfo = createAsyncThunk(
  "manageMovie/getMovieInfo",
  async (payload, thunkApi) => {
    const res = await manageMovie.getMovieInfo(payload);
    return res.data.content;
  }
);
