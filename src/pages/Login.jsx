import React from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

import styless from "../sass/pages/login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/manageUser/thunkAction";
import { Navigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: onchange });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.manageUser);

  if (user) {
    return <Navigate to="/" />;
  }
  const renderLogin = () => {
    return (
      <div className={clsx(styless.loginBox)}>
        <p>Login</p>
        <form
          onSubmit={handleSubmit(async (value) => {
            dispatch(login(value));
          })}
        >
          <div className={styless.userBox}>
            <input
              name="username"
              type="text"
              {...register("taiKhoan", {
                required: "Vui lòng nhập tài khoản !",
              })}
            />
            <label htmlFor="username">Username</label>
            <p className="text-red-500 font-bold text-xs pb-6">
              {errors?.taiKhoan?.message}
            </p>
          </div>
          <div className={clsx(styless.userBox)}>
            <input
              name="password"
              type="password"
              {...register("matKhau", {
                required: "Vui lòng nhập mật khẩu !",
              })}
            />
            <label htmlFor="password">Password</label>
            <p className="text-red-500 font-bold text-xs">
              {errors?.matKhau?.message}
            </p>
          </div>
          <div className={clsx(styless.loginSubmit)}>
            <span />
            <span />
            <span />
            <span />
            <input
              type="submit"
              defaultValue="Login"
              className=" cursor-pointer"
            />
          </div>
        </form>
      </div>
    );
  };
  return (
    <div className="h-[100vh] flex flex-wrap justify-center bg-[#e8e8e8]">
      <div className="flex flex-col items-center py-8">
        <p className="text-black text-4xl font-semibold">Login</p>
        {renderLogin()}
        <p>Don't have an account? <a href="/register" className="font-semibold text-red-500 text-xl hover:text-red-400">Register!</a></p>
      </div>
    </div>
  );
};

export default Login;
