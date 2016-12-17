import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import {
  CREATE_ADDRESS,
  UPDATE_ADDRESS,
  FETCH_ADDRESS,
  DELETE_ADDRESS,
  SEARCH_ADDRESS
} from './action';

import {
  stubPayload,
  replaceCollectionById,
  dropCollectionById
} from '../util';


const addressList = handleActions({
  [CREATE_ADDRESS]: {
    next: (state, {payload}) => [payload].concat(state)
  },
  [FETCH_ADDRESS]: {
    next: () => {

    }
  },
  [UPDATE_ADDRESS]: {
    next: (state, {payload}) => {
      let id = payload.id;

      return replaceCollectionById(state, id, payload);
    }
  },
  [DELETE_ADDRESS]: {
    next: (state, {payload}) => dropCollectionById(state, payload)
  }
}, [{
  id: 1,
  type: 1,
  street: '301 Forest Ave',
  subStreet: '',
  city: 'Beijing',
  state: 'Beijing',
  postalCode: '100000',
  country: 'CN',
  formatAddress: '301 Forest Ave',
  latlng: {
    lat: -34.397,
    lng: 150.644
  }
}, {
  id: 2,
  type: 1,
  street: 'Fu An Xi Lu',
  subStreet: '',
  city: 'Beijing',
  state: 'Beijing',
  postalCode: '100000',
  country: 'CN',
  formatAddress: 'fu an xi lu',
  latlng: {
    lat: -34.397,
    lng: 150.644
  }
} ]);

const searchKeyword = handleActions({
  [SEARCH_ADDRESS]: {
    next: (_, {payload}) => payload
  }
}, '');

export default combineReducers({
  addressList,
  searchKeyword
});

