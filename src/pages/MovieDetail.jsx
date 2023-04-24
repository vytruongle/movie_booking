import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieInfo } from "../store/getMovieList/thunkAction";
import { getDateMovieInfo } from "../store/getCinemaList/thunkAction";
import { FieldTimeOutlined } from "@ant-design/icons";
import dateFormat from "dateformat";
import { Tabs, Tooltip } from "antd";

const MovieDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movieInfo } = useSelector((state) => state.manageMovie);
  const { dateInfo } = useSelector((state) => state.manageCinema);

  useEffect(() => {
    dispatch(getMovieInfo(`?MaPhim=${params.movieId}`));
    dispatch(getDateMovieInfo(`?MaPhim=${params.movieId}`));
  }, [dispatch, params]);

  const renderDetailCinema = (theaterCluster) => {
    return theaterCluster?.map((item) => {
      return (
        <div key={item.maCumRap}>
          <div className="flex flex-wrap gap-4 items-center py-4 ">
            <div>
              <img
                src={item.hinhAnh}
                alt={item.hinhAnh}
                className="w-[60px] h-[60px] rounded-lg object-cover object-center"
              />
            </div>
            <div className=" text-start flex flex-col justify-center leading-8 truncate text-white">
              <h1 className="text-xl font-semibold">{item.tenCumRap}</h1>
              <p className=" text-gray-400">{item.diaChi}</p>
            </div>
          </div>
          <div className="flex items-start py-4 border-b-2 border-gray-500">
            <div className="flex flex-wrap gap-2 items-baseline basis-1/4">
              <FieldTimeOutlined className="text-sm text-gray-500" />
              <h1 className="text-sm text-gray-500 font-semibold">
                VIEWING TIMES
              </h1>
            </div>
            <div className="flex flex-wrap gap-4 basis-3/4">
              {item.lichChieuPhim?.map((value) => {
                return (
                  <div key={value.maLichChieu}>
                    <button
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                      onClick={() => {
                        navigate(`/ticketroom/${value.maLichChieu}`);
                      }}
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        {dateFormat(value.ngayChieuGioChieu, "HH:MM")}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    });
  };

  const renderCinemaList = () => {
    return (
      <Tabs
        tabPosition="left"
        items={dateInfo?.heThongRapChieu?.map((item, id) => {
          return {
            label: (
              <Tooltip title={item.tenHeThongRap}>
                <img
                  src={item.logo}
                  alt={item.logo}
                  className=" w-[70px] rounded mr-4"
                />
              </Tooltip>
            ),
            key: `${item.tenCumRap}-${id}`,
            children: renderDetailCinema(item.cumRapChieu),
          };
        })}
      />
    );
  };

  const items = [
    {
      key: "1",
      label: <h1 className="text-xl font-semibold text-white">OVERVIEW</h1>,
      children: (
        <p className="text-lg text-gray-500 tracking-wider">{movieInfo.moTa}</p>
      ),
    },
    {
      key: "2",
      label: <h1 className="text-xl font-semibold text-white">SHOWTIMES</h1>,
      children: renderCinemaList(),
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#1b1926] to-[#09080c] h-full">
      <div className="flex container mx-auto p-40 gap-8">
        <div className=" basis-1/4">
          <Tooltip title={movieInfo.tenPhim}>
            <img
              src={movieInfo?.hinhAnh}
              alt={movieInfo?.hinhAnh}
              className="h-[400px] w-full rounded-lg transition-all hover:scale-105"
            />
          </Tooltip>
        </div>
        <div className="basis-3/4">
          <h1 className="text-white text-2xl pb-4">{movieInfo.tenPhim}</h1>
          <div className="flex flex-wrap text-white border-t-2 border-b-2 border-t-gray-400 border-b-gray-400 mb-10 items-center">
            <p className="p-4 border-r-2 border-r-gray-400 text-gray-400">
              Rate this movie
            </p>
            <p className="px-8">
              <span className="text-xl font-semibold text-green-500">
                {movieInfo.danhGia}
              </span>
              /10
            </p>
          </div>
          <Tabs items={items} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
