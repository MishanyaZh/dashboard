import { createSlice } from '@reduxjs/toolkit';
import { fetchUsersAction } from './users-operations';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: null,
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

    deleteUser(state, action) {},
    editUser(state, action) {},
  },
  extraReducers: {
    [fetchUsersAction.fulfilled]: (state, action) => {
      console.log(action);
      state.users = action.payload;
      state.status = action.meta.requestStatus;
      console.log(state.status);
      console.log(state.users);
    },
  },
});

export const selectUsersStatus = state => state.users.status;
export const selectUsersData = state => state.users.users;

export const { addUser, deleteUser, editUser, fetchUsers } = usersSlice.actions;
export default usersSlice.reducer;
