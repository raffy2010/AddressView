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

    this.newAddress = {}
    this.searchKeyword = '';
  }

  toggleCreate() {
    if (this.newAddress.editing) {
      this.newAddress.editing = false;
    } else {
      this.addNewAddress();
    }
  }

  addNewAddress() {
    this.newAddress = {
      type: 1,
      street: '',
      subStreet: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      editing: true
    };
  }
}
