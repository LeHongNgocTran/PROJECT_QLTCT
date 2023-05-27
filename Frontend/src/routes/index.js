import Home from '~/pages/Home';

import LogIn from '~/pages/User/Login/Login';
import layoutUser from '~/Components/Layout/layoutLogin';
import Register from '~/pages/User/Login/Register';
import PriceTicket from '~/pages/PriceTicket';
import Service from '~/pages/Service';
import Search from '~/pages/Search';
import HomeAdmin from '~/pages/Admin/HomeAdmin';
import InforCustomer from '~/pages/Admin/ThongtinHanhKhach';
import LichSuDatVe from '~/pages/User/LichSuDatVe';
import DetailsInforCustomer from '~/pages/User/LichSuDatVe/ChitietDanhSachHanhKhach';
// import DetailsInforCustomerforAdmin from '~/pages/Admin/ChitietDanhSachHanhKhach';
import QuanLyTuyenTau from '~/pages/Admin/TuyenTau';
import TauTheoTuyen from '~/pages/Admin/TuyenTau/TauTheoTuyen';
import QuanlyTau from '~/pages/Admin/QuanlyTau';
import NotFound from '~/error';
import Customer from '~/pages/Admin/ThongtinHanhKhach/KhachHang';
import CalendarTau from '~/pages/Admin/TuyenTau/Calendar';
import Calendar from '~/pages/Admin/QuanlyTau/Calendar';
import ThongTinTau from '~/pages/Admin/QuanlyTau/ThongTinTau';
import ChiTietThoiGian from '~/pages/Admin/QuanlyTau/ThongTinTau/Chitietthoigian';
import PaymentNotification from '~/Components/Components/Payment';
import AddAndUpdate from '~/pages/Admin/TuyenTau/FormTuyenTau/AddAndUpdate';
import Invoice from '~/pages/Search/ThongTinHanhTrinh/invoice';
import DetailsInvoice from '~/pages/Admin/Hoadon';
import DetailsCustomer from '~/pages/Admin/ThongtinHanhKhach/KhachHang/ChitietKhachHang';
import ThongTinNhanVien from '~/pages/Admin/NhanVien/ThongTinNhanVien/thongtinnhanvien';
import ListStaff from '~/pages/Admin/NhanVien/ListStaff';
import AddStaff from '~/pages/Admin/NhanVien/addstaff';
import UpdateStaff from '~/pages/Admin/NhanVien/updatestaff';
import DetailsInfoUser from '~/pages/User/InfoUser';
import ChangeTicket from '~/pages/User/Search';
import ChangeTicketAdmin from '~/pages/Admin/Search';
import ThongKe from '~/pages/Admin/ThongKe';
import Quanlylichtrinh from '~/pages/Admin/Lichtrinh';

const publicRoutes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/priceticket/',
    component: PriceTicket,
  },
  { path: '/priceticket/:stationId', component: PriceTicket },
  {
    path: '/service/',
    component: Service,
  },
  {
    path: '/login',
    component: LogIn,
    layout: layoutUser,
  },
  {
    path: '/register',
    component: Register,
    layout: layoutUser,
  },
  {
    path: '/search',
    component: Search,
    layout: layoutUser,
  },
  {
    path: '/lichsudatve',
    component: LichSuDatVe,
    layout: layoutUser,
  },
  {
    path: '/lichsudatve/chitiet/:id',
    component: DetailsInforCustomer,
    layout: layoutUser,
  },
  {
    path: '/infoUser/:id',
    component: DetailsInfoUser,
    layout: layoutUser,
  },
  {
    path: '/payment',
    component: PaymentNotification,
    layout: layoutUser,
  },
  {
    path: '/changeTicket/:id',
    component: ChangeTicket,
    layout: layoutUser,
  },
  {
    path: '*',
    component: NotFound,
  },
  // Khai báo tiếp tục
];
// Đường link khi đã đăng nhập vào
const privateRoutes = [];

const adminRoutes = [
  {
    path: '/dashboard',
    component: HomeAdmin,
  },
  {
    path: '/inforcustomer',
    component: InforCustomer,
  },
  {
    path: '/banve',
    component: Search,
  },
  {
    path: '/quanlytuyentau',
    component: QuanLyTuyenTau,
  },
  {
    path: '/quanlytuyentau/danhsachtauthuoctuyen/:id',
    component: TauTheoTuyen,
  },
  {
    path: '/danhsachtauthuoctuyen/:matau',
    component: CalendarTau,
  },
  {
    path: '/quanlytau',
    component: QuanlyTau,
  },
  {
    path: '/quanlytau/:id',
    component: Calendar,
  },
  { path: '/quanlytau/chitiettau/:id', component: ThongTinTau },
  {
    path: '/quanlytau/chitiettau/chitietthoigian/:matuyentau',
    component: ChiTietThoiGian,
  },
  {
    path: '/customer',
    component: Customer,
  },
  {
    path: '/customer/:id',
    component: DetailsCustomer,
  },
  {
    path: '/addandupdatetuyentau',
    component: AddAndUpdate,
  },
  {
    path: '/invoice/:id',
    component: Invoice,
    layout: null,
  },
  {
    path: '/detailsinvoice/:id',
    component: DetailsInvoice,
  },
  {
    path: '/thongtinnhanvien',
    component: ThongTinNhanVien,
  },
  {
    path: '/staff',
    component: ListStaff,
  },
  {
    path: '/staff/addStaff',
    component: AddStaff,
  },
  {
    path: '/staff/updateStaff/:id',
    component: UpdateStaff,
  },
  {
    path: '/changeTicketAdmin/:id',
    component: ChangeTicketAdmin,
  },
  {
    path: '/thongke',
    component: ThongKe,
  },
  {
    path: '/quanlylichtrinh',
    component: Quanlylichtrinh,
  },
];

export { publicRoutes, privateRoutes, adminRoutes };
