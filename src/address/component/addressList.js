import * as addressAction from '../action';

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
    let unbind = $ngRedux.connect(addressListSelector, addressAction)(this);

    $scope.$on('$destroy', () => {
      unbind();
    });
  }
}
