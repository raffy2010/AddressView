import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';

import {
  CREATE_ADDRESS,
  UPDATE_ADDRESS,
  FETCH_ADDRESS,
  DELETE_ADDRESS,
  SEARCH_ADDRESS
} from './actions';

import {
  stubPayload,
  replaceCollectionById,
  dropCollectionById
} from '../util';


const addressList = handleActions({
  [CREATE_ADDRESS]: {
    next: () => {

    }
  },
  [FETCH_ADDRESS]: {
    next: () => {

    }
  },
  [UPDATE_ADDRESS]: {
    next: () => {

    }
  },
  [DELETE_ADDRESS]: {
    next: () => {

    }
  }
}, []);

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

