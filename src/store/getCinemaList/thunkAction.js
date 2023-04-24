import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageCinema } from "../../services/manageCinema";

export const getInfoCinema = createAsyncThunk(
  "manageCinema/getInfoCinema",
  async (payload, thunkApi) => {
    const res = await manageCinema.getInfoCinema();
    return res.data.content;
  }
);

export const getDateInfo = createAsyncThunk(
  "manageCinema/getDateInfo",
  async (payload, thunkApi) => {
    const res = await manageCinema.getDateInfo(payload);
    return res.data.content;
  }
);

export const getDateMovieInfo = createAsyncThunk(
  "manageCinema/getDateMovieInfo",
  async (payload, thunkApi) => {
    const res = await manageCinema.getDateMovieInfo(payload);
    return res.data.content;
  }
);
