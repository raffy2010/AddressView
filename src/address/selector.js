import {createSelector} from 'reselect';

import fuzzysearch from 'fuzzysearch';

const addressSelector = state => state.address;

export const addressListSelector = createSelector(
  [addressSelector],
  ({addressList, searchKeyword}) => {
    addressList,
    addressSearchList: addressList.filter(
      address => [
        'country',
        'state',
        'city',
        'street'
      ].some(key => fuzzysearch(searchKeyword, address))
    )
  }
)
