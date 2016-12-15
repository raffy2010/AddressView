import {addressListSelector} from '../selector';
import * as addressAction from '../action';

let mapInstance;

export default function addressMap() {
  function linkMap(scope, element, attr) {
    mapInstance = new google.maps.Map(element[0], {
      center: {lat: -34.397, lng: 150.644},
      scrollwheel: false,
      zoom: 8
    });

    google.maps.event.addListener(mapInstance, 'bounds_changed', function(event) {
      if (this.getZoom() > 15) {
        this.setZoom(15);
      }
    });
  }

  return {
    restrict: 'E',
    controller: AddressMapController,
    controllerAs: 'addressMap',
    bindToController: true,
    template: require('./addressMap.html'),
    link: linkMap
  };
}

class AddressMapController {
  constructor($scope, $ngRedux) {
    let unbind = $ngRedux.connect(
      addressListSelector,
      addressAction
    )(this);

    $scope.$on('$destroy', () => {
      unbind();
    });

    $scope.$watch('addressMap.addressList', (newVal, oldVal) => {
      if (newVal) {
        this.cleanMarker();
        this.createMarker();
        this.fitMapView();
      }
    });

    this.markers = [];
  }

  cleanMarker() {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });

    this.markers.length = 0;
  }

  createMarker() {
    this.markers = this.addressList.map((address) => {
      let {
        latlng,
        street,
        subStreet,
        city,
        country
      } = address;

      return new google.maps.Marker({
        map: mapInstance,
        position: latlng,
        title: `${street} ${subStreet} ${city} ${country}`
      });
    })
  }

  fitMapView() {
    let bounds = new google.maps.LatLngBounds();

    this.markers.forEach((marker) => {
      bounds.extend(marker.getPosition());
    })

    mapInstance.fitBounds(bounds);
  }
}

