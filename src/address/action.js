import {createAction} from 'redux-actions';

import {extractFromMod} from '../util';

const addressService = extractFromMod('addressService');

export const CREATE_ADDRESS = 'CREATE_ADDRESS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const FETCH_ADDRESS = 'FETCH_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';

export const createAddress = createAction(
  CREATE_ADDRESS,
  addressService('create')
);

export const fetchAddress = createAction(
  FETCH_ADDRESS,
  addressService('fetch')
);

export const updateAddress = createAction(
  UPDATE_ADDRESS,
  addressService('update')
);

export const deleteAddress = createAction(
  DELETE_ADDRESS,
  addressService('delete')
);
