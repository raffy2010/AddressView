import addressSection from './container/addressSection';
import addressList from './component/addressList';
import addressItem from './component/addressItem';
import addressItemEdit from './component/addressItemEdit';
import addressMap from './component/addressMap';
import addressAutocomplete from './component/addressAutocomplete';
import addressServiceModule from './service';


export default angular.module('addressView.address', [
  'ngRoute',
  addressServiceModule.name
])
.config(($routeProvider) => {
  $routeProvider
    .when('/address', {
      template: '<address-section></address-section>'
    })
})
.filter('countryTitle', () => {
  const countries = [{
    id: 1,
    title: 'America'
  }, {
    id: 2,
    title: 'China'
  }];

  return countryId => {
    let country = countries.filter(country => country.id == countryId);

    if (country.length) {
      return country[0].title;
    }
  };
})
.filter('typeTitle', () => {
  const types = [{
    id: 1,
    title: 'Mailing'
  }, {
    id: 2,
    title: 'Address'
  }, {
    id: 3,
    title: 'Other'
  }];

  return titleId => {
    let type = types.filter(type => type.id == titleId);

    if (type.length) {
      return type[0].title;
    }
  };
})
.directive('addressList', addressList)
.directive('addressItem', addressItem)
.directive('addressItemEdit', addressItemEdit)
.directive('addressAutocomplete', addressAutocomplete)
.directive('addressMap', addressMap)
.directive('addressSection', addressSection);
