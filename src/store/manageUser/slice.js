import { createSlice } from "@reduxjs/toolkit";
import { login, update } from "./thunkAction";
import avatar from "../../data/image/han-so-hee-wallpaper-11.jpg";

const initialState = {
  user: undefined,
  avatar: avatar,
  pwd: "",
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("user");
      localStorage.removeItem("pwd");
      state.user = undefined;
    },
    getUser: (state, action) => {
      const data = localStorage.getItem("user");
      const pwd = localStorage.getItem("pwd");
      if (data) {
        state.user = JSON.parse(data);
      }
      if (pwd) {
        state.pwd = JSON.parse(pwd);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.info;
        state.pwd = action.payload.pwd;
        localStorage.setItem("pwd", JSON.stringify(action.payload.pwd));
        localStorage.setItem("user", JSON.stringify(action.payload.info));
      })

      .addCase(update.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      });
  },
});

export const manageUserReducer = userSlice.reducer;
export const { logout, getUser } = userSlice.actions;
