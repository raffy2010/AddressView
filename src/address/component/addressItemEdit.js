import * as addressAction from '../action';

import {
  countryList,
  addressTypes
} from '../config'

export default function addressItemEdit() {
  return {
    restrict: 'E',
    controller: AddressItemEditController,
    controllerAs: 'addressItemEdit',
    bindToController: true,
    template: require('./addressItemEdit.html'),
    scope: {
      address: '='
    }
  }
}

class AddressItemEditController {
  constructor($scope, $ngRedux) {
    let unbind = $ngRedux.connect(
      () => ({}),
      addressAction
    )(this);

    $scope.$on('$destroy', () => {
      unbind();
    });

    this.countryList = countryList;
    this.addressTypes = addressTypes;
  }

  submit() {
    if (this.address.id) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    this.address.id = Date.now();

    this.address.editing = false;
    this.createAddress(angular.copy(this.address));
  }

  update() {
    this.updateAddress(this.address.id, this.address);

    this.address.editing = false;
  }

  cancel() {
    this.address.editing = false;
  }
}
