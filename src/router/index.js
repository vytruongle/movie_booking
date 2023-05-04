import { useRoutes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import News from "../pages/News";
import MovieDetail from "../pages/MovieDetail";
import MovieBooking from "../pages/MovieBooking";
import Register from "../pages/Register";
import Login from "../pages/Login";
import User from "../pages/User";

const Router = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/",
          element: <Contact />,
        },
        {
          path: "/",
          element: <News />,
        },
        {
          path: "detail/:movieId",
          element: <MovieDetail />,
        },
        {
          path: "ticketroom/:showtimeId",
          element: <MovieBooking />,
        },
        {
          path: "/user",
          element: <User />,
        },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return element;
};

export default Router;
