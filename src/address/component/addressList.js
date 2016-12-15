import * as addressAction from '../action';
import {addressListSelector} from '../selector';

export default function addressList() {
  return {
    restrict: 'E',
    controller: AddressListController,
    controllerAs: 'addressList',
    bindToController: true,
    template: require('./addressList.html')
  };
}

class AddressListController {
  constructor($scope, $ngRedux) {
    let unbind = $ngRedux.connect(
      addressListSelector,
      addressAction
    )(this);

    $scope.$on('$destroy', () => {
      unbind();
    });

    $scope.$watch('addressList.addressList', (newVal) => {
      if (!this.addressList.length) {
        this.addNewAddress();
      }
    });

    this.newAddress = {}
  }

  addNewAddress() {
    this.newAddress = {
      type: 1,
      street: '',
      subStreet: '',
      city: '',
      state: '',
      code: '',
      country: '',
      editing: true
    };
  }
}
