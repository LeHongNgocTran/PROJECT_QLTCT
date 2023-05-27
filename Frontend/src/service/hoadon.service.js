import createApiClient from './api.service';

class HoadonService {
  constructor(baseUrl = 'api/hoadon') {
    this.api = createApiClient(baseUrl);
  }
  //
  async getAllBill() {
    return (await this.api.get('/')).data;
  }
  // thêm hóa đơn bên phía khách hàng mua onl
  async addHoaDon(data) {
    return (await this.api.post('/', data)).data;
  }
  // bán vé tại quầy
  async addHoaDonTaiQuay(data) {
    return (await this.api.post('/ThanhToan/TaiQuay', data)).data;
  }
  // tìm kiểm hóa đơn
  async Search(data) {
    return (await this.api.post('/Search/Info', data)).data;
  }
  async getBillById(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async getBillByUser(id) {
    return (await this.api.post(`/${id}`)).data;
  }
  async updateBilByUser(id, data) {
    return (await this.api.patch(`${id}`, data)).data;
  }
  async cancelBillById(id) {
    return await this.api.patch('/', { id });
  }
  async getSeatBySeat(data) {
    return (await this.api.post('/Invoice/SeatAvailable', data)).data;
  }
}

export default new HoadonService();
