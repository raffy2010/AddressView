import * as addressAction from '../action';

import {countryList} from '../config';

export default function addressItem() {
  return {
    restrict: 'E',
    controller: AddressItemController,
    controllerAs: 'addressItem',
    bindToController: true,
    template: require('./addressItem.html'),
    scope: {
      address: '<'
    }
  }
}


function countryName(countryCode) {
  let country = countryList.filter(
    country => country.code == countryCode
  );

  if (country.length) {
    return country[0].name;
  }
}

class AddressItemController {
  constructor($scope, $ngRedux, clipboard) {
    let unbind = $ngRedux.connect(
      () => ({}),
      addressAction
    )(this);

    $scope.$on('$destroy', () => {
      unbind();
    });

    this.clipboard = clipboard;

    $scope.$watch('addressItem.address', () => {
      this.streetContent = this.format(['street', 'subStreet']);
      this.areaContent = this.format(['city', 'state', 'postalCode', 'country'])
    }, true);

    this.editingAddress = {
      editing: false
    };
  }

  format(items, spliter = ' ') {
    return items
      .map(item => item === 'country' ?
        countryName(this.address[item]) :
        this.address[item]
      )
      .filter(item => item !== '')
      .join(spliter);
  }

  toggleMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  edit() {
    angular.copy(this.address, this.editingAddress);
    this.editingAddress.editing = true;
  }

  delete() {
    this.deleteAddress(this.address.id);
  }

  copy() {
    this.clipboard.copyText(this.format([
      'street',
      'subStreet',
      'city',
      'state',
      'postalCode',
      'country'
    ], ', '));
  }
}
