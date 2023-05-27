import createApiClient from './api.service';

class TaiKhoanService {
  constructor(baseUrl = 'api/manager') {
    this.api = createApiClient(baseUrl);
  }
  async getAllByPermission(data) {
    return (await this.api.get(`/${data}`)).data;
  }
  async deleteAccount(data) {
    return (await this.api.delete(`/${data}`)).data;
  }
  async updateAccount(data) {
    return (await this.api.post(`/upload/info`, data)).data;
  }
  async getDetailsUser(id) {
    return (await this.api.post(`/detailsUser/`, id)).data;
  }

  async findByName(data) {
    return (await this.api.post('/', data)).data;
  }
  async register(data) {
    // console.log(2);
    return (await this.api.post('/register', data)).data;
  }
  async Search(data) {
    return (await this.api.post(`/Search/Info`, data)).data;
  }
}

export default new TaiKhoanService();
