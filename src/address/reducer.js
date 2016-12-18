import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import {
  CREATE_ADDRESS,
  UPDATE_ADDRESS,
  FETCH_ADDRESS,
  DELETE_ADDRESS
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
    next: (_, {payload}) => payload
  },
  [UPDATE_ADDRESS]: {
    next: (state, {payload}) => replaceCollectionById(
      state,
      payload.id,
      payload
    )
  },
  [DELETE_ADDRESS]: {
    next: (state, {payload}) => dropCollectionById(
      state,
      payload
    )
  }
}, []);

export default combineReducers({
  addressList
});

