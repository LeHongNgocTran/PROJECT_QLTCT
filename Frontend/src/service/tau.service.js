import createClient from './api.service';

class TauService {
  constructor(baseUrl = 'api/tau') {
    this.api = createClient(baseUrl);
  }
  async getAllTau() {
    return (await this.api.get('/')).data;
  }
  async updateTrangthaiTau(data) {
    return (await this.api.post('/', data)).data;
  }
  async updateTauthuocTuyenTau(data) {
    return (await this.api.patch('/', data)).data;
  }

  async getAllTauTheoTuyen(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async createTimeTau(data) {
    return (await this.api.post('/QLTG', data)).data;
  }

  async updateTimeTauById(data) {
    return (await this.api.patch('/QLTG', data)).data;
  }

  async getInforTauById(id) {
    return (await this.api.get(`/QLTG/${id}`)).data;
  }
  async getAllTimeTauById(id, data) {
    return (await this.api.post(`/QLTG/${id}`, data)).data;
  }
  async deleteTimeTau(id) {
    return (await this.api.delete(`/QLTG/${id}`)).data;
  }

  async ThemTau(data) {
    return (await this.api.post('/Tau', data)).data;
  }
  async EditInforAboutTau(data) {
    return (await this.api.patch('/Tau', data)).data;
  }

  async Search(data) {
    return (await this.api.get(`/Search/Info/${data}`)).data;
  }
}
export default new TauService();
