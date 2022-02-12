import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { fetchUsersAction } from './users-operations';

const entities = createReducer([], {
  [fetchUsersAction.fulfilled]: (_state, { payload }) => payload,
  // [fetchUsersAction.fulfilled]: (_state, { payload }) => console.log(payload),

  //   [addContactAction.fulfilled]: (state, { payload }) => {
  //     const doubleContact = state.find(contact =>
  //       contact.name.toLowerCase().includes(payload.name.toLowerCase()),
  //     );

  //     const variable =
  //       doubleContact && doubleContact.name.length === payload.name.length;

  //     if (variable) {
  //       toast.error(`${payload.name} is already in contacts`);
  //       return state;
  //     } else {
  //       toast.success(`${payload.name} add to Contacts`, { icon: '👏' });
  //       return [payload, ...state];
  //     }
  //   },

  //   [deleteContactAction.fulfilled]: (state, { payload }) => {
  //     return state.filter(({ id }) => id !== payload);
  //   },
});

export default combineReducers({
  entities,
  //   filter,
  //   isLoading,
  //   error,
});
