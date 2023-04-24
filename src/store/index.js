import { configureStore } from "@reduxjs/toolkit";
import { manageMovieReducer } from "./getMovieList/getMovieList";
import { manageCinemaReducer } from "./getCinemaList/getCinemaList";
import { BookingReducer } from "./bookingMovie/bookingMovie";
import { getUser, manageUserReducer } from "./manageUser/slice";

const store = configureStore({
  reducer: {
    manageMovie: manageMovieReducer,
    manageCinema: manageCinemaReducer,
    bookingMovie: BookingReducer,
    manageUser: manageUserReducer,
  },
});

store.dispatch(getUser());

export default store;
