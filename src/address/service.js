class AddressService {
  constructor($http) {
    this.$http = $http;
  }

  fetch() {

  }

  create() {

  }

  update(activityId, activityData) {
    return this.$http.post('/activity/modify', activityData, {
      params: {
        id: activityId
      }
    });
  }

  delete(activityId) {
    return this.$http.post('/activity/delete', null, {
      params: {
        id: activityId
      }
    });
  }
}

export default angular.module('addressView.address.service', [])
.service('addressService', AddressService);

