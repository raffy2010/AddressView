const addressComponent = {
  street_number: 'subStreet',
  route: 'street',
  locality: 'city',
  administrative_area_level_1: 'state',
  country: 'country',
  postal_code: 'postalCode'
};

export default function addressAutocomplete() {
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
			var place = autocomplete.getPlace();

			for (var i = 0; i < place.address_components.length; i++) {
				var addressType = place.address_components[i].types[0];
				if (addressComponent[addressType]) {
					var val = place.address_components[i][addressComponent[addressType]];
					scope.addressAutocomplete.address[addressComponent[addressType]] = val;
				}
			}

			scope.$digest();
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
