import React, { useEffect, useState } from "react";
import { Carousel, Tooltip, Tabs } from "antd";
import dateFormat from "dateformat";
import clsx from "clsx";

// image carousel
import { useDispatch, useSelector } from "react-redux";
import { getBannerList, getMovieList } from "../store/getMovieList/thunkAction";

import { getDateInfo } from "../store/getCinemaList/thunkAction";
import { useLocation, useNavigate } from "react-router-dom";
//css
import styles from "../sass/components/Loader.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const [sel, setSel] = useState(0);
  const { isLoading, movieList, bannerList } = useSelector(
    (state) => state.manageMovie
  );
  const { releaseList } = useSelector((state) => state.manageCinema);
  const navigate = useNavigate();

  if (window.location.href.substr(-2) !== "?r") {
    window.location = window.location.href + "?r";
  }

  useEffect(() => {
    dispatch(
      getMovieList({ movieList: "?maNhom=GP11", comingList: "?maNhom=GP09" })
    );
    dispatch(getBannerList());
    dispatch(getDateInfo("?maNhom=GP11"));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.top)}>
          <div className={clsx(styles.square)}>
            <div className={clsx(styles.square)}>
              <div className={clsx(styles.square)}>
                <div className={clsx(styles.square)}>
                  <div className={clsx(styles.square)}>
                    <div className={clsx(styles.square)}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(styles.bottom)}>
          <div className={clsx(styles.square)}>
            <div className={clsx(styles.square)}>
              <div className={clsx(styles.square)}>
                <div className={clsx(styles.square)}>
                  <div className={clsx(styles.square)}>
                    <div className={clsx(styles.square)}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(styles.left)}>
          <div className={clsx(styles.square)}>
            <div className={clsx(styles.square)}>
              <div className={clsx(styles.square)}>
                <div className={clsx(styles.square)}>
                  <div className={clsx(styles.square)}>
                    <div className={clsx(styles.square)}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(styles.right)}>
          <div className={clsx(styles.square)}>
            <div className={clsx(styles.square)}>
              <div className={clsx(styles.square)}>
                <div className={clsx(styles.square)}>
                  <div className={clsx(styles.square)}>
                    <div className={clsx(styles.square)}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // render info for coming movie list
  const renderInfoMovie = () => {
    return (
      <div className="flex py-20">
        <div className="basis-3/4 pr-10">
          <h1 className="text-white text-4xl font-semibold tracking-wide">
            {movieList[sel]?.tenPhim}
          </h1>
          <p className="text-white py-4">
            {dateFormat(movieList[sel]?.ngayKhoiChieu, "dd/mm/yyyy")}
          </p>
          <p className=" text-gray-400 text-lg">{movieList[sel]?.moTa}</p>
        </div>
        <div className=" basis-1/4">
          <img
            src={movieList[sel]?.hinhAnh}
            alt={movieList[sel]?.hinhAnh}
            className="w-full h-[480px]  rounded-lg object-fill"
          />
        </div>
      </div>
    );
  };

  //render for release date
  const renderReleaseMovie = (item) => {
    const date = item.lstCumRap;
    return (
      <Tabs
        tabPosition="left"
        items={date?.map((value) => {
          return {
            label: (
              <Tooltip title={value.tenHeThongRap}>
                <div className="flex">
                  <img
                    src={value.hinhAnh}
                    alt={value.hinhAnh}
                    className=" w-[70px] rounded mr-4"
                  />
                  <div className=" text-start flex flex-col justify-center leading-8 truncate">
                    <h1 className="text-xl font-semibold">{value.tenCumRap}</h1>
                    <p className=" text-gray-400">{value.diaChi}</p>
                  </div>
                </div>
              </Tooltip>
            ),
            key: `${value.tenCumRap}`,
            children: renderListMovieInfo(value.danhSachPhim, value.maCumRap),
          };
        })}
      />
    );
  };

  //render movie list info
  const renderListMovieInfo = (movie, maCumRap) => {
    return movie?.map((item) => {
      if (item.dangChieu) {
        return (
          <div className="flex pb-4" key={`${item.maPhim}-${maCumRap}`}>
            <Tooltip title={item.tenPhim}>
              <div className="flex basis-3/12 justify-center">
                <img
                  src={item.hinhAnh}
                  alt={item.hinhAnh}
                  className=" w-[68px] h-[100px] rounded"
                />
              </div>
            </Tooltip>
            <div className=" text-start flex flex-col justify-center leading-8 truncate basis-9/12">
              <h1 className="text-xl font-semibold">{item.tenPhim}</h1>
              <div className="flex items-center truncate">
                {item.lstLichChieuTheoPhim?.map((value, id) => {
                  return (
                    <p
                      className="text-2xl text-green-500 font-semibold pr-2 py-1"
                      key={`${value.maRap}-${maCumRap}-${id}`}
                    >
                      {dateFormat(value.ngayChieuGioChieu, "h:MM TT")}
                    </p>
                  );
                })}
              </div>
              <button
                type="button"
                className="w-1/2 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={() => {
                  navigate(`/detail/${item.maPhim}`);
                }}
              >
                Xem thêm
              </button>
            </div>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div>
      <div className="">
        <Carousel
          effect="fade"
          autoplay={true}
          autoplaySpeed={4000}
          className=" brightness-90"
        >
          {bannerList?.map((item) => {
            return (
              <img
                key={item.maPhim}
                className="h-[700px] max-w-full object-cover"
                src={item.hinhAnh}
                alt={item.hinhAnh}
              />
            );
          })}
        </Carousel>
      </div>
      {/* list movie */}
      <div className="bg-gradient-to-r from-[#1b1926] to-[#09080c]">
        <div className="xl:container mx-auto px-48 py-32">
          <h1 className="inline-block p-2 border-b-2 border-[#d66d31] rounded-t-lg font-bold text-3xl text-[#d66d31]">
            Showing MOVIES
          </h1>

          <div className="grid grid-cols-4 gap-6 pt-4">
            {movieList?.map((item) => {
              if (item.dangChieu) {
                return (
                  <Tooltip title={item.tenPhim} key={item.maPhim}>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        navigate(`/detail/${item.maPhim}`);
                      }}
                    >
                      <div className="max-w-sm bg-transparent rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <img
                          className="h-[400px] max-w-full rounded-lg transition-all hover:transition-all hover:scale-105 duration-500 object-left object-cover"
                          src={item.hinhAnh}
                          alt={item.hinhAnh}
                        />

                        <div className="p-5">
                          <h5 className="mb-2 text-xl text-center font-semibold tracking-tight text-white truncate">
                            {item.tenPhim}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </Tooltip>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
      {/* list coming movie */}
      <div className="bg-gradient-to-b from-[#1f2527] to-[#02060a] ">
        <div className="xl:container mx-auto px-48 py-32">
          <h1 className="inline-block p-2 border-b-4 border-[#d66d31] rounded-t-lg font-bold text-3xl text-white">
            coming SOON
          </h1>

          {renderInfoMovie()}
          <Carousel
            slidesToShow={4}
            slidesToScroll={1}
            autoplay
            autoplaySpeed={8000}
            afterChange={(current) => setSel(current++)}
            centerMode={true}
          >
            {movieList?.map((item) => {
              if (item.sapChieu) {
                return (
                  <Tooltip title={item.tenPhim} key={item.maPhim}>
                    <div className="w-full">
                      <img
                        key={item.maPhim}
                        className="h-[250px] w-[90%] object-cover rounded-lg object-center"
                        src={item.hinhAnh}
                        alt={item.hinhAnh}
                      />
                    </div>
                  </Tooltip>
                );
              }
              return null;
            })}
          </Carousel>
        </div>
      </div>
      {/* show time movie */}
      <div className=" bg-white">
        <div className="xl:container mx-auto px-44 py-32">
          <h1 className="inline-block p-2 border-b-2 border-[#d66d31] rounded-t-lg font-bold text-3xl text-[#d66d31] mb-8">
            Showtimes MOVIES
          </h1>
          <div>
            <Tabs
              tabPosition="left"
              items={releaseList?.map((item, id) => {
                return {
                  label: (
                    <Tooltip title={item.tenHeThongRap}>
                      <img
                        src={item.logo}
                        alt={item.logo}
                        className=" w-[70px]"
                      />
                    </Tooltip>
                  ),
                  key: `${item.maHeThongRap}-${id}`,
                  children: renderReleaseMovie(item),
                };
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
