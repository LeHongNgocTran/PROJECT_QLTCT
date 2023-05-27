import createApiClient from './api.service';

class GiaVeTuyenTauService {
  constructor(baseUrl = 'api/giavetuyentau') {
    this.api = createApiClient(baseUrl);
  }

  async getAllTuyenTau() {
    return (await this.api.get('/')).data;
  }
}

export default new GiaVeTuyenTauService();
