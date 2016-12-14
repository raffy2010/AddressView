import {addressListSelector} from '../selector';

import * as addressAction from '../action';

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

    this.types = [{
      id: 1,
      title: 'Mailing'
    }, {
      id: 2,
      title: 'Address'
    }, {
      id: 3,
      title: 'Other'
    }],

    this.countries = [{
      id: 1,
      title: 'America'
    }, {
      id: 2,
      title: 'China'
    }]
  }
}
