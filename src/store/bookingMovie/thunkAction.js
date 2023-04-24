import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageBooking } from "./../../services/manageBooking";

export const BookingMovie = createAsyncThunk(
  "manageBooking/bookingMovie",
  async (payload, thunkApi) => {
    const res = await manageBooking.bookingMovie(payload);
    return res.data.content;
  }
);
