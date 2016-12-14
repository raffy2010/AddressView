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
  constructor($scope, $ngRedux) {
    let unbind = $ngRedux.connect(
      () => ({}),
      addressAction
    )(this);

    $scope.$on('$destroy', () => {
      unbind();
    });
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

  }
}
