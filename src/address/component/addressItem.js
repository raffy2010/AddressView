import * as addressAction from '../action';

export default function addressItem() {
  return {
    restrict: 'E',
    controller: AddressSectionController,
    controllerAs: 'addressSection',
    bindToController: true,
    template: require('./addressItem.html')
  }
}

class AddressSectionController {
  constructor($scope) {
    let unbind = $ngRedux.connect({}, addressAction)(this);

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

  create() {
    this.updateAddress({

    });
  }

  update() {
    this.updateAddress(this.address.id, {

    });
  }

  delete() {
    this.deleteAddress(this.address.id);
  }

  cancel() {
    this.address.editing = false;
  }
}
