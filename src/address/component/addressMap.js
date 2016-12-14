export default function addressMap() {
  return {
    restrict: 'E',
    controller: AddressMapController,
    controllerAs: 'addressSection',
    bindToController: true,
    template: require('./addressMap.html')
  };
}

class AddressMapController {
}

