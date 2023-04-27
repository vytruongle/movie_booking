import http from "../constant/api";

export const manageBooking = {
  //lấy lịch đặt vé
  listTicketRoom: (query = "") =>
    http.get(`QuanLyDatVe/LayDanhSachPhongVe${query}`),
    //booking ticket
    bookingTicket: (payload) => http.post(`/QuanLyDatVe/DatVe`, payload)
};
