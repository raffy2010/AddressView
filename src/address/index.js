import fuzzysearch from 'fuzzysearch';

import addressSection from './container/addressSection';
import addressList from './component/addressList';
import addressItem from './component/addressItem';
import addressItemEdit from './component/addressItemEdit';
import addressMap from './component/addressMap';
import addressAutocomplete from './component/addressAutocomplete';
import addressServiceModule from './service';

import {addressTypes} from './config';

export default angular.module('addressView.address', [
  'ngRoute',
  'ngAnimate',
  addressServiceModule.name
])
.config(($routeProvider) => {
  $routeProvider
    .when('/address', {
      template: '<address-section></address-section>'
    })
})
.filter('typeTitle', () => {
  return titleId => {
    let type = addressTypes.filter(type => type.id == titleId);

    if (type.length) {
      return type[0].title;
    }
  };
})
.filter('firstLetter', () => str => str.charAt(0).toUpperCase())
.filter('search', () => (
  addressList,
  searchKeyword
) => addressList.filter(address => [
  'street',
  'subStreet',
  'city',
  'state',
  'postalCode',
  'country'
].some(key => fuzzysearch(
  searchKeyword,
  address[key].toLowerCase()
))))
.directive('addressList', addressList)
.directive('addressItem', addressItem)
.directive('addressItemEdit', addressItemEdit)
.directive('addressAutocomplete', addressAutocomplete)
.directive('addressMap', addressMap)
.directive('addressSection', addressSection);
