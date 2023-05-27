import createClient from './api.service';

class TuyenTauService {
  constructor(baseUrl = 'api/tuyentau') {
    this.api = createClient(baseUrl);
  }
  // Lấy tất cả tuyến tàu
  async getAllTuyenTau() {
    return (await this.api.get('/')).data;
  }
  async getAll() {
    return (await this.api.get('/getAllTuyenTau')).data;
  }
  async createTuyenTau(data) {
    return (await this.api.post('/', data)).data;
  }

  async getAllThongTinTuyenTau() {
    return (await this.api.get('/ThongTinTuyenTau')).data;
  }
  // Xóa tàu trong tuyến tàu (bỏ nó ra khỏi tuyến tàu, tức là tàu đó sẽ k hoạt động trên tuyến đó nữa)
  async getTuyenTauById(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async deleteTauByIdTheoTuyen(id, data) {
    return (await this.api.post(`/${id}`, data)).data;
  }
  async updateDisplayTuyenTau(id, data) {
    return (await this.api.patch(`/${id}`, data)).data;
  }

  // Tìm kiếm thời gian hoạt động của tuyến đó
  async searchTuyenTauHoatDong(matuyentau, data) {
    return (await this.api.post(`/searchTuyenTauHoatDong/${matuyentau}`, data)).data;
  }
  async Search(matuyentau) {
    return (await this.api.get(`/searchTuyenTauHoatDong/${matuyentau}`)).data;
  }

  // Update Trạng thái của tuyến tàu

  async updateTuyenTau(matuyentau, data) {
    // console.log('updatetuyentau');
    return (await this.api.patch(`/searchTuyenTauHoatDong/${matuyentau}`, data)).data;
  }
}

export default new TuyenTauService();
