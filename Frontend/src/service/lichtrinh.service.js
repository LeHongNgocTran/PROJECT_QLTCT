import createApiClient from './api.service';

class LichTrinhService {
  constructor(baseUrl = 'api/lichtrinh') {
    this.api = createApiClient(baseUrl);
  }

  async getAllInfor() {
    return (await this.api.get('/')).data;
  }
  async filterDay(date) {
    return (await this.api.post('/', date)).data;
  }
}

export default new LichTrinhService();
