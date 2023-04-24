/* eslint-disable no-useless-escape */
import { Tabs } from "antd";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../store/manageUser/thunkAction";

const User = () => {
  const { user, avatar, pwd } = useSelector((state) => state.manageUser);
  const dispacth = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (user) return reset({ ...user, soDt: user.soDT, matKhau: pwd });
  }, [user, reset, pwd]);

  const renderInfo = () => {
    return (
      <div>
        <h1 className="text-white text-4xl font-semibold pb-8 text-center">
          Thông tin chung
        </h1>
        <div className="pb-6">
          <img
            className="w-16 h-16 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover"
            src={avatar}
            alt={avatar}
          />
          <p className="text-white font-semibold text-lg py-4">
            Xin chào {user?.hoTen}
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-lg font-semibold text-white">
            Thông tin tài khoản:
          </h2>
          <ul className="max-w-md space-y-1 text-gray-500 list-none list-inside dark:text-gray-400">
            <li className="text-sm text-gray-400">Họ tên: {user?.hoTen}</li>
            <li className="text-sm text-gray-400">Email: {user?.email}</li>
            <li className="text-sm text-gray-400">
              Tên đăng nhập: {user?.taiKhoan}
            </li>
            <li className="text-sm text-gray-400">
              Số điện thoại: {user?.soDT}
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderDetailInfo = () => {
    return (
      <div>
        <h1 className="text-white text-4xl font-bold pb-6">
          Cập nhật thông tin
        </h1>
        <form
          onSubmit={handleSubmit(async (value) => {
            dispacth(
              update({
                taiKhoan: value.taiKhoan,
                matKhau: value.matKhau,
                email: value.email,
                soDt: value.soDt,
                maNhom: value.maNhom,
                maLoaiNguoiDung: "KhachHang",
                hoTen: value.hoTen,
              })
            );
          })}
        >
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="username"
              id="floating_username"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("taiKhoan", {
                required: "Vui lòng nhập tài khoản !",
                pattern: {
                  value: /^\w[\w.]{2,12}\w$/,
                  message: "Tài khoản khởi tạo không hợp lệ !",
                },
                maxLength: {
                  value: 14,
                  message: "Tài khoản khởi tạo vượt quá độ dài 14 ký tự !",
                },
                minLength: {
                  value: 4,
                  message: "Tài khoản khởi tạo có độ dài nhỏ hơn 4 ký tự !",
                },
              })}
            />
            <label
              htmlFor="floating_username"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Username
            </label>
            <p className="text-red-500 font-bold text-xs">
              {errors?.taiKhoan?.message}
            </p>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("email", {
                required: "Vui lòng nhập email !",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Email khởi tạo không hợp lệ !",
                },
              })}
            />
            <p className="text-red-500 font-bold text-xs">
              {errors?.email?.message}
            </p>
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("matKhau", {
                required: "Vui lòng nhập mật khẩu !",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
                  message: "Mật khẩu khởi tạo không hợp lệ !",
                },
                maxLength: {
                  value: 16,
                  message: "Mật khẩu khởi tạo vượt quá độ dài 16 ký tự !",
                },
                minLength: {
                  value: 8,
                  message: "Mật khẩu khởi tạo có độ dài nhỏ hơn 8 ký tự !",
                },
              })}
            />
            <p className="text-red-500 font-bold text-xs">
              {errors?.matKhau?.message}
            </p>
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_fullname"
              id="floating_full_name"
              className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              {...register("hoTen", {
                required: "Vui lòng nhập tên họ của bạn !",
                pattern: {
                  value:
                    "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                    "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                    "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
                  message: "Tên của bạn không hợp lệ !",
                },
              })}
            />
            <p className="text-red-500 font-bold text-xs">
              {errors?.hoTen?.message}
            </p>
            <label
              htmlFor="floating_full_name"
              className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full name
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_group_ID"
                id="floating_group_ID"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                {...register("maNhom", {
                  required: "Vui lòng nhập mã nhóm !",
                })}
              />
              <p className="text-red-500 font-bold text-xs">
                {errors?.maNhom?.message}
              </p>
              <label
                htmlFor="floating_group_ID"
                className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Group ID
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                name="floating_phone"
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                {...register("soDt", {
                  required: "Vui lòng nhập số điện thoại !",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Số điện thoại khởi tạo không hợp lệ !",
                  },
                })}
              />
              <p className="text-red-500 font-bold text-xs">
                {errors?.soDt?.message}
              </p>
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="text-black bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cập nhật
          </button>
        </form>
      </div>
    );
  };

  const items = [
    {
      key: 1,
      label: (
        <p className="text-white text-lg font-semibold">Thông tin chung</p>
      ),
      children: renderInfo(),
    },

    {
      key: 2,
      label: (
        <p className="text-white text-lg font-semibold">
          Chỉnh sửa thông tin cá nhân
        </p>
      ),
      children: renderDetailInfo(),
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#303f42] to-[#13181c]">
      <div className=" max-w-screen-xl mx-auto p-40">
        <Tabs items={items} tabPosition="left" />
      </div>
    </div>
  );
};

export default User;
