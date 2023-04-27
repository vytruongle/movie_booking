import { createSlice } from "@reduxjs/toolkit";
import { BookingTicket, ListTicketRoom } from "./thunkAction";

const initialState = {
  listRoom: [],
  listChairBooking: [],
  isLoading: false,
  isBooking: false,
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
      .addCase(ListTicketRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ListTicketRoom.fulfilled, (state, action) => {
        state.listRoom = action.payload;
        state.isBooking = false
        state.isLoading = false;
      })
      .addCase(ListTicketRoom.rejected, (state) => {
        state.isLoading = true;
        console.log(`error`);
      })
      // check booking ticket
      .addCase(BookingTicket.fulfilled, (state, action) => {
        state.listChairBooking = []
        state.isBooking = true
      })

  },
});

export const BookingReducer = BookingSlice.reducer;
export const { ADD_CHAIR } = BookingSlice.actions;
