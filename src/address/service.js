class AddressService {
  constructor($http) {
    this.$http = $http;
  }

  fetch() {
    return this.$http.get('/address')
      .then(null, () => {
        return [];
      });
  }

  create(addressData) {
    return this.$http.post('/address', addressData)
      .then(null, () => {
        return addressData;
      });
  }

  update(addressData) {
    return this.$http.put(`/address/${addressData.id}`, addressData)
      .then(null, () => {
        return addressData;
      });
  }

  delete(addressId) {
    return this.$http.delete(`/address/${addressId}`, null)
      .then(null, () => {
        return addressId;
      });
  }
}

export default angular.module('addressView.address.service', [])
.service('addressService', AddressService);

