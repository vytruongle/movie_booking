import { createSlice } from "@reduxjs/toolkit";
import { BookingMovie } from "./thunkAction";

const initialState = {
  listRoom: [],
  listChairBooking: [],
  isLoading: false,
};

const BookingSlice = createSlice({
  name: "Booking",
  initialState,
  reducers: {
    ADD_CHAIR: (state, action) => {
      state.listChairBooking.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(BookingMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(BookingMovie.fulfilled, (state, action) => {
        state.listRoom = action.payload;
        state.isLoading = false;
      })
      .addCase(BookingMovie.rejected, (state) => {
        state.isLoading = true;
        console.log(`error`);
      });
  },
});

export const BookingReducer = BookingSlice.reducer;
export const { ADD_CHAIR } = BookingSlice.actions;
