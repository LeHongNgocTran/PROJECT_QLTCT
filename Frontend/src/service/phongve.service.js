import createApiClient from './api.service';

class PhongVeService {
  constructor(baseUrl = 'api/phongve') {
    this.api = createApiClient(baseUrl);
  }

  async getPhongVe() {
    return (await this.api.get('/')).data;
  }

  async getPhongVeById(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async DoanhThuById(id) {
    return (await this.api.post(`/${id}`)).data;
  }
  async DoanhthuAll() {
    return (await this.api.get('/allDoanhThu')).data;
  }
}
export default new PhongVeService();
