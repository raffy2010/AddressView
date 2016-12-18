import {addressListSelector} from '../selector';

import * as addressAction  from '../action';

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
      addressListSelector,
      addressAction
    )(this);

    $scope.$on('$destroy', () => {
      unbind();
    });

    this.fetchAddress();
  }
}

