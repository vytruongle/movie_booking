import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageUser } from "../../services/manageUser";
import { message } from "../../module/MessageToastyfy";

export const login = createAsyncThunk(
  "manageUser/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await manageUser.loginUser(payload);
      return {
        info: res?.data?.content,
        pwd: payload.matKhau,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const update = createAsyncThunk(
  "manageUser/update",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await manageUser.updateUser(payload);
      if (res?.data.statusCode === 200) {
        message.success("Bạn đã cập nhật thông tin thành công");
        return res?.data?.content;
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const bookingHistory = createAsyncThunk(
  "manageUser/bookingHistory",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await manageUser.bookingHistory(payload);
      if (res?.data.statusCode === 200) {
        return res?.data?.content;
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
