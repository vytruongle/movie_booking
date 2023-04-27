import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageBooking } from "./../../services/manageBooking";

export const ListTicketRoom = createAsyncThunk(
  "manageBooking/bookingMovie",
  async (payload, thunkApi) => {
    const res = await manageBooking.listTicketRoom(payload);
    return res.data.content;
  }
);

export const BookingTicket = createAsyncThunk(
  'manageMovie/bookingTicket',
  async (payload, thunkApi) => {
    const res = await manageBooking.bookingTicket(payload);
    return res.data.content;
  }
)