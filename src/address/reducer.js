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
  id: Date.now(),
  type: 1,
  street: 'Forest 301',
  subStreet: 'suite 320',
  city: 'Beijing',
  state: 'Beijing',
  code: '100000',
  country: '2',
  latlng: {
    lat: -34.397,
    lng: 150.644
  }
}]);

const searchKeyword = handleActions({
  [SEARCH_ADDRESS]: {
    next: () => {

    }
  }
}, '')

export default combineReducers({
  addressList,
  searchKeyword
});

