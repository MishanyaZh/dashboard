import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUsersAction,
  addUserAction,
  deletehUsersAction,
  edithUsersAction,
} from './users-operations';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: null,
    error: null,
  },
  reducers: {
    addUser(state, action) {
      state.users.push({
        id: action.payload.newUser.id,
        name: action.payload.newUser.name,
        username: action.payload.newUser.username,
        email: action.payload.newUser.email,
        address: { city: action.payload.newUser.city },
      });
    },

    deleteUser(state, action) {
      state.users = state.users.filter(user => user.id !== action.payload.id);
    },

    editUser(state, action) {
      // state.users.forEach((user, index) => {
      //   if (user.id === action.payload.newUser.id) {
      //     state.users[index] = {
      //       id: action.payload.newUser.id,
      //       name: action.payload.newUser.name,
      //       username: action.payload.newUser.username,
      //       email: action.payload.newUser.email,
      //       address: { ...state.address, city: action.payload.newUser.city },
      //     };
      //   }
      //   return state.users;
      // });
      state.users.forEach((user, index) => {
        if (user.id === action.payload.newUser.id) {
          state.users[index] = {
            ...action.payload.newUser,
            address: { ...state.address, city: action.payload.newUser.city },
          };
        }
        return state.users;
      });
    },
  },
  extraReducers: {
    [fetchUsersAction.pending]: (state, action) => {
      state.status = action.meta.requestStatus;
      state.error = null;
    },
    [fetchUsersAction.fulfilled]: (state, action) => {
      state.status = action.meta.requestStatus;
      state.users = action.payload;
    },
    [fetchUsersAction.rejected]: (state, action) => {
      state.status = action.meta.requestStatus;
      state.error = action.payload;
    },
    [addUserAction.fulfilled]: (state, action) => {
      state.users.push(action.payload);
    },
    [addUserAction.rejected]: (state, action) => {
      state.status = action.meta.requestStatus;
      state.error = action.payload;
    },
    [deletehUsersAction.fulfilled]: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload.id);
      state.status = action.meta.requestStatus;
    },
    [deletehUsersAction.rejected]: (state, action) => {
      console.log(action.payload);
      state.error = action.payload;
    },
    [edithUsersAction.fulfilled]: (state, action) => {
      console.log(action);
      state.users.forEach((user, index) => {
        if (user.id === action.payload.id) {
          state.users[index] = {
            ...action.payload,
            address: { ...state.address, city: action.payload.city },
          };
        }
        return state.users;
      });
    },
    [edithUsersAction.rejected]: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const selectUsersStatus = state => state.users.status;
export const selectUsersData = state => state.users.users;
export const statusError = state => state.users.error;

export const { addUser, deleteUser, editUser } = usersSlice.actions;
export default usersSlice.reducer;
