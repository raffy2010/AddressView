const streetComponent = [
  'premise',
  'street_number',
  'route',
  'sublocality_level_1'
];

const areaComponent = {
  locality: ['city'],
  administrative_area_level_1: 'state',
  country: 'country',
  postal_code: 'postalCode'
};

export default function addressAutocomplete($rootScope) {
  var placeSearch, autocomplete;

  function linkMap(scope, element, attr) {
    let autocompleteInput = element.find('input');

    autocomplete = new google.maps.places.Autocomplete(
      autocompleteInput[0],
      {types: ['geocode']}
    );

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    autocomplete.addListener('place_changed', () => {
			// Get the place details from the autocomplete object.
			let place = autocomplete.getPlace(),
          street = [];

      place.address_components.forEach((address) => {
				let addressType = address.types[0],
            targetField = areaComponent[addressType],
            val;

        if (targetField) {
          val = address.short_name;

          scope.addressAutocomplete.address[targetField] = val;
        }

        if (streetComponent.indexOf(addressType) > -1) {
          street.push(address.short_name);
        }
      });

      scope.addressAutocomplete.address.formatAddress = place.formatted_address;
      scope.addressAutocomplete.address.street = street.join(' ');

      let {lng, lat} = place.geometry.location

      scope.addressAutocomplete.address.latlng = {
        lat: lat(),
        lng: lng()
      };

      $rootScope.$digest();
		});

    scope.$on('$destroy', () => {
      autocomplete = null;
    });
  }

  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });

        autocomplete.setBounds(circle.getBounds());
      });
    }
  }

  return {
    restrict: 'E',
    controller: AddressAutoCompleteController,
    controllerAs: 'addressAutocomplete',
    bindToController: true,
    template: require('./addressAutocomplete.html'),
    scope: {
      address: '='
    },
    link: linkMap
  }
}

class AddressAutoCompleteController {

}
