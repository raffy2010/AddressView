import {addressListSelector} from '../selector';

export default function addressSection() {
  return {
    restrict: 'E',
    controller: AddressSectionController,
    controllerAs: 'addressSection',
    bindToController: true,
    template: require('./addressSection.html')
  };
}

class AddressSectionController {
  constructor($scope, $ngRedux) {
    let unbind = $ngRedux.connect(
      addressListSelector
    )(this);

    $scope.$on('$destroy', () => {
      unbind();
    });
  }
}
