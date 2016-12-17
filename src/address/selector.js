import {createSelector} from 'reselect';

const addressSelector = state => state.address;

export const addressListSelector = createSelector(
  [addressSelector],
  ({addressList}) => ({
    addressList
  })
)
