import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BookingMovie } from "../store/bookingMovie/thunkAction";
import { ADD_CHAIR } from "../store/bookingMovie/bookingMovie";

const MovieBooking = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { listRoom, isLoading, listChairBooking } = useSelector(
    (state) => state.bookingMovie
  );
  const movieInfo = listRoom.thongTinPhim;

  useEffect(() => {
    dispatch(BookingMovie(`?MaLichChieu=${params.showtimeId}`));
  }, [dispatch, params]);

  // console.log(listRoom);
  console.log(listChairBooking);
  if (isLoading) {
    return <p className="text-black">...is Loading</p>;
  }

  const sum = () => {
    let sum = 0;
    listChairBooking?.map((item) => {
      return (sum += item.price * 1);
    });
    return sum;
  };

  const handleBookingChair = (name, type, price) => {
    dispatch(
      ADD_CHAIR({
        id: `${name}-${type}`,
        numChair: name,
        price: price,
      })
    );
  };

  const typeChair = (type, bookState, name, price) => {
    if (listChairBooking?.find((item) => item.id === `${name}-${type}`)) {
      return (
        <button
          type="button"
          className="text-white bg-gradient-to-r from-green-400 to-green-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3.5 py-3 text-center mr-2 mb-2"
        >
          {name}
        </button>
      );
    }
    if (type === "Thuong" && !bookState) {
      return (
        <button
          onClick={() => {
            handleBookingChair(name, type, price);
          }}
          type="button"
          className="text-green-400 hover:text-white border border-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3.5 py-3 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          {name}
        </button>
      );
    }
    if (type !== "Thuong" && !bookState) {
      return (
        <button
          onClick={() => {
            handleBookingChair(name, type, price);
          }}
          type="button"
          className="text-white bg-gradient-to-r from-[#efb15d] to-[#ec8439] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-[#f18f42] font-medium rounded-lg text-sm px-3.5 py-3 text-center mr-2 mb-2"
        >
          {name}
        </button>
      );
    }

    return (
      <button
        type="button"
        className="text-red-500 bg-white cursor-not-allowed font-medium rounded-lg text-sm px-3.5 py-3 text-center"
        disabled
      >
        X
      </button>
    );
  };
  return (
    <div className="bg-gradient-to-r from-[#1b1926] to-[#09080c] h-full">
      <div className="flex container mx-auto p-40 gap-8">
        <div className="basis-3/5">
          <div className="border-t-8 border-t-orange-400 w-full"></div>
          <div className="border-b-[50px] border-b-shadowScreen border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent h-[50px] w-[90%] m-auto drop-shadow-screen">
            <h1 className="text-xl text-gray-500 text-center leading-[50px]">
              Screen
            </h1>
          </div>
          <div className="grid grid-cols-12 gap-2 px-2 mt-20">
            {listRoom.danhSachGhe?.map((item) => {
              return (
                <div key={item.maGhe}>
                  {typeChair(item.loaiGhe, item.daDat, item.tenGhe, item.giaVe)}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 px-2 py-10">
            <div className="flex flex-wrap gap-2 items-center pr-4">
              <button
                type="button"
                className="text-green-400 hover:text-white border border-green-400 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3.5 py-3 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
              ></button>
              <p className="text-white text-sm ">Ghế thường</p>
            </div>
            <div className="flex flex-wrap gap-2 items-center pr-4">
              <button
                type="button"
                className="text-white bg-gradient-to-r from-[#efb15d] to-[#ec8439] hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-[#f18f42] font-medium rounded-lg text-sm px-3.5 py-3 text-center mr-2 mb-2"
              ></button>
              <p className="text-white text-sm ">Ghế VIP</p>
            </div>
            <div className="flex flex-wrap gap-2 items-center pr-4">
              <button
                type="button"
                className="text-red-500 bg-white cursor-not-allowed font-medium rounded-lg text-sm px-2 py-2 text-center"
                disabled
              >
                X
              </button>
              <p className="text-white text-sm ">Ghế đã đặt</p>
            </div>
          </div>
        </div>
        <div className="basis-2/5 shadow-lg shadow-gray-500 px-2 border-gray-500 border-2">
          <h1 className="text-2xl text-white text-center py-4">
            {movieInfo?.tenPhim}
          </h1>
          <div className="flex flex-wrap py-10 border-b-2 border-b-gray-400">
            <h1 className="basis-3/5 text-white text-xl font-semibold">
              Ngày chiếu
            </h1>
            <p className="basis-2/5 text-gray-400 text-sm text-end">
              {movieInfo?.ngayChieu} -
              <span className=" text-orange-400 font-semibold px-1">
                {movieInfo?.gioChieu}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap py-10 border-b-2 border-b-gray-400">
            <h1 className="basis-3/5 text-white text-xl font-semibold">
              Cụm rạp
            </h1>
            <p className="basis-2/5 text-gray-400 text-sm text-end">
              {movieInfo?.tenCumRap}
            </p>
          </div>
          <div className="flex flex-wrap py-10 border-b-2 border-b-gray-400">
            <h1 className="basis-3/5 text-white text-xl font-semibold">Rạp</h1>
            <p className="basis-2/5 text-gray-400 text-sm text-end">
              {movieInfo?.tenRap}
            </p>
          </div>
          <div className="flex flex-wrap py-10 border-b-2 border-b-gray-400">
            <h1 className="basis-3/5 text-white text-xl font-semibold">
              Ghế chọn
            </h1>
            <div className="flex flex-wrap gap-2 basis-2/5 justify-end">
              {listChairBooking?.map((item) => {
                return (
                  <p className=" text-gray-400 text-sm text-end">
                    <span className="text-[#f68d41] text-sm">
                      {item.numChair}
                    </span>{" "}
                    {item.price}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="flex flex-wrap py-10 border-b-2 border-b-gray-400">
            <h1 className="basis-3/5 text-white text-xl font-semibold">
              Tổng tiền
            </h1>
            <p className="basis-2/5 text-gray-400 text-xl font-bold text-end">
              {sum()}
            </p>
          </div>
          <button
            type="button"
            className="w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-8"
          >
            BOOKING TICKET
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieBooking;
