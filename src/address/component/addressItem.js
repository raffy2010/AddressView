import * as addressAction from '../action';

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
  }

  toggleMenu($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  }

  toggleEdit() {
    this.address.editing = !this.address.editing;
  }

  delete() {
    this.deleteAddress(this.address.id);
  }

  copy() {
    this.clipboard.copyText(this.address.formatAddress);
  }
}
