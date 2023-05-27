import createApiClient from './api.service';

class DashboardService {
  constructor(baseUrl = 'api/dashboard') {
    this.api = createApiClient(baseUrl);
  }

  async getAllInfor(data) {
    return (await this.api.post(`/`, data)).data;
  }
}

export default new DashboardService();
