import addressSection from './container/addressSection';
import addressList from './component/addressList';
import addressItem from './component/addressItem';
import googleMap from './component/googleMap';
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
.directive('addressList', addressList)
.directive('googleMap', googleMap)
.directive('addressSection', addressSection);
